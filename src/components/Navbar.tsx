import { useState } from 'react'
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
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] bg-[#050508]/95 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-8">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative h-8 w-8 flex items-center justify-center">
              <img
                src={logoImage}
                alt="AuraSense"
                className="h-8 w-8 object-contain mix-blend-lighten"
                style={{ filter: 'brightness(1.1) contrast(1.05)' }}
              />
            </div>
            <span className="text-[15px] font-medium text-white group-hover:text-white/80 transition-colors">
              AuraSense
            </span>
          </Link>

          <div className="flex items-center gap-8">
            <DropdownMenu open={isProductsOpen} onOpenChange={setIsProductsOpen}>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors">
                  Products
                  <CaretDown
                    size={16}
                    weight="bold"
                    className={`transition-transform ${
                      isProductsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="w-72 bg-[#0A0B0F]/98 backdrop-blur-xl border-white/[0.08]"
              >
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-white/5">
                  <NavLink to="/products/voda" onClick={() => setIsProductsOpen(false)}>
                    <div className="flex flex-col gap-1 py-1">
                      <span className="font-medium text-sm text-white">
                        VODA — Video Agent
                      </span>
                      <span className="text-xs text-white/50">
                        Real-time video operations & detection
                      </span>
                    </div>
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-white/5">
                  <NavLink to="/products/roda" onClick={() => setIsProductsOpen(false)}>
                    <div className="flex flex-col gap-1 py-1">
                      <span className="font-medium text-sm text-white">
                        RODA — Robotic Agent
                      </span>
                      <span className="text-xs text-white/50">
                        Autonomous navigation & mission control
                      </span>
                    </div>
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-white/5">
                  <NavLink to="/products/eoda" onClick={() => setIsProductsOpen(false)}>
                    <div className="flex flex-col gap-1 py-1">
                      <span className="font-medium text-sm text-white">
                        EODA — Edge Agent
                      </span>
                      <span className="text-xs text-white/50">
                        Hardware-agnostic edge inference
                      </span>
                    </div>
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-white/5">
                  <NavLink to="/products/foda" onClick={() => setIsProductsOpen(false)}>
                    <div className="flex flex-col gap-1 py-1">
                      <span className="font-medium text-sm text-white">
                        FODA — Facade Agent
                      </span>
                      <span className="text-xs text-white/50">
                        Aerial structural inspection
                      </span>
                    </div>
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-white/5">
                  <NavLink to="/products/soda" onClick={() => setIsProductsOpen(false)}>
                    <div className="flex flex-col gap-1 py-1">
                      <span className="font-medium text-sm text-white">
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
                <button className="flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors">
                  Resources
                  <CaretDown
                    size={16}
                    weight="bold"
                    className={`transition-transform ${
                      isResourcesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="w-48 bg-[#0A0B0F]/98 backdrop-blur-xl border-white/[0.08]"
              >
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-white/5">
                  <NavLink to="/resources/docs" onClick={() => setIsResourcesOpen(false)}>
                    Documentation
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-white/5">
                  <NavLink to="/resources/api" onClick={() => setIsResourcesOpen(false)}>
                    API Reference
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-white/5">
                  <NavLink
                    to="/resources/guides"
                    onClick={() => setIsResourcesOpen(false)}
                  >
                    Guides & Tutorials
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-white/5">
                  <NavLink
                    to="/resources/changelog"
                    onClick={() => setIsResourcesOpen(false)}
                  >
                    Changelog
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-white/5">
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
                <button className="flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors">
                  About
                  <CaretDown
                    size={16}
                    weight="bold"
                    className={`transition-transform ${
                      isAboutOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="w-48 bg-[#0A0B0F]/98 backdrop-blur-xl border-white/[0.08]"
              >
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-white/5">
                  <NavLink to="/about/company" onClick={() => setIsAboutOpen(false)}>
                    Company
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-white/5">
                  <NavLink to="/about/technology" onClick={() => setIsAboutOpen(false)}>
                    Technology
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-white/5">
                  <NavLink to="/about/careers" onClick={() => setIsAboutOpen(false)}>
                    Careers
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-white/5">
                  <NavLink to="/about/community" onClick={() => setIsAboutOpen(false)}>
                    Community
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-white/5">
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
                className="text-sm text-white/70 hover:text-white hover:bg-white/5"
              >
                <Link to="/dashboard">Console</Link>
              </Button>

              <Button
                asChild
                size="sm"
                className="bg-white text-black hover:bg-white/90 text-sm font-medium"
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
