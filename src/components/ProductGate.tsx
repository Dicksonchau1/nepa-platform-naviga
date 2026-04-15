import { useFeatureFlags } from '@/hooks/useFeatureFlags'
import type { ProductKey } from '@/types/features'
import { useNavigate } from 'react-router-dom'

interface Props {
  product: ProductKey
  children: React.ReactNode
}

export default function ProductGate({ product, children }: Props) {
  const { isEnabled, flags } = useFeatureFlags()
  const navigate = useNavigate()

  if (!flags) return null

  if (!isEnabled(product)) {
    return (
      <div className="min-h-screen bg-[#060b14] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-4">
            Access Restricted
          </div>
          <h2 className="text-white text-2xl font-semibold mb-3">
            {product.toUpperCase()} is not enabled on your plan
          </h2>
          <p className="text-gray-400 text-sm font-mono mb-6">
            Upgrade your workspace subscription to unlock this product.
          </p>
          <button
            onClick={() => navigate('/pricing')}
            className="bg-cyan-500 text-black font-semibold px-6 py-3 rounded-lg font-mono text-sm hover:bg-cyan-400 transition-colors"
          >
            View Plans
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
