import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { AppLayout } from '@/components/AppLayout'
import { useAuth } from '@/contexts/AuthContext'

/* ---- Public route pages (from @/routes) ---- */
import { HomePage } from '@/routes/HomePage'
import { LandingPage } from '@/routes/LandingPage'
import { PlatformPage } from '@/routes/PlatformPage'
import { ProductsPage } from '@/routes/ProductsPage'
import { SignInPage } from '@/routes/SignInPage'
import { SignUpPage } from '@/routes/SignUpPage'
import { ForgotPasswordPage } from '@/routes/ForgotPasswordPage'
import { ResetPasswordPage } from '@/routes/ResetPasswordPage'
import { SdkPage } from '@/routes/SdkPage'
import { TwoFactorSetupPage } from '@/routes/TwoFactorSetupPage'
import { TwoFactorVerifyPage } from '@/routes/TwoFactorVerifyPage'
import { PlaygroundPage } from '@/routes/PlaygroundPage'
import { AgentChat } from '@/routes/AgentChat'
import { PricingPage } from '@/routes/PricingPage'
import { BusinessPage } from '@/routes/BusinessPage'

/* ---- Product pages ---- */
import { VODAPage } from '@/routes/products/VODAPage'
import { RODAPage } from '@/routes/products/RODAPage'
import { FODAPage } from '@/routes/products/FODAPage'
import { SODAPage } from '@/routes/products/SODAPage'
import { HRIPage } from '@/routes/products/HRIPage'
import { NepaAgentPage } from '@/routes/products/NepaAgentPage'

/* ---- Business sub-pages ---- */
import { Partnership } from '@/routes/business/Partnership'
import { CaseStudies } from '@/routes/business/CaseStudies'
import { Plans } from '@/routes/business/Plans'

/* ---- Resource pages ---- */
import { DocsPage } from '@/routes/resources/DocsPage'
import { ApiReferencePage } from '@/routes/resources/ApiReferencePage'
import { GuidesPage } from '@/routes/resources/GuidesPage'
import { ChangelogPage } from '@/routes/resources/ChangelogPage'
import { StatusPage } from '@/routes/resources/StatusPage'

/* ---- About pages ---- */
import { CompanyPage } from '@/routes/about/CompanyPage'
import { TechnologyPage } from '@/routes/about/TechnologyPage'
import { CareersPage } from '@/routes/about/CareersPage'
import { CommunityPage } from '@/routes/about/CommunityPage'
import { ContactPage } from '@/routes/about/ContactPage'
import { PrivacyPage } from '@/routes/about/PrivacyPage'
import { TermsPage } from '@/routes/about/TermsPage'
import { SecurityPage } from '@/routes/about/SecurityPage'

/* ---- Dashboard (protected) ---- */
import { DashboardLayout } from '@/routes/dashboard/DashboardLayout'
import { DashboardPage } from '@/routes/dashboard/DashboardPage'
import { RobotTasksPage } from '@/routes/dashboard/RobotTasksPage'
import { ContactSubmissionsPage } from '@/routes/dashboard/ContactSubmissionsPage'
import { FacilityWatchPortal } from '@/routes/dashboard/portals/FacilityWatchPortal'
import { RoboticOpsPortal } from '@/routes/dashboard/portals/RoboticOpsPortal'
import { DroneInspectPortal } from '@/routes/dashboard/portals/DroneInspectPortal'
import { VodaPortal } from '@/routes/dashboard/portals/VodaPortal'

/* ---- Standalone pages ---- */
import { NepaAgent } from '@/pages/NepaAgent'
import AuthPage from '@/components/pages/AuthPage'
import AuthCallbackPage from '@/components/pages/AuthCallbackPage'
import NotFoundPage from '@/components/pages/NotFoundPage'

/* ------------------------------------------------------------------ */
/*  Route Guards                                                       */
/* ------------------------------------------------------------------ */

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }
  if (!user) {
    return <Navigate to="/auth/sign-in" state={{ from: location }} replace />
  }
  return <>{children}</>
}

function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }
  if (user) {
    return <Navigate to="/dashboard" replace />
  }
  return <>{children}</>
}

/* ------------------------------------------------------------------ */
/*  App Routes                                                         */
/* ------------------------------------------------------------------ */

