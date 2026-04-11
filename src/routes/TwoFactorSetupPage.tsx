import { TwoFactorSetupPage as OriginalTwoFactorSetupPage } from '@/components/pages/TwoFactorSetupPage'
import { useNavigate } from 'react-router-dom'

interface TwoFactorSetupPageProps {
  pendingEmail: string
}

export function TwoFactorSetupPage({ pendingEmail }: TwoFactorSetupPageProps) {
  const navigate = useNavigate()
  return <OriginalTwoFactorSetupPage userEmail={pendingEmail} onNavigate={(path) => navigate(`/${path}`)} />
}
