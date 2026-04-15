import { TwoFactorSetupPage as OriginalTwoFactorSetupPage } from '@/components/pages/TwoFactorSetupPage'

interface TwoFactorSetupPageProps {
  pendingEmail: string
}

export function TwoFactorSetupPage({ pendingEmail }: TwoFactorSetupPageProps) {
  return <OriginalTwoFactorSetupPage userEmail={pendingEmail} />
}
