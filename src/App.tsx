import { lazy, Suspense, type ComponentType } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { AppLayout } from '@/components/AppLayout'
import ProtectedRoute from '@/components/ProtectedRoute'

function lazyPage<T extends Record<string, unknown>>(loader: () => Promise<T>, exportName: keyof T) {
  return lazy(() =>
    loader().then((module) => {
      const component = (module[exportName] ?? module.default) as ComponentType<any>
      return { default: component }
    })
  )
}

const AuthPage = lazyPage(() => import('@/components/pages/AuthPage'), 'AuthPage')
const AuthCallbackPage = lazyPage(() => import('@/components/pages/AuthCallbackPage'), 'AuthCallbackPage')
const NotFoundPage = lazyPage(() => import('@/components/pages/NotFoundPage'), 'NotFoundPage')
const HomePage = lazyPage(() => import('@/routes/HomePage'), 'HomePage')
const LandingPage = lazyPage(() => import('@/routes/LandingPage'), 'LandingPage')
const PlatformPage = lazyPage(() => import('@/routes/PlatformPage'), 'PlatformPage')
const ProductsPage = lazyPage(() => import('@/routes/ProductsPage'), 'ProductsPage')
const SignInPage = lazyPage(() => import('@/routes/SignInPage'), 'SignInPage')
const SignUpPage = lazyPage(() => import('@/routes/SignUpPage'), 'SignUpPage')
const ForgotPasswordPage = lazyPage(() => import('@/routes/ForgotPasswordPage'), 'ForgotPasswordPage')
const ResetPasswordPage = lazyPage(() => import('@/routes/ResetPasswordPage'), 'ResetPasswordPage')
const SdkPage = lazyPage(() => import('@/routes/SdkPage'), 'SdkPage')
const TwoFactorSetupPage = lazyPage(() => import('@/routes/TwoFactorSetupPage'), 'TwoFactorSetupPage')
const TwoFactorVerifyPage = lazyPage(() => import('@/routes/TwoFactorVerifyPage'), 'TwoFactorVerifyPage')
const PlaygroundPage = lazyPage(() => import('@/routes/PlaygroundPage'), 'PlaygroundPage')
const AgentChat = lazyPage(() => import('@/routes/AgentChat'), 'AgentChat')
const NepaAgentPage = lazyPage(() => import('@/routes/products/NepaAgentPage'), 'NepaAgentPage')
const LoginPage = lazyPage(() => import('@/routes/dashboard/LoginPage'), 'LoginPage')
const DashboardLayout = lazyPage(() => import('@/routes/dashboard/DashboardLayout'), 'DashboardLayout')
const DashboardPage = lazyPage(() => import('@/routes/dashboard/DashboardPage'), 'DashboardPage')
const RobotTasksPage = lazyPage(() => import('@/routes/dashboard/RobotTasksPage'), 'RobotTasksPage')
const ContactSubmissionsPage = lazyPage(() => import('@/routes/dashboard/ContactSubmissionsPage'), 'ContactSubmissionsPage')
const VODAPage = lazyPage(() => import('@/routes/products/VODAPage'), 'VODAPage')
const RODAPage = lazyPage(() => import('@/routes/products/RODAPage'), 'RODAPage')
const EODAPage = lazyPage(() => import('@/routes/products/EODAPage'), 'EODAPage')
const FODAPage = lazyPage(() => import('@/routes/products/FODAPage'), 'FODAPage')
const SODAPage = lazyPage(() => import('@/routes/products/SODAPage'), 'SODAPage')
const HRIPage = lazyPage(() => import('@/routes/products/HRIPage'), 'HRIPage')
const VODACODAPage = lazyPage(() => import('@/components/pages/VODACODAPage'), 'default')
const SODARODAPage = lazyPage(() => import('@/components/pages/SODARODAPage'), 'SODARODAPage')
const DocsPage = lazyPage(() => import('@/routes/resources/DocsPage'), 'DocsPage')
const ApiReferencePage = lazyPage(() => import('@/routes/resources/ApiReferencePage'), 'ApiReferencePage')
const GuidesPage = lazyPage(() => import('@/routes/resources/GuidesPage'), 'GuidesPage')
const ChangelogPage = lazyPage(() => import('@/routes/resources/ChangelogPage'), 'ChangelogPage')
const StatusPage = lazyPage(() => import('@/routes/resources/StatusPage'), 'StatusPage')
const CompanyPage = lazyPage(() => import('@/routes/about/CompanyPage'), 'CompanyPage')
const TechnologyPage = lazyPage(() => import('@/routes/about/TechnologyPage'), 'TechnologyPage')
const CareersPage = lazyPage(() => import('@/routes/about/CareersPage'), 'CareersPage')
const CommunityPage = lazyPage(() => import('@/routes/about/CommunityPage'), 'CommunityPage')
const ContactPage = lazyPage(() => import('@/routes/about/ContactPage'), 'ContactPage')
const PrivacyPage = lazyPage(() => import('@/routes/about/PrivacyPage'), 'PrivacyPage')
const TermsPage = lazyPage(() => import('@/routes/about/TermsPage'), 'TermsPage')
const SecurityPage = lazyPage(() => import('@/routes/about/SecurityPage'), 'SecurityPage')
const PricingPage = lazyPage(() => import('@/routes/PricingPage'), 'PricingPage')
const BusinessPage = lazyPage(() => import('@/routes/BusinessPage'), 'BusinessPage')
const Partnership = lazyPage(() => import('@/routes/business/Partnership'), 'Partnership')
const CaseStudies = lazyPage(() => import('@/routes/business/CaseStudies'), 'CaseStudies')
const Plans = lazyPage(() => import('@/routes/business/Plans'), 'Plans')
const FacilityWatchPortal = lazyPage(() => import('@/routes/dashboard/portals/FacilityWatchPortal'), 'FacilityWatchPortal')
const RoboticOpsPortal = lazyPage(() => import('@/routes/dashboard/portals/RoboticOpsPortal'), 'RoboticOpsPortal')
const DroneInspectPortal = lazyPage(() => import('@/routes/dashboard/portals/DroneInspectPortal'), 'DroneInspectPortal')
const VodaPortal = lazyPage(() => import('@/routes/dashboard/portals/VodaPortal'), 'VodaPortal')

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
      Loading route...
    </div>
  )
}

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
      <Route path="/products/soda-roda" element={<SODARODAPage />} />
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
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route path="/auth/reset-password" element={<ResetPasswordPage />} />

          {PublicRoutes()}
          {DashboardRoutes()}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
