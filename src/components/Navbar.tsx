import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
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
import { CaretDown, List, X } from '@phosphor-icons/react'
import logoImage from '@/assets/images/Gemini_Generated_Image_8oxhp28oxhp28oxh.png'

const SCROLL_THRESHOLD = 20

export function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const mobileMenuId = 'mobile-navigation'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    handleScroll()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path: string) => location.pathname === path

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
          ticking = false
        })
        ticking = true
      }
    }

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
          <Link
            to="/"
            onClick={() => {
              setOpenMenu(null)
              setMobileOpen(false)
            }}
            aria-label="Navigate to home page"
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
          </Link>

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

          <div className="hidden lg:flex items-center gap-8">
            <DropdownMenu
              open={openMenu === 'products'}
              onOpenChange={(open) => setOpenMenu(open ? 'products' : null)}
            >
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
                    className={`transition-transform ${
                      openMenu === 'products' ? 'rotate-180' : ''
                    }`}
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
            <DropdownMenu
              open={openMenu === 'resources'}
              onOpenChange={(open) => setOpenMenu(open ? 'resources' : null)}
            >
            <DropdownMenu open={openMenu === 'resources'} onOpenChange={(open) => setOpenMenu(open ? 'resources' : null)}>
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
                    className={`transition-transform ${
                      openMenu === 'resources' ? 'rotate-180' : ''
                    }`}
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

            <DropdownMenu
              open={openMenu === 'business'}
              onOpenChange={(open) => setOpenMenu(open ? 'business' : null)}
            >
            <DropdownMenu open={openMenu === 'business'} onOpenChange={(open) => setOpenMenu(open ? 'business' : null)}>
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
                    className={`transition-transform ${
                      openMenu === 'business' ? 'rotate-180' : ''
                    }`}
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
                  aria-expanded={mobileOpen}
                  aria-controls={mobileMenuId}
                  className="inline-flex items-center justify-center rounded-md border border-white/10 bg-white/5 p-2 text-white hover:bg-white/10"
                >
                  <List size={18} weight="bold" />
                </button>
              </SheetTrigger>
              <SheetContent id={mobileMenuId} className="bg-[#050508]/98 border-white/10 text-white">
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

            <DropdownMenu
              open={openMenu === 'about'}
              onOpenChange={(open) => setOpenMenu(open ? 'about' : null)}
            >
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
          <div className="lg:hidden flex items-center">
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/5 p-2 text-white/80 hover:text-white hover:border-cyan-500/40 transition-colors"
                  aria-label="Open navigation menu"
                >
                  <List size={20} weight="bold" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-full sm:max-w-none bg-[#060b14] border-r border-cyan-500/20 p-0"
              >
                <div className="flex h-full flex-col px-6 py-8">
                  <div className="flex items-center gap-3">
                    <img
                      src={logoImage}
                      alt="AuraSense"
                      className="h-7 w-7 object-contain rounded-sm [mix-blend-mode:lighten]"
                    />
                    <span className="text-sm font-semibold text-white">AuraSense</span>
                  </div>

                  <div className="mt-8 flex-1 overflow-y-auto space-y-8">
                    <div className="space-y-3">
                      <p className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-400/70">
                        Products
                      </p>
                      <div className="flex flex-col gap-2">
                        <Link to="/products/soda" onClick={() => setIsMobileOpen(false)} className="text-white/80 hover:text-white">
                          SODA
                        </Link>
                        <Link to="/products/roda" onClick={() => setIsMobileOpen(false)} className="text-white/80 hover:text-white">
                          RODA
                        </Link>
                        <Link to="/products/voda-coda" onClick={() => setIsMobileOpen(false)} className="text-white/80 hover:text-white">
                          VODA/CODA
                        </Link>
                        <Link to="/products/hri" onClick={() => setIsMobileOpen(false)} className="text-white/80 hover:text-white">
                          HRI
                        </Link>
                        <Link to="/products/foda" onClick={() => setIsMobileOpen(false)} className="text-white/80 hover:text-white">
                          FODA
                        </Link>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-400/70">
                        Explore
                      </p>
                      <div className="flex flex-col gap-2">
                        <Link to="/nepa" onClick={() => setIsMobileOpen(false)} className="text-white/80 hover:text-white">
                          NEPA Core
                        </Link>
                        <Link to="/pricing" onClick={() => setIsMobileOpen(false)} className="text-white/80 hover:text-white">
                          Pricing
                        </Link>
                        <Link to="/resources/docs" onClick={() => setIsMobileOpen(false)} className="text-white/80 hover:text-white">
                          Docs
                        </Link>
                        <Link to="/about/company" onClick={() => setIsMobileOpen(false)} className="text-white/80 hover:text-white">
                          About
                        </Link>
                        <Link to="/about/contact" onClick={() => setIsMobileOpen(false)} className="text-white/80 hover:text-white">
                          Contact
                        </Link>
                        <Link to="/business" onClick={() => setIsMobileOpen(false)} className="text-white/80 hover:text-white">
                          Business
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-3">
                    <Button
                      variant="ghost"
                      className="w-full justify-center text-white/70 hover:text-white hover:bg-white/10"
                      onClick={() => {
                        navigate('/auth/sign-in')
                        setIsMobileOpen(false)
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      className="w-full justify-center bg-cyan-500 text-black hover:bg-cyan-400"
                      onClick={() => {
                        navigate('/auth/sign-up')
                        setIsMobileOpen(false)
                      }}
                    >
                      Start Pilot
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
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
                  <MobileNavLink to="/agent" label="NEPA Engine" onClick={() => setMobileOpen(false)} />
                  <MobileNavLink to="/pricing" label="Pricing" onClick={() => setMobileOpen(false)} />

                  <div className="font-mono text-[10px] tracking-[0.3em] text-gray-600 uppercase mt-5 mb-3">Products</div>
                  <MobileNavLink to="/products/soda" label="SODA — Unmanned Store" onClick={() => setMobileOpen(false)} />
                  <MobileNavLink to="/products/roda" label="RODA — Robotic Execution" onClick={() => setMobileOpen(false)} />
                  <MobileNavLink to="/products/voda" label="VODA / CODA — Video Intelligence" onClick={() => setMobileOpen(false)} />
                  <MobileNavLink to="/products/eoda" label="EODA — Edge Agent" onClick={() => setMobileOpen(false)} />
                  <MobileNavLink to="/products/foda" label="FODA — Inspection" onClick={() => setMobileOpen(false)} />

                  <div className="font-mono text-[10px] tracking-[0.3em] text-gray-600 uppercase mt-5 mb-3">Resources</div>
                  <MobileNavLink to="/resources/docs" label="Documentation" onClick={() => setMobileOpen(false)} />
                  <MobileNavLink to="/resources/api" label="API Reference" onClick={() => setMobileOpen(false)} />
                  <MobileNavLink to="/about/company" label="About AuraSense" onClick={() => setMobileOpen(false)} />
                  <MobileNavLink to="/about/contact" label="Contact" onClick={() => setMobileOpen(false)} />
                </nav>

                <div className="px-6 py-4 border-t border-white/5 space-y-2">
                  <Link to="/signin" onClick={() => setMobileOpen(false)}
                    className="block w-full text-center py-2.5 px-4 rounded-lg border border-cyan-500/30 text-cyan-400 font-mono text-sm hover:bg-cyan-500/10 transition-all"
                  >
                    Sign in
                  </Link>
                  <Link to="/signup" onClick={() => setMobileOpen(false)}
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
