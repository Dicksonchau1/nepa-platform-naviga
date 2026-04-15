import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { ScrollToTopFab } from './ScrollToTopFab'
import { AnimatedBackground } from './AnimatedBackground'
import { MouseSpotlight } from './MouseSpotlight'
import { Toaster } from '@/components/ui/sonner'

export function AppLayout() {
  return (
  <div className="relative min-h-screen overflow-x-hidden bg-background">
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
        <AnimatedBackground />
      </div>
    <div className="pointer-events-none fixed inset-0 z-0">
        <MouseSpotlight />
      </div>
      <Navbar />
      <main className="pt-16 relative z-10">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopFab />
      <Toaster />
    </div>
  )
}
