import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CaretDown, List, X } from '@phosphor-icons/react'

import logoImage from '@/assets/images/Gemini_Generated_Image_8oxhp28oxhp28oxh.png'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

/* ── dropdown data ───────────────────────────────────────── */

const platformItems = [
  { label: 'NEPA World Model', desc: 'Introducing Vodec Agent NEPA', href: '/platform', featured: true },
  { label: 'VODA', desc: 'AuraStudio (coming soon)', href: '/products/voda' },
  { label: 'SODA', desc: 'Store Operations', href: '/products/soda-roda' },
  { label: 'NEPA Runtime', desc: 'Neuromorphic Edge Agent', href: '/nepa' },
]

const businessItems = [
  { label: 'About Us', href: '/about/company' },
  { label: 'Careers', href: '/about/careers' },
  { label: 'Partnership', href: '/business/partnership' },
]

/* ── dropdown component ──────────────────────────────────── */

function DesktopDropdown({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const location = useLocation()

  // close on route change
  useEffect(() => setOpen(false), [location.pathname])

  const enter = () => { clearTimeout(timeout.current); setOpen(true) }
  const leave = () => { timeout.current = setTimeout(() => setOpen(false), 150) }

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        type="button"
        className={`flex items-center gap-1 text-sm font-medium transition-colors ${
          open ? 'text-white' : 'text-white/70 hover:text-white'
        }`}
      >
        {label}
        <CaretDown
          size={12}
          weight="bold"
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-50 pt-3 -translate-x-1/2">
          <div className="min-w-[260px] rounded-lg border border-white/10 bg-[#0a0d14]/95 p-2 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-xl">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

function DropdownLink({
  href,
  label,
  desc,
  featured,
  onClick,
}: {
  href: string
  label: string
  desc?: string
  featured?: boolean
  onClick?: () => void
}) {
  return (
    <Link
      to={href}
      onClick={onClick}
      className={`block rounded-md px-3 py-2.5 transition-colors hover:bg-white/5 ${
        featured ? 'mb-1 border-b border-white/5 pb-3' : ''
      }`}
    >
      <span className={`block text-sm font-medium ${featured ? 'text-cyan-400' : 'text-white/90'}`}>
        {label}
      </span>
      {desc && <span className="block text-xs text-white/40 mt-0.5">{desc}</span>}
    </Link>
  )
}

/* ── main Navbar ──────────────────────────────────────────── */

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileSection, setMobileSection] = useState<string | null>(null)
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
    setMobileSection(null)
  }

  const toggleMobileSection = (key: string) =>
    setMobileSection((prev) => (prev === key ? null : key))

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? 'border-white/10 bg-[#050508]/95 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,212,255,0.1)]'
          : 'border-white/5 bg-[#050508]/80 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between gap-6 px-6 py-3.5">
        {/* ── logo ─────────────── */}
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
          <img src={logoImage} alt="AuraSense" className="h-8 w-8 rounded-sm object-contain [mix-blend-mode:lighten]" />
          <span className="text-[15px] font-semibold text-white transition-colors hover:text-cyan-400">AuraSense</span>
        </Link>

        {/* ── desktop links ────── */}
        <div className="hidden items-center gap-6 lg:flex">
          {/* Platform dropdown */}
          <DesktopDropdown label="Modules">
            {platformItems.map((item) => (
              <DropdownLink key={item.href} {...item} />
            ))}
          </DesktopDropdown>

          {/* Business dropdown */}
          <DesktopDropdown label="Business">
            {businessItems.map((item) => (
              <DropdownLink key={item.href} href={item.href} label={item.label} />
            ))}
          </DesktopDropdown>

          {/* Direct links */}
          <Link to="/pricing" className="text-sm font-medium text-white/70 transition-colors hover:text-white">
            Pricing
          </Link>

          <Link to="/nepa" className="text-sm font-medium text-white/70 transition-colors hover:text-white">
            NEPA Agent
          </Link>
        </div>

        {/* ── desktop CTA ──────── */}
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
            asChild
            size="sm"
            className="border-0 bg-gradient-to-r from-cyan-500 to-blue-500 text-sm font-semibold text-black shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all hover:from-cyan-400 hover:to-blue-400 hover:shadow-[0_0_30px_rgba(0,212,255,0.5)]"
          >
            <a href="https://playground.aurasensehk.com" target="_blank" rel="noopener noreferrer">
              Playground
            </a>
          </Button>
        </div>

        {/* ── mobile ───────────── */}
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

                <div className="mt-8 flex-1 space-y-6 overflow-y-auto">
                  {/* Platform accordion */}
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => toggleMobileSection('platform')}
                      className="flex w-full items-center justify-between text-xs font-mono uppercase tracking-[0.3em] text-cyan-400/70"
                    >
                      Platform
                      <CaretDown
                        size={12}
                        weight="bold"
                        className={`transition-transform ${mobileSection === 'platform' ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {mobileSection === 'platform' && (
                      <div className="flex flex-col gap-1 pl-2">
                        {platformItems.map((item) => (
                          <button
                            key={item.href}
                            type="button"
                            onClick={() => navigateAndClose(item.href)}
                            className="text-left text-sm text-white/80 hover:text-white py-1"
                          >
                            <span className={item.featured ? 'text-cyan-400' : ''}>{item.label}</span>
                            {item.desc && <span className="block text-xs text-white/35">{item.desc}</span>}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Business accordion */}
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => toggleMobileSection('business')}
                      className="flex w-full items-center justify-between text-xs font-mono uppercase tracking-[0.3em] text-cyan-400/70"
                    >
                      Business
                      <CaretDown
                        size={12}
                        weight="bold"
                        className={`transition-transform ${mobileSection === 'business' ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {mobileSection === 'business' && (
                      <div className="flex flex-col gap-1 pl-2">
                        {businessItems.map((item) => (
                          <button
                            key={item.href}
                            type="button"
                            onClick={() => navigateAndClose(item.href)}
                            className="text-left text-sm text-white/80 hover:text-white py-1"
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Direct links */}
                  <div className="space-y-2 border-t border-white/5 pt-4">
                    <button type="button" onClick={() => navigateAndClose('/pricing')} className="block text-sm text-white/80 hover:text-white">
                      Pricing
                    </button>
                    <button type="button" onClick={() => navigateAndClose('/nepa')} className="block text-sm text-white/80 hover:text-white">
                      NEPA Agent
                    </button>
                  </div>

                  <div className="grid gap-3 border-t border-white/5 pt-4">
                    <Button variant="outline" className="border-white/20 text-white" onClick={() => navigateAndClose('/pricing')}>
                      View pricing
                    </Button>
                    <Button asChild className="bg-cyan-500 text-black hover:bg-cyan-400">
                      <a href="https://playground.aurasensehk.com" target="_blank" rel="noopener noreferrer">
                        Playground
                      </a>
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