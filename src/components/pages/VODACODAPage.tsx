import { useNavigate } from 'react-router-dom'
import { VODAPage } from './VODAPage'

export default function VODACODAPage() {
  const navigate = useNavigate()
  return <VODAPage onNavigate={(page) => navigate(`/${page}`)} />
}
