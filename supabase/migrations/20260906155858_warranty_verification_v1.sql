CREATE TABLE IF NOT EXISTS public.warranty_verification_customers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    mobile text NOT NULL,
    name text,
    email text,
    marketing_consent boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.warranty_verifications (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id uuid REFERENCES public.warranty_verification_customers(id) ON DELETE CASCADE,
    verification_result text NOT NULL,
    verified_at timestamptz DEFAULT now(),
    qr_identifier text,
    created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.warranty_verification_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.warranty_verifications ENABLE ROW LEVEL SECURITY;

-- Allow insert from anon (so the website can submit forms)
CREATE POLICY "Allow public insert to warranty_verification_customers" 
ON public.warranty_verification_customers FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow public insert to warranty_verifications" 
ON public.warranty_verifications FOR INSERT TO anon, authenticated WITH CHECK (true);
