import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useKV } from '@github/spark/hooks'
import { AppLayout } from '@/components/AppLayout'

import { HomePage } from '@/routes/HomePage'
import { SignInPage } from '@/routes/SignInPage'
import { SignUpPage } from '@/routes/SignUpPage'
import { ForgotPasswordPage } from '@/routes/ForgotPasswordPage'
import { ResetPasswordPage } from '@/routes/ResetPasswordPage'
import { TwoFactorSetupPage } from '@/routes/TwoFactorSetupPage'
import { TwoFactorVerifyPage } from '@/routes/TwoFactorVerifyPage'

import { VODAPage } from '@/routes/products/VODAPage'
import { RODAPage } from '@/routes/products/RODAPage'
import { EODAPage } from '@/routes/products/EODAPage'
import { FODAPage } from '@/routes/products/FODAPage'
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

function App() {
  const [pendingEmail, setPendingEmail] = useKV<string>('aura-pending-email', '')

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          
          <Route path="/signin" element={<SignInPage setPendingEmail={setPendingEmail} />} />
          <Route path="/signup" element={<SignUpPage setPendingEmail={setPendingEmail} />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/2fa-setup" element={<TwoFactorSetupPage pendingEmail={pendingEmail || ''} />} />
          <Route path="/2fa-verify" element={<TwoFactorVerifyPage pendingEmail={pendingEmail || ''} />} />

          <Route path="/products/voda" element={<VODAPage />} />
          <Route path="/products/roda" element={<RODAPage />} />
          <Route path="/products/eoda" element={<EODAPage />} />
          <Route path="/products/foda" element={<FODAPage />} />
          <Route path="/products/soda" element={<SODAPage />} />

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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
