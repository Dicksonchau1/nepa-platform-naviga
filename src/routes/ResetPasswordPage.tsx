import { ResetPasswordPage as OriginalResetPasswordPage } from '@/components/pages/ResetPasswordPage'
import { useNavigate } from 'react-router-dom'

export function ResetPasswordPage() {
  const navigate = useNavigate()
  return <OriginalResetPasswordPage onNavigate={(path) => navigate(`/${path}`)} />
}
