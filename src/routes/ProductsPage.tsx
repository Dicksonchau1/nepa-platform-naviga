import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const products = [
  {
    title: 'SODA',
    description: 'Autonomous unmanned store operations.',
    href: '/products/soda',
  },
  {
    title: 'RODA',
    description: 'Robotic restocking and execution layer.',
    href: '/products/roda',
  },
  {
    title: 'VODA / CODA',
    description: 'Video intelligence + evidence SaaS pipeline.',
    href: '/products/voda-coda',
  },
  {
    title: 'HRI',
    description: 'HR intelligence API + interview analytics.',
    href: '/products/hri',
  },
  {
    title: 'FODA',
    description: 'Optional inspection and drone intelligence.',
    href: '/products/foda',
  },
]

export function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white pt-28 pb-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-semibold mb-4">Products</h1>
        <p className="text-white/60 text-lg mb-10">
          SODA, RODA, VODA/CODA, and HRI all run on the same NEPA world model.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product) => (
            <div key={product.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-2xl font-semibold">{product.title}</h3>
              <p className="text-white/60 mt-2">{product.description}</p>
              <Button asChild variant="outline" className="mt-6 border-white/20 text-white">
                <Link to={product.href}>Learn more</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
