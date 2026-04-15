import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { CaretDown, List } from '@phosphor-icons/react'
import logoImage from '@/assets/images/Gemini_Generated_Image_8oxhp28oxhp28oxh.png'

const productLinks = [
  {
    title: 'SODA — Unmanned Store OS',
    description: 'Autonomous store operations and orchestration.',
    href: '/products/soda',
  },
  {
    title: 'RODA — Robotic Execution',
    description: 'Physical restocking and task execution.',
    href: '/products/roda',
  },
  {
    title: 'VODA / CODA — Video Intelligence',
    description: 'Video-to-evidence SaaS pipeline.',
    href: '/products/voda-coda',
  },
  {
    title: 'HRI — Interview Analytics',
    description: 'Human resource intelligence APIs.',
    href: '/products/hri',
  },
  {
    title: 'FODA — Inspection (Optional)',
    description: 'Drone and inspection intelligence.',
    href: '/products/foda',
  },
]

const docsLinks = [
  { title: 'Docs', href: '/docs' },
  { title: 'API Reference', href: '/docs/api' },
  { title: 'SDKs', href: '/docs/sdk' },
]

const aboutLinks = [
  { title: 'Company', href: '/about/company' },
  { title: 'Technology', href: '/about/technology' },
  { title: 'Security', href: '/about/security' },
]

export function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setOpenMenu(null)
  }, [location.pathname])

  const handleNavigate = (href: string) => {
    navigate(href)
    setOpenMenu(null)
    setMobileOpen(false)
  }

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname === path || location.pathname.startsWith(`${path}/`)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? 'border-white/10 bg-[#050508]/95 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,212,255,0.1)]'
          : 'border-white/5 bg-[#050508]/80 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-6 py-3.5">
        <div className="flex items-center justify-between gap-6">
          <button
            type="button"
            onClick={() => handleNavigate('/')}
            className="flex items-center gap-2.5 group"
          >
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
          </button>

          <div className="hidden lg:flex items-center gap-6">
            <button
              type="button"
              onClick={() => handleNavigate('/platform')}
              className={`text-sm font-medium transition-colors ${
                isActive('/platform') ? 'text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              Platform
            </button>

            <DropdownMenu open={openMenu === 'products'} onOpenChange={(open) => setOpenMenu(open ? 'products' : null)}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                    openMenu === 'products' || location.pathname.startsWith('/products')
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  Products
                  <CaretDown
                    size={14}
                    weight="bold"
                    className={`transition-transform ${openMenu === 'products' ? 'rotate-180' : ''}`}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="w-80 bg-[#0A0D14]/98 backdrop-blur-xl border-white/10"
              >
                {productLinks.map((item) => (
                  <DropdownMenuItem
                    key={item.href}
                    onClick={() => handleNavigate(item.href)}
                    className="cursor-pointer focus:bg-cyan-500/10"
                  >
                    <div className="flex flex-col gap-1 py-1.5">
                      <span className="font-semibold text-sm text-white">{item.title}</span>
                      <span className="text-xs text-white/50">{item.description}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              type="button"
              onClick={() => handleNavigate('/pricing')}
              className={`text-sm font-medium transition-colors ${
                isActive('/pricing') ? 'text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              Pricing
            </button>

            <DropdownMenu open={openMenu === 'docs'} onOpenChange={(open) => setOpenMenu(open ? 'docs' : null)}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                    openMenu === 'docs' || location.pathname.startsWith('/docs')
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  Docs
                  <CaretDown
                    size={14}
                    weight="bold"
                    className={`transition-transform ${openMenu === 'docs' ? 'rotate-180' : ''}`}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="w-56 bg-[#0A0D14]/98 backdrop-blur-xl border-white/10"
              >
                {docsLinks.map((item) => (
                  <DropdownMenuItem
                    key={item.href}
                    onClick={() => handleNavigate(item.href)}
                    className="cursor-pointer focus:bg-cyan-500/10 text-white/80"
                  >
                    {item.title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu open={openMenu === 'about'} onOpenChange={(open) => setOpenMenu(open ? 'about' : null)}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                    openMenu === 'about' || location.pathname.startsWith('/about')
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  About
                  <CaretDown
                    size={14}
                    weight="bold"
                    className={`transition-transform ${openMenu === 'about' ? 'rotate-180' : ''}`}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="w-56 bg-[#0A0D14]/98 backdrop-blur-xl border-white/10"
              >
                {aboutLinks.map((item) => (
                  <DropdownMenuItem
                    key={item.href}
                    onClick={() => handleNavigate(item.href)}
                    className="cursor-pointer focus:bg-cyan-500/10 text-white/80"
                  >
                    {item.title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              type="button"
              onClick={() => handleNavigate('/contact')}
              className={`text-sm font-medium transition-colors ${
                isActive('/contact') ? 'text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              Contact
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Button
              onClick={() => handleNavigate('/auth/sign-in')}
              size="sm"
              variant="ghost"
              className="text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all"
            >
              Sign in
            </Button>

            <Button
              onClick={() => handleNavigate('/contact')}
              size="sm"
              className="relative text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-black hover:from-cyan-400 hover:to-blue-400 transition-all shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] border-0"
            >
              Start pilot
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Button
              onClick={() => handleNavigate('/auth/sign-in')}
              size="sm"
              variant="ghost"
              className="text-sm font-medium text-white/70 hover:text-white hover:bg-white/5"
            >
              Sign in
            </Button>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Open navigation menu"
                  className="inline-flex items-center justify-center rounded-md border border-white/10 bg-white/5 p-2 text-white hover:bg-white/10"
                >
                  <List size={18} weight="bold" />
                </button>
              </SheetTrigger>
              <SheetContent className="bg-[#050508]/98 border-white/10 text-white">
                <div className="flex flex-col gap-6 pt-6">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-white/40">
                      Platform
                    </span>
                    <button
                      type="button"
                      onClick={() => handleNavigate('/platform')}
                      className="text-left text-base font-semibold text-white"
                    >
                      Platform overview
                    </button>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-white/40">
                      Products
                    </span>
                    {productLinks.map((item) => (
                      <button
                        key={item.href}
                        type="button"
                        onClick={() => handleNavigate(item.href)}
                        className="text-left text-sm text-white/80 hover:text-white"
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-white/40">
                      Docs
                    </span>
                    {docsLinks.map((item) => (
                      <button
                        key={item.href}
                        type="button"
                        onClick={() => handleNavigate(item.href)}
                        className="text-left text-sm text-white/80 hover:text-white"
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-white/40">
                      Company
                    </span>
                    {aboutLinks.map((item) => (
                      <button
                        key={item.href}
                        type="button"
                        onClick={() => handleNavigate(item.href)}
                        className="text-left text-sm text-white/80 hover:text-white"
                      >
                        {item.title}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => handleNavigate('/contact')}
                      className="text-left text-sm text-white/80 hover:text-white"
                    >
                      Contact
                    </button>
                  </div>

                  <div className="flex flex-col gap-3 pt-2">
                    <Button
                      onClick={() => handleNavigate('/pricing')}
                      variant="outline"
                      className="border-white/20 text-white"
                    >
                      View pricing
                    </Button>
                    <Button
                      onClick={() => handleNavigate('/contact')}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 text-black"
                    >
                      Start pilot
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
