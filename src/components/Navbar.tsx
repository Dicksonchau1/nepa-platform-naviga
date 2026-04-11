import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CaretDown } from '@phosphor-icons/react'
import logoImage from '@/assets/images/Gemini_Generated_Image_8oxhp28oxhp28oxh.png'

export function Navbar() {
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
      isScrolled 
        ? 'border-white/10 bg-[#050508]/95 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,212,255,0.1)]' 
        : 'border-white/5 bg-[#050508]/80 backdrop-blur-md'
    }`}>
      <div className="container mx-auto px-6 py-3.5">
        <div className="flex items-center justify-between gap-8">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative h-8 w-8 flex items-center justify-center">
              <img
                src={logoImage}
                alt="AuraSense"
                className="h-8 w-8 object-contain transition-all group-hover:drop-shadow-[0_0_12px_rgba(0,212,255,0.6)]"
              />
            </div>
            <span className="text-[15px] font-semibold text-white group-hover:text-cyan-400 transition-colors">
              AuraSense
            </span>
          </Link>

          <div className="flex items-center gap-8">
            <DropdownMenu open={isProductsOpen} onOpenChange={setIsProductsOpen}>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-sm font-medium text-white/70 hover:text-white transition-colors">
                  Products
                  <CaretDown
                    size={14}
                    weight="bold"
                    className={`transition-transform ${
                      isProductsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="w-72 bg-[#0A0D14]/98 backdrop-blur-xl border-white/10"
              >
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-cyan-500/10">
                  <NavLink to="/products/voda" onClick={() => setIsProductsOpen(false)}>
                    <div className="flex flex-col gap-1 py-1.5">
                      <span className="font-semibold text-sm text-white">
                        VODA — Video Agent
                      </span>
                      <span className="text-xs text-white/50">
                        Real-time video operations & detection
                      </span>
                    </div>
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-cyan-500/10">
                  <NavLink to="/products/roda" onClick={() => setIsProductsOpen(false)}>
                    <div className="flex flex-col gap-1 py-1.5">
                      <span className="font-semibold text-sm text-white">
                        RODA — Robotic Agent
                      </span>
                      <span className="text-xs text-white/50">
                        Autonomous navigation & mission control
                      </span>
                    </div>
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-cyan-500/10">
                  <NavLink to="/products/eoda" onClick={() => setIsProductsOpen(false)}>
                    <div className="flex flex-col gap-1 py-1.5">
                      <span className="font-semibold text-sm text-white">
                        EODA — Edge Agent
                      </span>
                      <span className="text-xs text-white/50">
                        Hardware-agnostic edge inference
                      </span>
                    </div>
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-cyan-500/10">
                  <NavLink to="/products/foda" onClick={() => setIsProductsOpen(false)}>
                    <div className="flex flex-col gap-1 py-1.5">
                      <span className="font-semibold text-sm text-white">
                        FODA — Facade Agent
                      </span>
                      <span className="text-xs text-white/50">
                        Aerial structural inspection
                      </span>
                    </div>
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-cyan-500/10">
                  <NavLink to="/products/soda" onClick={() => setIsProductsOpen(false)}>
                    <div className="flex flex-col gap-1 py-1.5">
                      <span className="font-semibold text-sm text-white">
                        SODA — Surveillance Agent
                      </span>
                      <span className="text-xs text-white/50">
                        Multi-camera facility intelligence
                      </span>
                    </div>
                  </NavLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu open={isResourcesOpen} onOpenChange={setIsResourcesOpen}>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-sm font-medium text-white/70 hover:text-white transition-colors">
                  Resources
                  <CaretDown
                    size={14}
                    weight="bold"
                    className={`transition-transform ${
                      isResourcesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="w-48 bg-[#0A0D14]/98 backdrop-blur-xl border-white/10"
              >
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-cyan-500/10 text-white/80">
                  <NavLink to="/resources/docs" onClick={() => setIsResourcesOpen(false)}>
                    Documentation
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-cyan-500/10 text-white/80">
                  <NavLink to="/resources/api" onClick={() => setIsResourcesOpen(false)}>
                    API Reference
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-cyan-500/10 text-white/80">
                  <NavLink
                    to="/resources/guides"
                    onClick={() => setIsResourcesOpen(false)}
                  >
                    Guides & Tutorials
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-cyan-500/10 text-white/80">
                  <NavLink
                    to="/resources/changelog"
                    onClick={() => setIsResourcesOpen(false)}
                  >
                    Changelog
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-cyan-500/10 text-white/80">
                  <NavLink
                    to="/resources/status"
                    onClick={() => setIsResourcesOpen(false)}
                  >
                    Status
                  </NavLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu open={isAboutOpen} onOpenChange={setIsAboutOpen}>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-sm font-medium text-white/70 hover:text-white transition-colors">
                  About
                  <CaretDown
                    size={14}
                    weight="bold"
                    className={`transition-transform ${
                      isAboutOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="w-48 bg-[#0A0D14]/98 backdrop-blur-xl border-white/10"
              >
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-cyan-500/10 text-white/80">
                  <NavLink to="/about/company" onClick={() => setIsAboutOpen(false)}>
                    Company
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-cyan-500/10 text-white/80">
                  <NavLink to="/about/technology" onClick={() => setIsAboutOpen(false)}>
                    Technology
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-cyan-500/10 text-white/80">
                  <NavLink to="/about/careers" onClick={() => setIsAboutOpen(false)}>
                    Careers
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-cyan-500/10 text-white/80">
                  <NavLink to="/about/community" onClick={() => setIsAboutOpen(false)}>
                    Community
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-cyan-500/10 text-white/80">
                  <NavLink to="/about/contact" onClick={() => setIsAboutOpen(false)}>
                    Contact Us
                  </NavLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-3">
              <Button
                asChild
                size="sm"
                variant="ghost"
                className="text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all"
              >
                <Link to="/dashboard">Console</Link>
              </Button>

              <Button
                asChild
                size="sm"
                className="relative text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-black hover:from-cyan-400 hover:to-blue-400 transition-all shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] border-0"
              >
                <Link to="/agent">
                  <span className="relative z-10">Ask NEPA</span>
                </Link>
              </Button>

              <Button
                asChild
                size="sm"
                className="text-sm font-semibold bg-white/10 text-white hover:bg-white/15 border border-white/20 hover:border-white/30 transition-all backdrop-blur-sm"
              >
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
