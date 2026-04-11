import { SODAPage as OriginalSODAPage } from '@/components/pages/SODAPage'
import { useNavigate } from 'react-router-dom'

export function SODAPage() {
  const navigate = useNavigate()
  return <OriginalSODAPage onNavigate={(path) => navigate(`/${path}`)} />
}
