import { TwoFactorVerifyPage as OriginalTwoFactorVerifyPage } from '@/components/pages/TwoFactorVerifyPage'
import { useNavigate } from 'react-router-dom'

interface TwoFactorVerifyPageProps {
  pendingEmail: string
}

export function TwoFactorVerifyPage({ pendingEmail }: TwoFactorVerifyPageProps) {
  const navigate = useNavigate()
  return (
    <OriginalTwoFactorVerifyPage
      userEmail={pendingEmail}
      onNavigate={(path) => navigate(`/${path}`)}
      onVerified={() => navigate('/')}
    />
  )
}
