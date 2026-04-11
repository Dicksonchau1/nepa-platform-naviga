import { useKV } from '@github/spark/hooks'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { HomePage } from '@/components/pages/HomePage'
import { SignInPage } from '@/components/pages/SignInPage'
import { SignUpPage } from '@/components/pages/SignUpPage'
import { ForgotPasswordPage } from '@/components/pages/ForgotPasswordPage'
import { ResetPasswordPage } from '@/components/pages/ResetPasswordPage'
import { Toaster } from '@/components/ui/sonner'
import { PlaceholderPage } from '@/components/pages/PlaceholderPage'

function App() {
  const [currentPage, setCurrentPage] = useKV<string>('aura-current-page', 'home')

  const handleNavigate = (page: string) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'products':
        return <PlaceholderPage title="Products" subtitle="NEPA VODEC Agent, Edge Runtime, and Cloud Console" onNavigate={handleNavigate} />
      case 'solutions-retail':
        return <PlaceholderPage title="Unmanned Retail" subtitle="NEPA for unmanned shops and micro-retail" onNavigate={handleNavigate} />
      case 'solutions-inspection':
        return <PlaceholderPage title="Autonomous Inspection" subtitle="For drones and ground robots" onNavigate={handleNavigate} />
      case 'solutions-robotics':
        return <PlaceholderPage title="Service & Delivery Robotics" subtitle="Shared perception layer for autonomous systems" onNavigate={handleNavigate} />
      case 'technology':
        return <PlaceholderPage title="Technology" subtitle="Neuromorphic edge processing, LLM-agnostic interfaces" onNavigate={handleNavigate} />
      case 'resources':
        return <PlaceholderPage title="Resources" subtitle="Documentation, playground, changelog" onNavigate={handleNavigate} />
      case 'community':
        return <PlaceholderPage title="Community" subtitle="Forum, early adopter program, partners" onNavigate={handleNavigate} />
      case 'about':
        return <PlaceholderPage title="About Us" subtitle="Mission, story, leadership, values" onNavigate={handleNavigate} />
      case 'careers':
        return <PlaceholderPage title="Careers" subtitle="Join our team building perception infrastructure" onNavigate={handleNavigate} />
      case 'signin':
        return <SignInPage onNavigate={handleNavigate} />
      case 'signup':
        return <SignUpPage onNavigate={handleNavigate} />
      case 'forgot-password':
        return <ForgotPasswordPage onNavigate={handleNavigate} />
      case 'reset-password':
        return <ResetPasswordPage onNavigate={handleNavigate} />
      case 'contact':
        return <PlaceholderPage title="Contact" subtitle="Get in touch with our team" onNavigate={handleNavigate} />
      case 'privacy':
        return <PlaceholderPage title="Privacy Policy" subtitle="" onNavigate={handleNavigate} />
      case 'terms':
        return <PlaceholderPage title="Terms of Service" subtitle="" onNavigate={handleNavigate} />
      case 'security':
        return <PlaceholderPage title="Security" subtitle="Data handling and governance" onNavigate={handleNavigate} />
      case 'status':
        return <PlaceholderPage title="System Status" subtitle="" onNavigate={handleNavigate} />
      default:
        return <HomePage onNavigate={handleNavigate} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation onNavigate={handleNavigate} currentPage={currentPage || 'home'} />
      <main className="pt-16">{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
      <Toaster />
    </div>
  )
}

export default App
