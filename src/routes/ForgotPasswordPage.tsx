import { ForgotPasswordPage as OriginalForgotPasswordPage } from '@/components/pages/ForgotPasswordPage'
import { useNavigate } from 'react-router-dom'

export function ForgotPasswordPage() {
  const navigate = useNavigate()
  return <OriginalForgotPasswordPage onNavigate={(path) => navigate(`/${path}`)} />
}
