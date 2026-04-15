import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import {
  Terminal,
  House,
  VideoCamera,
  Robot,
  Drone,
  FileText,
  Gauge,
  Envelope,
  SignOut
} from '@phosphor-icons/react'
import { toast } from 'sonner'

const navItems = [
  { path: '/dashboard', label: 'Overview', icon: House, exact: true },
  { path: '/dashboard/facility-watch', label: 'FacilityWatch', icon: VideoCamera },
  { path: '/dashboard/robotic-ops', label: 'RoboticOps', icon: Robot },
  { path: '/dashboard/drone-inspect', label: 'DroneInspect', icon: Drone },
  { path: '/dashboard/voda', label: 'VODA', icon: Gauge },
  { path: '/dashboard/tasks', label: 'Missions', icon: FileText },
  { path: '/dashboard/contacts', label: 'Contacts', icon: Envelope },
]

export function DashboardLayout() {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    await signOut()
    toast.success('Signed out successfully')
    navigate('/auth/sign-in')
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="page-bg">
        <div className="glow-orb glow-orb-1"></div>
        <div className="glow-orb glow-orb-2"></div>
        <div className="glow-orb glow-orb-3"></div>
      </div>

      <div className="flex relative z-10">
        <aside className="w-64 min-h-screen border-r border-border/30 bg-card/20 backdrop-blur-xl">
          <div className="p-6 border-b border-border/30">
            <Link to="/" className="flex items-center gap-3 group">
              <Terminal size={32} weight="duotone" className="text-primary" />
              <div>
                <h1 className="text-lg font-bold">AuraSense NEPA</h1>
                <p className="text-xs text-muted-foreground mono uppercase tracking-wider">Console</p>
              </div>
            </Link>
          </div>

          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = item.exact
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path)
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon size={20} weight={isActive ? 'fill' : 'regular'} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/30">
            <div className="mb-3 px-2">
              <p className="text-xs font-medium">{user?.email}</p>
              <p className="text-xs text-muted-foreground capitalize">{profile?.role ?? 'viewer'}</p>
              {profile?.portal_access && profile.portal_access.length > 0 && (
                <p className="text-xs text-muted-foreground mono mt-1">
                  {profile.portal_access.join(', ')}
                </p>
              )}
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2"
            >
              <SignOut size={16} />
              Sign Out
            </Button>
          </div>
        </aside>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
