CREATE TABLE IF NOT EXISTS public.warranty_active_tokens (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    token text UNIQUE NOT NULL,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now()
);

INSERT INTO public.warranty_active_tokens (token) VALUES ('CNQ-GENUINE-V1') ON CONFLICT DO NOTHING;

ALTER TABLE public.warranty_active_tokens ENABLE ROW LEVEL SECURITY;

-- Note: Admin tools bypass RLS via service role, but we'll allow public READ so the verify flow can check it.
CREATE POLICY "Allow public read of active warranty tokens"
ON public.warranty_active_tokens FOR SELECT TO anon, authenticated USING (is_active = true);
