import { FODAPage as OriginalFODAPage } from '@/components/pages/FODAPage'
import { useNavigate } from 'react-router-dom'

export function FODAPage() {
  const navigate = useNavigate()
  return <OriginalFODAPage onNavigate={(path) => navigate(`/${path}`)} />
}
