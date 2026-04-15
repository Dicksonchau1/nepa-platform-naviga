-- Workspaces
CREATE TABLE IF NOT EXISTS public.workspaces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Workspace members (multi-user support)
CREATE TABLE IF NOT EXISTS public.workspace_members (
  workspace_id uuid REFERENCES public.workspaces(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'viewer', -- 'owner' | 'admin' | 'operator' | 'viewer'
  joined_at timestamptz DEFAULT now(),
  PRIMARY KEY (workspace_id, user_id)
);

-- Workspace subscriptions with feature flags
CREATE TABLE IF NOT EXISTS public.workspace_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid UNIQUE REFERENCES public.workspaces(id) ON DELETE CASCADE,
  owner_id uuid REFERENCES auth.users(id),
  plan text NOT NULL DEFAULT 'trial',
  stripe_customer_id text,
  stripe_subscription_id text,
  billing_cycle_start timestamptz,
  billing_cycle_end timestamptz,
  status text NOT NULL DEFAULT 'trial',
  -- Feature flags
  soda_enabled boolean DEFAULT false,
  roda_enabled boolean DEFAULT false,
  voda_enabled boolean DEFAULT false,
  coda_enabled boolean DEFAULT false,
  hri_enabled boolean DEFAULT false,
  foda_enabled boolean DEFAULT false,
  -- Quotas
  camera_limit integer DEFAULT 3,
  api_quota_monthly integer DEFAULT 1000,
  video_minutes_monthly integer DEFAULT 60,
  hri_calls_monthly integer DEFAULT 50,
  consultation_calls_monthly integer DEFAULT 100,
  storage_retention_days integer DEFAULT 7,
  max_stores integer DEFAULT 1,
  max_users integer DEFAULT 2,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- API Keys for developer access
CREATE TABLE IF NOT EXISTS public.api_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES public.workspaces(id) ON DELETE CASCADE,
  name text NOT NULL,
  key_hash text UNIQUE NOT NULL,    -- Store hashed key only
  key_prefix text NOT NULL,         -- e.g. "as_live_xxxx" for display
  product_scopes text[] DEFAULT '{}', -- ['soda', 'voda', 'hri']
  last_used_at timestamptz,
  expires_at timestamptz,
  revoked boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Usage tracking
CREATE TABLE IF NOT EXISTS public.usage_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES public.workspaces(id) ON DELETE CASCADE,
  product text NOT NULL,           -- 'soda' | 'voda' | 'hri' | 'roda'
  event_type text NOT NULL,        -- 'api_call' | 'consultation' | 'video_minute' | 'hri_call'
  quantity integer DEFAULT 1,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies: workspace owner and members can read their own data
CREATE POLICY "workspace_owner_select" ON public.workspaces
  FOR SELECT USING (owner_id = auth.uid());

CREATE POLICY "subscription_owner_select" ON public.workspace_subscriptions
  FOR SELECT USING (owner_id = auth.uid());

CREATE POLICY "api_keys_workspace_select" ON public.api_keys
  FOR SELECT USING (
    workspace_id IN (
      SELECT id FROM public.workspaces WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "usage_workspace_select" ON public.usage_events
  FOR SELECT USING (
    workspace_id IN (
      SELECT id FROM public.workspaces WHERE owner_id = auth.uid()
    )
  );

-- Plan defaults function (called on subscription creation)
CREATE OR REPLACE FUNCTION public.apply_plan_defaults(
  sub_id uuid,
  plan_name text
) RETURNS void AS $$
BEGIN
  UPDATE public.workspace_subscriptions
  SET
    soda_enabled     = plan_name IN ('professional', 'enterprise'),
    roda_enabled     = plan_name IN ('professional', 'enterprise'),
    voda_enabled     = plan_name IN ('pilot', 'professional', 'enterprise'),
    coda_enabled     = plan_name IN ('pilot', 'professional', 'enterprise'),
    hri_enabled      = plan_name = 'enterprise',
    foda_enabled     = plan_name = 'enterprise',
    camera_limit     = CASE plan_name
                         WHEN 'pilot' THEN 3
                         WHEN 'professional' THEN 16
                         WHEN 'enterprise' THEN 0  -- unlimited
                         ELSE 1
                       END,
    api_quota_monthly = CASE plan_name
                          WHEN 'pilot' THEN 5000
                          WHEN 'professional' THEN 50000
                          WHEN 'enterprise' THEN 0
                          ELSE 500
                        END,
    max_stores       = CASE plan_name
                         WHEN 'pilot' THEN 1
                         WHEN 'professional' THEN 5
                         WHEN 'enterprise' THEN 0
                         ELSE 1
                       END,
    max_users        = CASE plan_name
                         WHEN 'pilot' THEN 3
                         WHEN 'professional' THEN 15
                         WHEN 'enterprise' THEN 0
                         ELSE 2
                       END,
    updated_at = now()
  WHERE id = sub_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
