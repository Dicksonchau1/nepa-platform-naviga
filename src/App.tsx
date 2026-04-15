import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { AppLayout } from '@/components/AppLayout'
import ProtectedRoute from '@/components/ProtectedRoute'
import ProductGate from '@/components/ProductGate'

import AuthPage from '@/components/pages/AuthPage'
import AuthCallbackPage from '@/components/pages/AuthCallbackPage'
import { HomePage } from '@/components/pages/HomePage'
import { SODAPage } from '@/components/pages/SODAPage'
import { RODAPage } from '@/components/pages/RODAPage'
import { EODAPage } from '@/components/pages/EODAPage'
import { FODAPage } from '@/components/pages/FODAPage'
import VODACODAPage from '@/components/pages/VODACODAPage'
import HRIPage from '@/components/pages/HRIPage'
import NEPAPage from '@/components/pages/NEPAPage'
import PricingPage from '@/components/pages/PricingPage'
import DashboardPage from '@/components/pages/DashboardPage'
import SODADashboardPage from '@/components/pages/SODADashboardPage'
import RODADashboardPage from '@/components/pages/RODADashboardPage'
import VODADashboardPage from '@/components/pages/VODADashboardPage'
import HRIDashboardPage from '@/components/pages/HRIDashboardPage'
import NotFoundPage from '@/components/pages/NotFoundPage'
import { ForgotPasswordPage } from '@/components/pages/ForgotPasswordPage'
import { ResetPasswordPage } from '@/components/pages/ResetPasswordPage'

import { PlaygroundPage } from '@/routes/PlaygroundPage'
import { AgentChat } from '@/routes/AgentChat'
import { BusinessPage } from '@/routes/BusinessPage'
import { Partnership } from '@/routes/business/Partnership'
import { CaseStudies } from '@/routes/business/CaseStudies'
import { Plans } from '@/routes/business/Plans'
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
import { LandingPage } from '@/routes/LandingPage'
import { NepaAgent } from '@/pages/NepaAgent'

function AppRoutes() {
  const navigate = useNavigate()
  const handleNavigate = (page: string) => navigate(`/${page}`)

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage onNavigate={handleNavigate} />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/products/soda" element={<SODAPage onNavigate={handleNavigate} />} />
        <Route path="/products/roda" element={<RODAPage onNavigate={handleNavigate} />} />
        <Route path="/products/voda-coda" element={<VODACODAPage />} />
        <Route path="/products/voda" element={<VODACODAPage />} />
        <Route path="/products/eoda" element={<EODAPage onNavigate={handleNavigate} />} />
        <Route path="/products/foda" element={<FODAPage onNavigate={handleNavigate} />} />
        <Route path="/products/hri" element={<HRIPage />} />
        <Route path="/products" element={<Navigate to="/landing" replace />} />
        <Route path="/products/enterprise" element={<Navigate to="/business#enterprise-services" replace />} />
        <Route path="/nepa" element={<NEPAPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/business/partnership" element={<Partnership />} />
        <Route path="/business/case-studies" element={<CaseStudies />} />
        <Route path="/business/plans" element={<Plans />} />
        <Route path="/business/case-studies/unmanned-retail-hk" element={<Navigate to="/business#case-studies" replace />} />
        <Route path="/business/case-studies/drone-inspection-facade" element={<Navigate to="/business#case-studies" replace />} />
        <Route path="/business/case-studies/robotic-delivery-logistics" element={<Navigate to="/business#case-studies" replace />} />
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
        <Route path="/playground" element={<PlaygroundPage />} />
        <Route path="/agent" element={<NepaAgent />} />
        <Route path="/chat" element={<AgentChat />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/contact" element={<Navigate to="/about/contact" replace />} />
        <Route path="/terms" element={<Navigate to="/about/terms" replace />} />
        <Route path="/privacy" element={<Navigate to="/about/privacy" replace />} />
        <Route path="/technology" element={<Navigate to="/about/technology" replace />} />
        <Route path="/community" element={<Navigate to="/about/community" replace />} />
        <Route path="/careers" element={<Navigate to="/about/careers" replace />} />
        <Route path="/resources" element={<Navigate to="/resources/docs" replace />} />
        <Route path="/solutions-retail" element={<Navigate to="/products/soda" replace />} />
        <Route path="/solutions-inspection" element={<Navigate to="/products/foda" replace />} />
        <Route path="/solutions-robotics" element={<Navigate to="/products/roda" replace />} />
      </Route>

      <Route path="/auth" element={<AuthPage />} />
      <Route path="/auth/callback" element={<AuthCallbackPage />} />
      <Route path="/auth/reset-password" element={<ResetPasswordPage onNavigate={handleNavigate} />} />
      <Route path="/auth/sign-in" element={<Navigate to="/auth?mode=signin" replace />} />
      <Route path="/auth/sign-up" element={<Navigate to="/auth?mode=signup" replace />} />
      <Route path="/auth/forgot" element={<Navigate to="/auth?mode=forgot" replace />} />

      <Route path="/signin" element={<Navigate to="/auth?mode=signin" replace />} />
      <Route path="/signup" element={<Navigate to="/auth?mode=signup" replace />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<Navigate to="/auth/reset-password" replace />} />
      <Route path="/login" element={<Navigate to="/auth?mode=signin" replace />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route
            path="/dashboard/soda"
            element={
              <ProductGate product="soda">
                <SODADashboardPage />
              </ProductGate>
            }
          />
          <Route
            path="/dashboard/roda"
            element={
              <ProductGate product="roda">
                <RODADashboardPage />
              </ProductGate>
            }
          />
          <Route
            path="/dashboard/voda"
            element={
              <ProductGate product="voda">
                <VODADashboardPage />
              </ProductGate>
            }
          />
          <Route
            path="/dashboard/hri"
            element={
              <ProductGate product="hri">
                <HRIDashboardPage />
              </ProductGate>
            }
          />
        </Route>
      </Route>

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
