-- ============================================================
-- CONQRETE STOREFRONT CUSTOMER AUTH FOUNDATION
-- ============================================================
--
-- PURPOSE:
--   1. Create customer addresses
--   2. Enforce one default address per customer
--   3. Secure storefront customer data with RLS
--   4. Create a strictly scoped customer provisioning function
--   5. Keep storefront customers separate from admin/employee users
--
-- IMPORTANT:
--   - Does NOT create another users table
--   - Does NOT recreate profiles/customers
--   - Does NOT modify admin tables
--   - Does NOT create a global auth.users trigger
--   - Does NOT expose service-role credentials
--   - Does NOT modify orders/order_items structure
--
-- ============================================================


-- ============================================================
-- 1. ADDRESSES TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS public.addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  customer_id uuid NOT NULL
    REFERENCES public.customers(id)
    ON DELETE CASCADE,

  street text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  pincode text NOT NULL,
  phone text,

  is_default boolean NOT NULL DEFAULT false,

  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);


-- ============================================================
-- 2. INDEXES
-- ============================================================

-- Customer addresses are frequently queried by customer_id.
CREATE INDEX IF NOT EXISTS addresses_customer_id_idx
ON public.addresses (customer_id);


-- Guarantee that each customer can have at most one
-- address marked as default.
CREATE UNIQUE INDEX IF NOT EXISTS unique_default_address
ON public.addresses (customer_id)
WHERE is_default = true;


-- ============================================================
-- 3. DEFAULT ADDRESS TRIGGER
-- ============================================================
--
-- When an address becomes the default address:
--
--   old default → false
--   new default → true
--
-- SECURITY DEFINER is intentionally used because this function
-- needs to update another address belonging to the customer.
--
-- search_path is explicitly pinned to prevent search_path
-- manipulation against a privileged function.
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_default_address()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN

  IF NEW.is_default = true THEN

    UPDATE public.addresses
    SET
      is_default = false,
      updated_at = timezone('utc'::text, now())
    WHERE customer_id = NEW.customer_id
      AND id <> NEW.id
      AND is_default = true;

  END IF;

  RETURN NEW;

END;
$$;


-- The trigger function is only intended to be invoked
-- internally by PostgreSQL through the trigger.
REVOKE EXECUTE
ON FUNCTION public.handle_default_address()
FROM PUBLIC;

REVOKE EXECUTE
ON FUNCTION public.handle_default_address()
FROM anon;

REVOKE EXECUTE
ON FUNCTION public.handle_default_address()
FROM authenticated;


DROP TRIGGER IF EXISTS on_address_default
ON public.addresses;

CREATE TRIGGER on_address_default
BEFORE INSERT OR UPDATE
ON public.addresses
FOR EACH ROW
EXECUTE FUNCTION public.handle_default_address();


-- ============================================================
-- 4. ENABLE RLS
-- ============================================================

ALTER TABLE public.profiles
ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.customers
ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.addresses
ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.orders
ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.order_items
ENABLE ROW LEVEL SECURITY;


-- ============================================================
-- 5. PROFILES RLS
-- ============================================================
--
-- Storefront users may:
--   SELECT their own profile
--   UPDATE their own profile
--
-- Initial INSERT is intentionally NOT granted to authenticated
-- users. The provisioning function creates the initial row.
--
-- This prevents an arbitrary authenticated user from bypassing
-- the storefront provisioning boundary.
-- ============================================================

DROP POLICY IF EXISTS "User can view own profile"
ON public.profiles;

CREATE POLICY "User can view own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  (select auth.uid()) = id
);


DROP POLICY IF EXISTS "User can insert own profile"
ON public.profiles;


DROP POLICY IF EXISTS "User can update own profile"
ON public.profiles;

CREATE POLICY "User can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (
  (select auth.uid()) = id
)
WITH CHECK (
  (select auth.uid()) = id
);


-- ============================================================
-- 6. CUSTOMERS RLS
-- ============================================================
--
-- Initial INSERT is intentionally NOT granted directly to
-- authenticated users.
--
-- Customer creation happens only through the secure
-- provision_storefront_customer() function.
-- ============================================================

DROP POLICY IF EXISTS "User can view own customer record"
ON public.customers;

CREATE POLICY "User can view own customer record"
ON public.customers
FOR SELECT
TO authenticated
USING (
  (select auth.uid()) = id
);


