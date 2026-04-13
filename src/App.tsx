import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { AppLayout } from '@/components/AppLayout'

import { HomePage } from '@/routes/HomePage'
import { LandingPage } from '@/routes/LandingPage'
import { SignInPage } from '@/routes/SignInPage'
import { SignUpPage } from '@/routes/SignUpPage'
import { ForgotPasswordPage } from '@/routes/ForgotPasswordPage'
import { ResetPasswordPage } from '@/routes/ResetPasswordPage'
import { TwoFactorSetupPage } from '@/routes/TwoFactorSetupPage'
import { TwoFactorVerifyPage } from '@/routes/TwoFactorVerifyPage'
import { PlaygroundPage } from '@/routes/PlaygroundPage'
import { AgentChat } from '@/routes/AgentChat'
import { NepaAgent } from '@/pages/NepaAgent'

import { LoginPage } from '@/routes/dashboard/LoginPage'
import { DashboardLayout } from '@/routes/dashboard/DashboardLayout'
import { DashboardPage } from '@/routes/dashboard/DashboardPage'
import { RobotTasksPage } from '@/routes/dashboard/RobotTasksPage'
import { ContactSubmissionsPage } from '@/routes/dashboard/ContactSubmissionsPage'

import { VODAPage } from '@/routes/products/VODAPage'
import { RODAPage } from '@/routes/products/RODAPage'
import { EODAPage } from '@/routes/products/EODAPage'
import { FODAPage } from '@/routes/products/FODAPage'
import { NepaAgentPage } from '@/routes/products/NepaAgentPage'
import { SODAPage } from '@/routes/products/SODAPage'

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

/* Portal dashboard pages */
import { FacilityWatchPortal } from '@/routes/dashboard/portals/FacilityWatchPortal'
import { RoboticOpsPortal } from '@/routes/dashboard/portals/RoboticOpsPortal'
import { DroneInspectPortal } from '@/routes/dashboard/portals/DroneInspectPortal'

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
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/landing" element={<LandingPage />} />
        
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/2fa-setup" element={<TwoFactorSetupPage pendingEmail="" />} />
        <Route path="/2fa-verify" element={<TwoFactorVerifyPage pendingEmail="" />} />

        <Route path="/playground" element={<PlaygroundPage />} />
        <Route path="/agent" element={<NepaAgent />} />
        <Route path="/chat" element={<AgentChat />} />

        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/business/partnership" element={<Partnership />} />
        <Route path="/business/case-studies" element={<CaseStudies />} />
        <Route path="/business/plans" element={<Plans />} />

        <Route path="/products/voda" element={<VODAPage />} />
        <Route path="/products/roda" element={<RODAPage />} />
        <Route path="/products/eoda" element={<EODAPage />} />
        <Route path="/products/foda" element={<FODAPage />} />
        <Route path="/products/nepa-agent" element={<NepaAgentPage />} />
        <Route path="/products/soda" element={<SODAPage />} />
        <Route path="/products" element={<Navigate to="/landing" replace />} />
        <Route path="/products/enterprise" element={<Navigate to="/business#enterprise-services" replace />} />

        <Route path="/resources/docs" element={<DocsPage />} />
        <Route path="/resources/api" element={<ApiReferencePage />} />
        <Route path="/resources/guides" element={<GuidesPage />} />
        <Route path="/resources/changelog" element={<ChangelogPage />} />
        <Route path="/resources/status" element={<StatusPage />} />

        <Route path="/about/company" element={<CompanyPage />} />
        <Route path="/about/technology" element={<TechnologyPage />} />
        <Route path="/about/careers" element={<CareersPage />} />
        <Route path="/about/community" element={<CommunityPage />} />
        <Route path="/about/contact" element={<ContactPage />} />
        <Route path="/about/privacy" element={<PrivacyPage />} />
        <Route path="/about/terms" element={<TermsPage />} />
        <Route path="/about/security" element={<SecurityPage />} />
        <Route path="/business/case-studies/unmanned-retail-hk" element={<Navigate to="/business#case-studies" replace />} />
        <Route path="/business/case-studies/drone-inspection-facade" element={<Navigate to="/business#case-studies" replace />} />
        <Route path="/business/case-studies/robotic-delivery-logistics" element={<Navigate to="/business#case-studies" replace />} />
      </Route>

      {/* Legacy login redirect */}
      <Route path="/login" element={<Navigate to="/signin" replace />} />

      {/* Protected Dashboard with portal sub-routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="facility-watch" element={<FacilityWatchPortal />} />
        <Route path="robotic-ops" element={<RoboticOpsPortal />} />
        <Route path="drone-inspect" element={<DroneInspectPortal />} />
        <Route path="tasks" element={<RobotTasksPage />} />
        <Route path="contacts" element={<ContactSubmissionsPage />} />
        {/* Legacy routes redirect to portals */}
        <Route path="facade" element={<Navigate to="/dashboard/drone-inspect" replace />} />
        <Route path="audit" element={<DashboardPage />} />
        <Route path="live" element={<DashboardPage />} />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
