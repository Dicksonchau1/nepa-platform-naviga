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
import logoImage from '@/assets/images/AuraSense_Company_logo.jpeg'

export function Navbar() {
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/20 bg-background/70 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between gap-8">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logoImage}
              alt="AuraSense"
              className="h-8 w-8 md:h-9 md:w-9 object-contain"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-base md:text-lg font-semibold tracking-[0.08em] uppercase group-hover:text-primary transition-colors">
                AuraSense
              </span>
              <span className="text-[11px] md:text-xs font-medium tracking-[0.22em] text-muted-foreground/80">
                NEPA PLATFORM
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            <DropdownMenu open={isProductsOpen} onOpenChange={setIsProductsOpen}>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-xs md:text-sm font-medium tracking-[0.14em] uppercase text-muted-foreground hover:text-foreground transition-colors">
                  Products
                  <CaretDown
                    size={14}
                    className={`transition-transform ${
                      isProductsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="w-72 bg-card/95 backdrop-blur-xl border-border/30"
              >
                <DropdownMenuItem asChild className="cursor-pointer">
                  <NavLink to="/products/voda" onClick={() => setIsProductsOpen(false)}>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-sm">
                        VODA — Video Agent
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        Real-time video operations & detection
                      </span>
                    </div>
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <NavLink to="/products/roda" onClick={() => setIsProductsOpen(false)}>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-sm">
                        RODA — Robotic Agent
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        Autonomous navigation & mission control
                      </span>
                    </div>
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <NavLink to="/products/eoda" onClick={() => setIsProductsOpen(false)}>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-sm">
                        EODA — Edge Agent
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        Hardware-agnostic edge inference
                      </span>
                    </div>
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <NavLink to="/products/foda" onClick={() => setIsProductsOpen(false)}>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-sm">
                        FODA — Facade Agent
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        Aerial structural inspection
                      </span>
                    </div>
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <NavLink to="/products/soda" onClick={() => setIsProductsOpen(false)}>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-sm">
                        SODA — Surveillance Agent
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        Multi-camera facility intelligence
                      </span>
                    </div>
                  </NavLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu open={isResourcesOpen} onOpenChange={setIsResourcesOpen}>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-xs md:text-sm font-medium tracking-[0.14em] uppercase text-muted-foreground hover:text-foreground transition-colors">
                  Resources
                  <CaretDown
                    size={14}
                    className={`transition-transform ${
                      isResourcesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="w-48 bg-card/95 backdrop-blur-xl border-border/30"
              >
                <DropdownMenuItem asChild className="cursor-pointer">
                  <NavLink to="/resources/docs" onClick={() => setIsResourcesOpen(false)}>
                    Documentation
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <NavLink to="/resources/api" onClick={() => setIsResourcesOpen(false)}>
                    API Reference
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <NavLink
                    to="/resources/guides"
                    onClick={() => setIsResourcesOpen(false)}
                  >
                    Guides & Tutorials
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <NavLink
                    to="/resources/changelog"
                    onClick={() => setIsResourcesOpen(false)}
                  >
                    Changelog
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
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
                <button className="flex items-center gap-1 text-xs md:text-sm font-medium tracking-[0.14em] uppercase text-muted-foreground hover:text-foreground transition-colors">
                  About
                  <CaretDown
                    size={14}
                    className={`transition-transform ${
                      isAboutOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="w-48 bg-card/95 backdrop-blur-xl border-border/30"
              >
                <DropdownMenuItem asChild className="cursor-pointer">
                  <NavLink to="/about/company" onClick={() => setIsAboutOpen(false)}>
                    Company
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <NavLink to="/about/technology" onClick={() => setIsAboutOpen(false)}>
                    Technology
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <NavLink to="/about/careers" onClick={() => setIsAboutOpen(false)}>
                    Careers
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <NavLink to="/about/community" onClick={() => setIsAboutOpen(false)}>
                    Community
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <NavLink to="/about/contact" onClick={() => setIsAboutOpen(false)}>
                    Contact Us
                  </NavLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-3">
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-xs md:text-sm font-medium tracking-[0.16em] uppercase text-muted-foreground hover:text-foreground"
              >
                <Link to="/signin">Sign in</Link>
              </Button>

              <Button
                asChild
                size="sm"
                variant="outline"
                className="text-xs md:text-sm font-medium tracking-[0.16em] uppercase border-border/40 text-foreground hover:bg-accent/40"
              >
                <Link to="/dashboard">Console</Link>
              </Button>

              <Button
                asChild
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 border border-primary/40 text-[11px] md:text-xs font-semibold tracking-[0.18em] uppercase px-5"
              >
                <Link to="/signup">Get started</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
