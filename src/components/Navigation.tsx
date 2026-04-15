import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CaretDown } from '@phosphor-icons/react'

interface NavigationProps {
  currentPage: string
}

export function Navigation({ currentPage }: NavigationProps) {
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false)
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/20 bg-background/60 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="text-xl font-bold tracking-tight hover:text-primary transition-colors"
          >
            AuraSense NEPA
          </button>

          <div className="flex items-center gap-6">
            <DropdownMenu open={isProductsOpen} onOpenChange={setIsProductsOpen}>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary">
                  Products
                  <CaretDown
                    size={14}
                    className={`transition-transform ${isProductsOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-72 bg-card/95 backdrop-blur-xl border-border/30">
                <DropdownMenuItem onClick={() => { navigate('/products'); setIsProductsOpen(false) }} className="cursor-pointer">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold">NEPA VODEC Agent</span>
                    <span className="text-xs text-muted-foreground">Real-time world model from camera streams</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { navigate('/products'); setIsProductsOpen(false) }} className="cursor-pointer">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold">NEPA Edge Runtime</span>
                    <span className="text-xs text-muted-foreground">Jetson-class deployment</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { navigate('/products'); setIsProductsOpen(false) }} className="cursor-pointer">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold">NEPA Cloud Console</span>
                    <span className="text-xs text-muted-foreground">Multi-site management</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu open={isSolutionsOpen} onOpenChange={setIsSolutionsOpen}>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary">
                  Solutions
                  <CaretDown
                    size={14}
                    className={`transition-transform ${isSolutionsOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-64 bg-card/95 backdrop-blur-xl border-border/30">
                <DropdownMenuItem onClick={() => { navigate('/business/case-studies/unmanned-retail-hk'); setIsSolutionsOpen(false) }} className="cursor-pointer">
                  Unmanned Retail
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { navigate('/business/case-studies/drone-inspection-facade'); setIsSolutionsOpen(false) }} className="cursor-pointer">
                  Autonomous Inspection
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { navigate('/business/case-studies/robotic-delivery-logistics'); setIsSolutionsOpen(false) }} className="cursor-pointer">
                  Service & Delivery Robotics
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={() => navigate('/about/technology')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                currentPage === 'technology' ? 'text-primary' : 'text-foreground'
              }`}
            >
              Technology
            </button>

            <DropdownMenu open={isResourcesOpen} onOpenChange={setIsResourcesOpen}>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary">
                  Resources
                  <CaretDown
                    size={14}
                    className={`transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48 bg-card/95 backdrop-blur-xl border-border/30">
                <DropdownMenuItem onClick={() => { navigate('/resources/docs'); setIsResourcesOpen(false) }} className="cursor-pointer">
                  Documentation
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { navigate('/resources/docs'); setIsResourcesOpen(false) }} className="cursor-pointer">
                  Playground
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { navigate('/resources/changelog'); setIsResourcesOpen(false) }} className="cursor-pointer">
                  Changelog
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { navigate('/resources/status'); setIsResourcesOpen(false) }} className="cursor-pointer">
                  Security & Compliance
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={() => navigate('/about/community')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                currentPage === 'community' ? 'text-primary' : 'text-foreground'
              }`}
            >
              Community
            </button>

            <DropdownMenu open={isAboutOpen} onOpenChange={setIsAboutOpen}>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary">
                  About
                  <CaretDown
                    size={14}
                    className={`transition-transform ${isAboutOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48 bg-card/95 backdrop-blur-xl border-border/30">
                <DropdownMenuItem onClick={() => { navigate('/about/company'); setIsAboutOpen(false) }} className="cursor-pointer">
                  About Us
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { navigate('/about/careers'); setIsAboutOpen(false) }} className="cursor-pointer">
                  Careers
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              onClick={() => navigate('/signin')}
              variant="ghost"
              size="sm"
              className="text-sm font-medium"
            >
              Sign in
            </Button>

            <Button
              onClick={() => navigate('/signup')}
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 border border-primary/20 text-sm px-6"
            >
              Get started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
