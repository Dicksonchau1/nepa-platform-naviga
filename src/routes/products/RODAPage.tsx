import { RODAPage as OriginalRODAPage } from '@/components/pages/RODAPage'
import { useNavigate } from 'react-router-dom'

export function RODAPage() {
  const navigate = useNavigate()
  return <OriginalRODAPage onNavigate={(path) => navigate(`/${path}`)} />
}
