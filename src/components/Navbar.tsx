import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { List, X } from '@phosphor-icons/react'

import logoImage from '@/assets/images/Gemini_Generated_Image_8oxhp28oxhp28oxh.png'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const links = [
  { label: 'Platform', href: '/platform' },
  { label: 'Products', href: '/products' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Docs', href: '/docs' },
  { label: 'About', href: '/about/company' },
]

function NavLinkItem({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  const location = useLocation()
  const active = location.pathname === href || location.pathname.startsWith(`${href}/`)

  return (
    <Link
      to={href}
      onClick={onClick}
      className={`text-sm font-medium transition-colors ${active ? 'text-white' : 'text-white/70 hover:text-white'}`}
    >
      {label}
    </Link>
  )
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigateAndClose = (href: string) => {
    navigate(href)
    setMobileOpen(false)
  }

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? 'border-white/10 bg-[#050508]/95 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,212,255,0.1)]'
          : 'border-white/5 bg-[#050508]/80 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between gap-6 px-6 py-3.5">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
          <img src={logoImage} alt="AuraSense" className="h-8 w-8 rounded-sm object-contain [mix-blend-mode:lighten]" />
          <span className="text-[15px] font-semibold text-white transition-colors hover:text-cyan-400">AuraSense</span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <NavLinkItem key={link.href} href={link.href} label={link.label} />
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            onClick={() => navigateAndClose('/auth?mode=signin')}
            size="sm"
            variant="ghost"
            className="text-sm font-medium text-white/60 transition-all hover:bg-white/5 hover:text-white"
          >
            Sign in
          </Button>
          <Button
            onClick={() => navigateAndClose('/contact')}
            size="sm"
            className="border-0 bg-gradient-to-r from-cyan-500 to-blue-500 text-sm font-semibold text-black shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all hover:from-cyan-400 hover:to-blue-400 hover:shadow-[0_0_30px_rgba(0,212,255,0.5)]"
          >
            Start pilot
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button
            onClick={() => navigateAndClose('/auth?mode=signin')}
            size="sm"
            variant="ghost"
            className="text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white"
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
            <SheetContent side="left" className="w-full border-r border-cyan-500/20 bg-[#060b14] p-0 sm:max-w-none">
              <div className="flex h-full flex-col px-6 py-8">
                <div className="flex items-center justify-between">
                  <Link to="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
                    <img src={logoImage} alt="AuraSense" className="h-7 w-7 rounded-sm object-contain [mix-blend-mode:lighten]" />
                    <span className="text-sm font-semibold text-white">AuraSense</span>
                  </Link>
                  <button
                    type="button"
                    aria-label="Close navigation menu"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="mt-8 flex-1 space-y-8 overflow-y-auto">
                  <div className="space-y-3">
                    <p className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-400/70">Navigation</p>
                    <div className="flex flex-col gap-2">
                      {links.map((link) => (
                        <button
                          key={link.href}
                          type="button"
                          onClick={() => navigateAndClose(link.href)}
                          className="text-left text-sm text-white/80 hover:text-white"
                        >
                          {link.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-3 border-t border-white/5 pt-4">
                    <Button variant="outline" className="border-white/20 text-white" onClick={() => navigateAndClose('/pricing')}>
                      View pricing
                    </Button>
                    <Button className="bg-cyan-500 text-black hover:bg-cyan-400" onClick={() => navigateAndClose('/contact')}>
                      Start pilot
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}