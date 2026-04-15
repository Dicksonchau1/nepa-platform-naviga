import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CaretDown, List, X } from '@phosphor-icons/react'
import logoImage from '@/assets/images/Gemini_Generated_Image_8oxhp28oxhp28oxh.png'

export function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
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
                className="h-8 w-8 object-contain transition-all group-hover:drop-shadow-[0_0_12px_rgba(0,212,255,0.6)] rounded-sm [mix-blend-mode:lighten]"
              />
            </div>
            <span className="text-[15px] font-semibold text-white group-hover:text-cyan-400 transition-colors">
              AuraSense
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <DropdownMenu open={openMenu === 'products'} onOpenChange={(open) => setOpenMenu(open ? 'products' : null)}>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-sm font-medium text-white/70 hover:text-white transition-colors">
                  Products
                  <CaretDown
                    size={14}
                    weight="bold"
                    className={`transition-transform ${
                      openMenu === 'products' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="w-72 bg-[#0A0D14]/98 backdrop-blur-xl border-white/10"
              >
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-cyan-500/10">
                  <NavLink to="/products/voda" onClick={() => setOpenMenu(null)}>
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
                  <NavLink to="/products/roda" onClick={() => setOpenMenu(null)}>
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
                  <NavLink to="/products/eoda" onClick={() => setOpenMenu(null)}>
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
                  <NavLink to="/products/foda" onClick={() => setOpenMenu(null)}>
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
                  <NavLink to="/products/soda" onClick={() => setOpenMenu(null)}>
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

            <DropdownMenu open={openMenu === 'resources'} onOpenChange={(open) => setOpenMenu(open ? 'resources' : null)}>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-sm font-medium text-white/70 hover:text-white transition-colors">
                  Resources
                  <CaretDown
                    size={14}
                    weight="bold"
                    className={`transition-transform ${
                      openMenu === 'resources' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="w-48 bg-[#0A0D14]/98 backdrop-blur-xl border-white/10"
              >
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-cyan-500/10 text-white/80">
                  <NavLink to="/resources/docs" onClick={() => setOpenMenu(null)}>
                    Documentation
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-cyan-500/10 text-white/80">
                  <NavLink to="/resources/api" onClick={() => setOpenMenu(null)}>
                    API Reference
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-cyan-500/10 text-white/80">
                  <NavLink
                    to="/resources/guides"
                    onClick={() => setOpenMenu(null)}
                  >
                    Guides & Tutorials
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-cyan-500/10 text-white/80">
                  <NavLink
                    to="/resources/changelog"
                    onClick={() => setOpenMenu(null)}
                  >
                    Changelog
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-cyan-500/10 text-white/80">
                  <NavLink
                    to="/resources/status"
                    onClick={() => setOpenMenu(null)}
                  >
                    Status
                  </NavLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu open={openMenu === 'business'} onOpenChange={(open) => setOpenMenu(open ? 'business' : null)}>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-sm font-medium text-white/70 hover:text-white transition-colors">
                  Business
                  <CaretDown
                    size={14}
                    weight="bold"
                    className={`transition-transform ${
                      openMenu === 'business' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="w-48 bg-[#0A0D14]/98 backdrop-blur-xl border-white/10"
              >
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-cyan-500/10 text-white/80">
                  <NavLink to="/business/partnership" onClick={() => setOpenMenu(null)}>
                    Partnership
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-cyan-500/10 text-white/80">
                  <NavLink to="/business/case-studies" onClick={() => setOpenMenu(null)}>
                    Case Studies
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-cyan-500/10 text-white/80">
                  <NavLink to="/business/plans" onClick={() => setOpenMenu(null)}>
                    Plans
                  </NavLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu open={openMenu === 'about'} onOpenChange={(open) => setOpenMenu(open ? 'about' : null)}>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-sm font-medium text-white/70 hover:text-white transition-colors">
                  About
                  <CaretDown
                    size={14}
                    weight="bold"
                    className={`transition-transform ${
                      openMenu === 'about' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="w-48 bg-[#0A0D14]/98 backdrop-blur-xl border-white/10"
              >
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-cyan-500/10 text-white/80">
                  <NavLink to="/about/company" onClick={() => setOpenMenu(null)}>
                    Company
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-cyan-500/10 text-white/80">
                  <NavLink to="/about/contact" onClick={() => setOpenMenu(null)}>
                    Contact
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-cyan-500/10 text-white/80">
                  <NavLink to="/about/privacy" onClick={() => setOpenMenu(null)}>
                    Privacy
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-cyan-500/10 text-white/80">
                  <NavLink to="/about/terms" onClick={() => setOpenMenu(null)}>
                    Terms
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-cyan-500/10 text-white/80">
                  <NavLink to="/about/security" onClick={() => setOpenMenu(null)}>
                    Security
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
                  <span className="relative z-10">NEPA Agent</span>
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
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                className="lg:hidden p-2 text-gray-400 hover:text-cyan-400 transition-colors"
                aria-label="Open navigation menu"
              >
                <List size={22} weight="bold" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 bg-[#060b14] border-l border-cyan-500/20 p-0"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                  <span className="font-mono text-cyan-400 text-sm tracking-[0.3em] uppercase">AuraSense</span>
                  <button onClick={() => setMobileOpen(false)} aria-label="Close navigation menu">
                    <X size={18} className="text-gray-400" />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto px-6 py-4 space-y-1">
                  <div className="font-mono text-[10px] tracking-[0.3em] text-gray-600 uppercase mb-3">Platform</div>
                  <MobileNavLink to="/" label="Home" onClick={() => setMobileOpen(false)} />
                  <MobileNavLink to="/nepa" label="NEPA Engine" onClick={() => setMobileOpen(false)} />
                  <MobileNavLink to="/pricing" label="Pricing" onClick={() => setMobileOpen(false)} />

                  <div className="font-mono text-[10px] tracking-[0.3em] text-gray-600 uppercase mt-5 mb-3">Products</div>
                  <MobileNavLink to="/products/soda" label="SODA — Unmanned Store" onClick={() => setMobileOpen(false)} />
                  <MobileNavLink to="/products/roda" label="RODA — Robotic Execution" onClick={() => setMobileOpen(false)} />
                  <MobileNavLink to="/products/voda-coda" label="VODA / CODA — Video Intelligence" onClick={() => setMobileOpen(false)} />
                  <MobileNavLink to="/products/hri" label="HRI — HR Intelligence" onClick={() => setMobileOpen(false)} />
                  <MobileNavLink to="/products/foda" label="FODA — Inspection" onClick={() => setMobileOpen(false)} />

                  <div className="font-mono text-[10px] tracking-[0.3em] text-gray-600 uppercase mt-5 mb-3">Resources</div>
                  <MobileNavLink to="/docs" label="Documentation" onClick={() => setMobileOpen(false)} />
                  <MobileNavLink to="/docs/api" label="API Reference" onClick={() => setMobileOpen(false)} />
                  <MobileNavLink to="/about" label="About AuraSense" onClick={() => setMobileOpen(false)} />
                  <MobileNavLink to="/contact" label="Contact" onClick={() => setMobileOpen(false)} />
                </nav>

                <div className="px-6 py-4 border-t border-white/5 space-y-2">
                  <Link to="/auth?mode=signin" onClick={() => setMobileOpen(false)}
                    className="block w-full text-center py-2.5 px-4 rounded-lg border border-cyan-500/30 text-cyan-400 font-mono text-sm hover:bg-cyan-500/10 transition-all"
                  >
                    Sign in
                  </Link>
                  <Link to="/auth?mode=signup" onClick={() => setMobileOpen(false)}
                    className="block w-full text-center py-2.5 px-4 rounded-lg bg-cyan-500 text-black font-mono text-sm font-semibold hover:bg-cyan-400 transition-all"
                  >
                    Start Pilot
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

function MobileNavLink({
  to,
  label,
  onClick,
}: {
  to: string
  label: string
  onClick: () => void
}) {
  const { pathname } = useLocation()
  const isActive = pathname === to || pathname.startsWith(to + '/')
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block px-3 py-2 rounded-lg font-mono text-sm transition-all ${
        isActive
          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
          : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`}
    >
      {label}
    </Link>
  )
}
