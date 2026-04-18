/**
 * useProvisioningClaim
 *
 * Block #7 — Stripe → Supabase Auto-Provisioning
 *
 * Runs once on first authenticated render of the dashboard.
 * Calls `claim_pending_provision` RPC, and if a pending row is found,
 * redirects the user to the correct portal and marks the claim as done
 * in localStorage so the hook does not re-trigger on subsequent renders.
 *
 * Portal route mapping (matches DashboardLayout navItems):
 *   robotic_ops    → /dashboard/robotic-ops
 *   drone_inspect  → /dashboard/drone-inspect
 *   facility_watch → /dashboard/facility-watch
 *
 * Usage:
 *   import { useProvisioningClaim } from '@/hooks/useProvisioningClaim'
 *   // Call inside a component that has access to the authenticated user:
 *   useProvisioningClaim()
 */

import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/contexts/AuthContext'

const PORTAL_ROUTES: Record<string, string> = {
  robotic_ops: '/dashboard/robotic-ops',
  drone_inspect: '/dashboard/drone-inspect',
  facility_watch: '/dashboard/facility-watch',
}

function getClaimKey(email: string): string {
  return `provisioning_claimed_${email}`
}

export function useProvisioningClaim() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const ran = useRef(false)

  useEffect(() => {
    // Guard: only run once per mount, only when authenticated
    if (ran.current || !user?.email) return
    ran.current = true

    const email = user.email
    const claimKey = getClaimKey(email)

    // Skip if already claimed in this browser
    if (localStorage.getItem(claimKey) === 'done') return

    async function claimProvision() {
      try {
        const { data, error } = await supabase.rpc('claim_pending_provision', {
          p_email: email,
        })

        if (error) {
          // RPC errors (e.g. no row found) are non-fatal — user may have no provision
          console.warn('[useProvisioningClaim] RPC error:', error.message)
          return
        }

        // data is an array of claimed pending_provisions rows
        const rows = Array.isArray(data) ? data : data ? [data] : []
        if (rows.length === 0) {
          // No pending provision — nothing to do
          return
        }

        // Mark as claimed so we don't re-trigger
        localStorage.setItem(claimKey, 'done')

        // Redirect to the most recently claimed portal
        const claimed = rows[rows.length - 1] as { portal?: string }
        const portalKey = claimed.portal ?? ''
        const route = PORTAL_ROUTES[portalKey] ?? '/dashboard'

        console.info('[useProvisioningClaim] Redirecting to portal:', route)
        navigate(route, { replace: true })
      } catch (err) {
        // Non-fatal: log and continue — user lands on default dashboard
        console.error('[useProvisioningClaim] Unexpected error:', err)
      }
    }

    claimProvision()
  }, [user?.email, navigate])
}