function AppRoutes() {
  const navigate = useNavigate()
  const handleNavigate = (page: string) => {
    const normalizedPage = page.startsWith('/') ? page.slice(1) : page
    navigate(`/${normalizedPage}`)
  }

  return (
    <Routes>
      {/* ---- Public pages inside AppLayout (navbar + footer) ---- */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage onNavigate={handleNavigate} />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/platform" element={<PlatformPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/business/partnership" element={<Partnership />} />
        <Route path="/business/case-studies" element={<CaseStudies />} />
        <Route path="/business/plans" element={<Plans />} />

        {/* Product pages */}
        <Route path="/products/voda" element={<VODAPage />} />
        <Route path="/products/voda-coda" element={<VODAPage />} />
        <Route path="/products/roda" element={<RODAPage />} />
        <Route path="/products/foda" element={<FODAPage />} />
        <Route path="/products/soda" element={<SODAPage />} />
        <Route path="/products/hri" element={<HRIPage />} />
        <Route path="/products/nepa-agent" element={<NepaAgentPage />} />
        <Route path="/products/nepa" element={<NepaAgentPage />} />
        <Route path="/nepa" element={<NepaAgentPage />} />
        <Route path="/products/enterprise" element={<Navigate to="/business#enterprise-services" replace />} />

        {/* Docs / Resources */}
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/docs/api" element={<ApiReferencePage />} />
        <Route path="/docs/sdk" element={<SdkPage />} />
        <Route path="/docs/guides" element={<GuidesPage />} />
        <Route path="/docs/changelog" element={<ChangelogPage />} />
        <Route path="/docs/status" element={<StatusPage />} />

        {/* About */}
        <Route path="/about" element={<Navigate to="/about/company" replace />} />
        <Route path="/about/company" element={<CompanyPage />} />
        <Route path="/about/technology" element={<TechnologyPage />} />
        <Route path="/about/careers" element={<CareersPage />} />
        <Route path="/about/community" element={<CommunityPage />} />
        <Route path="/about/contact" element={<ContactPage />} />
        <Route path="/about/security" element={<SecurityPage />} />

        {/* Legal */}
        <Route path="/legal/terms" element={<TermsPage />} />
        <Route path="/legal/privacy" element={<PrivacyPage />} />
        <Route path="/legal" element={<Navigate to="/legal/terms" replace />} />

        {/* Interactive pages */}
        <Route path="/playground" element={<PlaygroundPage />} />
        <Route path="/agent" element={<NepaAgent />} />
        <Route path="/chat" element={<AgentChat />} />

        {/* Auth (public-only) */}
        <Route
          path="/auth/sign-in"
          element={<PublicOnlyRoute><SignInPage /></PublicOnlyRoute>}
        />
        <Route
          path="/auth/sign-up"
          element={<PublicOnlyRoute><SignUpPage /></PublicOnlyRoute>}
        />
        <Route
          path="/auth/forgot-password"
          element={<PublicOnlyRoute><ForgotPasswordPage /></PublicOnlyRoute>}
        />
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
        <Route path="/2fa-setup" element={<TwoFactorSetupPage pendingEmail="" />} />
        <Route path="/2fa-verify" element={<TwoFactorVerifyPage pendingEmail="" />} />
      </Route>

      {/* ---- Auth standalone pages ---- */}
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/auth/callback" element={<AuthCallbackPage />} />

      {/* ---- Protected Dashboard ---- */}
      <Route
        path="/dashboard"
        element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}
      >
        <Route index element={<DashboardPage />} />
        <Route path="facility-watch" element={<FacilityWatchPortal />} />
        <Route path="robotic-ops" element={<RoboticOpsPortal />} />
        <Route path="drone-inspect" element={<DroneInspectPortal />} />
        <Route path="voda" element={<VodaPortal />} />
        <Route path="tasks" element={<RobotTasksPage />} />
        <Route path="contacts" element={<ContactSubmissionsPage />} />
        {/* Legacy dashboard redirects */}
        <Route path="facade" element={<Navigate to="/dashboard/drone-inspect" replace />} />
        <Route path="audit" element={<DashboardPage />} />
        <Route path="live" element={<DashboardPage />} />
      </Route>

      {/* ---- Legacy redirects ---- */}
      <Route path="/login" element={<Navigate to="/auth/sign-in" replace />} />
      <Route path="/signin" element={<Navigate to="/auth/sign-in" replace />} />
      <Route path="/signup" element={<Navigate to="/auth/sign-up" replace />} />
      <Route path="/forgot-password" element={<Navigate to="/auth/forgot-password" replace />} />
      <Route path="/reset-password" element={<Navigate to="/auth/reset-password" replace />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/contact" element={<Navigate to="/about/contact" replace />} />
      <Route path="/terms" element={<Navigate to="/legal/terms" replace />} />
      <Route path="/privacy" element={<Navigate to="/legal/privacy" replace />} />
      <Route path="/technology" element={<Navigate to="/about/technology" replace />} />
      <Route path="/community" element={<Navigate to="/about/community" replace />} />
      <Route path="/careers" element={<Navigate to="/about/careers" replace />} />
      <Route path="/resources" element={<Navigate to="/docs" replace />} />
      <Route path="/resources/docs" element={<Navigate to="/docs" replace />} />
      <Route path="/resources/api" element={<Navigate to="/docs/api" replace />} />
      <Route path="/resources/guides" element={<Navigate to="/docs/guides" replace />} />
      <Route path="/resources/changelog" element={<Navigate to="/docs/changelog" replace />} />
      <Route path="/resources/status" element={<Navigate to="/docs/status" replace />} />
      <Route path="/about/privacy" element={<Navigate to="/legal/privacy" replace />} />
      <Route path="/about/terms" element={<Navigate to="/legal/terms" replace />} />
      <Route path="/solutions-retail" element={<Navigate to="/products/soda" replace />} />
      <Route path="/solutions-inspection" element={<Navigate to="/products/foda" replace />} />
      <Route path="/solutions-robotics" element={<Navigate to="/products/roda" replace />} />
      <Route path="/case-studies" element={<Navigate to="/business/case-studies" replace />} />

      {/* ---- 404 ---- */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
