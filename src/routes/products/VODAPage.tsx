import { VODAPage as OriginalVODAPage } from '@/components/pages/VODAPage'
import { useNavigate } from 'react-router-dom'

export function VODAPage() {
  const navigate = useNavigate()
  return <OriginalVODAPage onNavigate={(path) => navigate(`/${path}`)} />
}