DROP POLICY IF EXISTS "User can insert own customer"
ON public.customers;


DROP POLICY IF EXISTS "User can update own customer"
ON public.customers;

CREATE POLICY "User can update own customer"
ON public.customers
FOR UPDATE
TO authenticated
USING (
  (select auth.uid()) = id
)
WITH CHECK (
  (select auth.uid()) = id
);


-- ============================================================
-- 7. ADDRESSES RLS
-- ============================================================
--
-- Customer must own the address through customer_id.
--
-- INSERT additionally requires that the authenticated user
-- actually has a corresponding customers row.
--
-- This prevents an arbitrary authenticated user from creating
-- an address before becoming a storefront customer.
-- ============================================================

DROP POLICY IF EXISTS "User can view own addresses"
ON public.addresses;

CREATE POLICY "User can view own addresses"
ON public.addresses
FOR SELECT
TO authenticated
USING (
  customer_id = (select auth.uid())
);


DROP POLICY IF EXISTS "User can insert own addresses"
ON public.addresses;

CREATE POLICY "User can insert own addresses"
ON public.addresses
FOR INSERT
TO authenticated
WITH CHECK (
  customer_id = (select auth.uid())
  AND EXISTS (
    SELECT 1
    FROM public.customers
    WHERE public.customers.id = (select auth.uid())
  )
);


DROP POLICY IF EXISTS "User can update own addresses"
ON public.addresses;

CREATE POLICY "User can update own addresses"
ON public.addresses
FOR UPDATE
TO authenticated
USING (
  customer_id = (select auth.uid())
)
WITH CHECK (
  customer_id = (select auth.uid())
);


DROP POLICY IF EXISTS "User can delete own addresses"
ON public.addresses;

CREATE POLICY "User can delete own addresses"
ON public.addresses
FOR DELETE
TO authenticated
USING (
  customer_id = (select auth.uid())
);


-- ============================================================
-- 8. ORDERS RLS
-- ============================================================
--
-- Customers may only READ their own orders.
--
-- No customer INSERT/UPDATE/DELETE policies are created here.
-- Order creation will later happen through the secure checkout
-- and Razorpay payment architecture.
-- ============================================================

DROP POLICY IF EXISTS "User can view own orders"
ON public.orders;

CREATE POLICY "User can view own orders"
ON public.orders
FOR SELECT
TO authenticated
USING (
  customer_id = (select auth.uid())
);


-- ============================================================
-- 9. ORDER ITEMS RLS
-- ============================================================
--
-- A customer can see an order item only when its parent order
-- belongs to the authenticated customer.
-- ============================================================

DROP POLICY IF EXISTS "User can view own order items"
ON public.order_items;

CREATE POLICY "User can view own order items"
ON public.order_items
FOR SELECT
TO authenticated
USING (
  order_id IN (
    SELECT o.id
    FROM public.orders AS o
    WHERE o.customer_id = (select auth.uid())
  )
);


-- ============================================================
-- 10. CUSTOMER PROVISIONING FUNCTION
-- ============================================================
--
-- IMPORTANT ARCHITECTURE:
--
--   auth.users
--       |
--       +---- profiles
--       |
--       +---- customers
--
-- The authenticated user's auth.uid() is the identity.
--
-- This function:
--
--   1. Gets the current authenticated user's ID.
--   2. Gets the phone from the authenticated JWT claims.
--   3. Rejects missing phone information.
--   4. Checks whether the user belongs to organization_members.
--   5. Rejects admin/employee users.
--   6. Creates profiles row if missing.
--   7. Creates customers row if missing.
--   8. Never accepts a user ID from the client.
--   9. Is idempotent.
--
-- SECURITY DEFINER is intentional here.
--
-- Why?
--
-- Normal authenticated users must NOT receive direct INSERT
-- privileges on profiles/customers because that would allow
-- arbitrary authenticated users, including admin users, to
-- bypass the storefront provisioning boundary.
--
-- This function therefore runs with its owner's privileges,
-- while the function itself strictly controls what it can do.
--
-- search_path is pinned to an empty string and every object
-- reference is schema-qualified.
-- ============================================================

DROP FUNCTION IF EXISTS public.provision_storefront_customer(text);

