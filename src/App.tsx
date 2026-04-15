import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/components/AppLayout'
import ProtectedRoute from '@/components/ProtectedRoute'
import AuthPage from '@/components/pages/AuthPage'
import AuthCallbackPage from '@/components/pages/AuthCallbackPage'
import NotFoundPage from '@/components/pages/NotFoundPage'
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
import { NepaAgentPage } from '@/routes/products/NepaAgentPage'
import { LoginPage } from '@/routes/dashboard/LoginPage'
import { DashboardLayout } from '@/routes/dashboard/DashboardLayout'
import { DashboardPage } from '@/routes/dashboard/DashboardPage'
import { RobotTasksPage } from '@/routes/dashboard/RobotTasksPage'
import { ContactSubmissionsPage } from '@/routes/dashboard/ContactSubmissionsPage'
import { VODAPage } from '@/routes/products/VODAPage'
import { RODAPage } from '@/routes/products/RODAPage'
import { EODAPage } from '@/routes/products/EODAPage'
import { FODAPage } from '@/routes/products/FODAPage'
import { SODAPage } from '@/routes/products/SODAPage'
import { HRIPage } from '@/routes/products/HRIPage'
import VODACODAPage from '@/components/pages/VODACODAPage'
import { DocsPage } from '@/routes/resources/DocsPage'
import { ApiReferencePage } from '@/routes/resources/ApiReferencePage'
import { GuidesPage } from '@/routes/resources/GuidesPage'
import { ChangelogPage } from '@/routes/resources/ChangelogPage'
import { StatusPage } from '@/routes/resources/StatusPage'
import { CompanyPage } from '@/routes/about/CompanyPage'
import { TechnologyPage } from '@/routes/about/TechnologyPage'
import { CareersPage } from '@/routes/about/CareersPage'
import { CommunityPage } from '@/routes/about/CommunityPage'
import { ContactPage } from '@/routes/about/ContactPage'
import { PrivacyPage } from '@/routes/about/PrivacyPage'
import { TermsPage } from '@/routes/about/TermsPage'
import { SecurityPage } from '@/routes/about/SecurityPage'
import { PricingPage } from '@/routes/PricingPage'
import { BusinessPage } from '@/routes/BusinessPage'
import { Partnership } from '@/routes/business/Partnership'
import { CaseStudies } from '@/routes/business/CaseStudies'
import { Plans } from '@/routes/business/Plans'
import { FacilityWatchPortal } from '@/routes/dashboard/portals/FacilityWatchPortal'
import { RoboticOpsPortal } from '@/routes/dashboard/portals/RoboticOpsPortal'
import { DroneInspectPortal } from '@/routes/dashboard/portals/DroneInspectPortal'
import { VodaPortal } from '@/routes/dashboard/portals/VodaPortal'

function PublicRoutes() {
  return (
    <Route element={<AppLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/platform" element={<PlatformPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/nepa" element={<NepaAgentPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/business" element={<BusinessPage />} />
      <Route path="/business/partnership" element={<Partnership />} />
      <Route path="/business/case-studies" element={<CaseStudies />} />
      <Route path="/business/plans" element={<Plans />} />

      <Route path="/products/soda" element={<SODAPage />} />
      <Route path="/products/roda" element={<RODAPage />} />
      <Route path="/products/voda" element={<VODAPage />} />
      <Route path="/products/voda-coda" element={<VODACODAPage />} />
      <Route path="/products/eoda" element={<EODAPage />} />
      <Route path="/products/foda" element={<FODAPage />} />
      <Route path="/products/hri" element={<HRIPage />} />
      <Route path="/products/nepa-agent" element={<NepaAgentPage />} />
      <Route path="/products/nepa" element={<NepaAgentPage />} />
      <Route path="/products/enterprise" element={<Navigate to="/business#enterprise-services" replace />} />
      <Route path="/products" element={<Navigate to="/landing" replace />} />

      <Route path="/docs" element={<DocsPage />} />
      <Route path="/docs/api" element={<ApiReferencePage />} />
      <Route path="/docs/sdk" element={<SdkPage />} />
      <Route path="/docs/guides" element={<GuidesPage />} />
      <Route path="/docs/changelog" element={<ChangelogPage />} />
      <Route path="/docs/status" element={<StatusPage />} />

      <Route path="/about" element={<Navigate to="/about/company" replace />} />
      <Route path="/about/company" element={<CompanyPage />} />
      <Route path="/about/technology" element={<TechnologyPage />} />
      <Route path="/about/careers" element={<CareersPage />} />
      <Route path="/about/community" element={<CommunityPage />} />
      <Route path="/about/contact" element={<ContactPage />} />
      <Route path="/about/privacy" element={<PrivacyPage />} />
      <Route path="/about/terms" element={<TermsPage />} />
      <Route path="/about/security" element={<SecurityPage />} />
      <Route path="/contact" element={<Navigate to="/about/contact" replace />} />
      <Route path="/legal/privacy" element={<Navigate to="/about/privacy" replace />} />
      <Route path="/legal/terms" element={<Navigate to="/about/terms" replace />} />
      <Route path="/legal" element={<Navigate to="/legal/terms" replace />} />

      <Route path="/signin" element={<Navigate to="/auth?mode=signin" replace />} />
      <Route path="/signup" element={<Navigate to="/auth?mode=signup" replace />} />
      <Route path="/forgot-password" element={<Navigate to="/auth?mode=forgot" replace />} />
      <Route path="/reset-password" element={<Navigate to="/auth/reset-password" replace />} />
      <Route path="/login" element={<Navigate to="/auth?mode=signin" replace />} />
      <Route path="/home" element={<Navigate to="/" replace />} />

      <Route path="/2fa-setup" element={<TwoFactorSetupPage pendingEmail="" />} />
      <Route path="/2fa-verify" element={<TwoFactorVerifyPage pendingEmail="" />} />
      <Route path="/playground" element={<PlaygroundPage />} />
      <Route path="/agent" element={<Navigate to="/nepa" replace />} />
      <Route path="/chat" element={<AgentChat />} />

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
}
function DashboardRoutes() {
  return (
    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="facility-watch" element={<FacilityWatchPortal />} />
        <Route path="robotic-ops" element={<RoboticOpsPortal />} />
        <Route path="drone-inspect" element={<DroneInspectPortal />} />
        <Route path="voda" element={<VodaPortal />} />
        <Route path="tasks" element={<RobotTasksPage />} />
        <Route path="contacts" element={<ContactSubmissionsPage />} />
        <Route path="facade" element={<Navigate to="/dashboard/drone-inspect" replace />} />
        <Route path="audit" element={<DashboardPage />} />
        <Route path="live" element={<DashboardPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Route>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />

        {PublicRoutes()}
        {DashboardRoutes()}
      </Routes>
    </BrowserRouter>
  )
}
