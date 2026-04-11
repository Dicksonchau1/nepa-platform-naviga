import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { HomePage } from '@/components/pages/HomePage'
import { VODAPage } from '@/components/pages/VODAPage'
import { RODAPage } from '@/components/pages/RODAPage'
import { EODAPage } from '@/components/pages/EODAPage'
import { FODAPage } from '@/components/pages/FODAPage'
import { SODAPage } from '@/components/pages/SODAPage'
import { Toaster } from '@/components/ui/sonner'

function App() {
  const [currentPage, setCurrentPage] = useKV<string>('nepa-current-page', 'home')

  const handleNavigate = (page: string) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'voda':
        return <VODAPage onNavigate={handleNavigate} />
      case 'roda':
        return <RODAPage onNavigate={handleNavigate} />
      case 'eoda':
        return <EODAPage onNavigate={handleNavigate} />
      case 'foda':
        return <FODAPage onNavigate={handleNavigate} />
      case 'soda':
        return <SODAPage onNavigate={handleNavigate} />
      case 'platform':
        return <PlatformPlaceholder onNavigate={handleNavigate} />
      case 'company':
        return <CompanyPlaceholder onNavigate={handleNavigate} />
      case 'contact':
        return <ContactPlaceholder onNavigate={handleNavigate} />
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

function PlatformPlaceholder({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Platform Overview</h1>
        <p className="text-muted-foreground">Coming soon</p>
      </div>
    </div>
  )
}

function CompanyPlaceholder({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">About NEPA</h1>
        <p className="text-muted-foreground">Coming soon</p>
      </div>
    </div>
  )
}

function ContactPlaceholder({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-muted-foreground">Coming soon</p>
      </div>
    </div>
  )
}

export default App