DROP FUNCTION IF EXISTS public.provision_storefront_customer();


CREATE OR REPLACE FUNCTION public.provision_storefront_customer()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_user_id uuid;
  v_phone text;
  v_is_employee boolean;
BEGIN

  -- ----------------------------------------------------------
  -- Get authenticated user
  -- ----------------------------------------------------------

  v_user_id := (select auth.uid());

  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;


  -- ----------------------------------------------------------
  -- Get phone directly from the authenticated JWT.
  -- Do not accept phone from the browser.
  -- ----------------------------------------------------------

  v_phone :=
    current_setting('request.jwt.claims', true)::jsonb ->> 'phone';


  IF v_phone IS NULL OR btrim(v_phone) = '' THEN
    RAISE EXCEPTION 'Authenticated user phone number is missing';
  END IF;


  -- ----------------------------------------------------------
  -- Check whether this authenticated user belongs to the
  -- existing admin/employee organization system.
  --
  -- Any organization_members record means this identity
  -- belongs to the employee/admin population and therefore
  -- must not be provisioned as a storefront customer by
  -- this function.
  -- ----------------------------------------------------------

  SELECT EXISTS (
    SELECT 1
    FROM public.organization_members AS om
    WHERE om.user_id = v_user_id
  )
  INTO v_is_employee;


  IF v_is_employee THEN
    RAISE EXCEPTION
      'This account belongs to the CONQRETE admin/employee system and cannot be provisioned as a storefront customer';
  END IF;


  -- ----------------------------------------------------------
  -- Create profile.
  --
  -- ON CONFLICT makes this operation idempotent.
  -- ----------------------------------------------------------

  INSERT INTO public.profiles (
    id,
    phone,
    status
  )
  VALUES (
    v_user_id,
    v_phone,
    'active'
  )
  ON CONFLICT (id) DO NOTHING;


  -- ----------------------------------------------------------
  -- Create customer.
  --
  -- ON CONFLICT makes this operation idempotent.
  -- ----------------------------------------------------------

  INSERT INTO public.customers (
    id,
    phone_number
  )
  VALUES (
    v_user_id,
    v_phone
  )
  ON CONFLICT (id) DO NOTHING;


END;
$$;


-- ============================================================
-- 11. PROVISIONING FUNCTION EXECUTION PRIVILEGES
-- ============================================================
--
-- Supabase/Postgres functions can otherwise be callable by
-- broader roles depending on project defaults.
--
-- Explicitly expose this function only to authenticated users.
-- The function itself performs the admin/customer separation.
-- ============================================================

REVOKE EXECUTE
ON FUNCTION public.provision_storefront_customer()
FROM PUBLIC;

REVOKE EXECUTE
ON FUNCTION public.provision_storefront_customer()
FROM anon;

GRANT EXECUTE
ON FUNCTION public.provision_storefront_customer()
TO authenticated;


-- ============================================================
-- 12. IMPORTANT TABLE PRIVILEGES
-- ============================================================
--
-- Remove direct INSERT privileges for authenticated users on
-- profiles/customers.
--
-- The provisioning function is responsible for initial creation.
--
-- Keep SELECT/UPDATE for normal customer account operation.
-- ============================================================

REVOKE INSERT
ON TABLE public.profiles
FROM authenticated;

REVOKE INSERT
ON TABLE public.customers
FROM authenticated;


-- ============================================================
-- 13. ADDRESS TABLE PRIVILEGES
-- ============================================================
--
-- Customers need direct CRUD access to their own addresses,
-- with RLS enforcing ownership.
-- ============================================================

GRANT SELECT, INSERT, UPDATE, DELETE
ON TABLE public.addresses
TO authenticated;


-- ============================================================
-- 14. PROFILE/CUSTOMER TABLE PRIVILEGES
-- ============================================================

GRANT SELECT, UPDATE
ON TABLE public.profiles
TO authenticated;

GRANT SELECT, UPDATE
ON TABLE public.customers
TO authenticated;


-- ============================================================
-- 15. ORDER READ PRIVILEGES
-- ============================================================

GRANT SELECT
ON TABLE public.orders
TO authenticated;

GRANT SELECT
ON TABLE public.order_items
TO authenticated;


-- ============================================================
-- END OF CONQRETE STOREFRONT AUTH FOUNDATION
-- ============================================================
