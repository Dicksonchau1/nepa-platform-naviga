import { EODAPage as OriginalEODAPage } from '@/components/pages/EODAPage'
import { useNavigate } from 'react-router-dom'

export function EODAPage() {
  const navigate = useNavigate()
  return <OriginalEODAPage onNavigate={(path) => navigate(`/${path}`)} />
}
