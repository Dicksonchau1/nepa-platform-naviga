import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t border-border/20 bg-card/40 backdrop-blur-xl relative z-10">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Platform</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/platform" className="hover:text-primary transition-colors">
                Platform
              </Link>
              <Link to="/nepa" className="hover:text-primary transition-colors">
                NEPA
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Products</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to='/products/soda-roda' className="hover:text-primary transition-colors">
                SODA 
                VODA
                NEPA Agent 
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Resources</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/docs" className="hover:text-primary transition-colors">
                Docs
              </Link>
              <Link to="/docs/api" className="hover:text-primary transition-colors">
                API Reference
              </Link>
              <Link to="/docs/sdk" className="hover:text-primary transition-colors">
                SDKs
              </Link>
              <Link to="/docs/changelog" className="hover:text-primary transition-colors">
                Changelog
              </Link>
              <Link to="/docs/status" className="hover:text-primary transition-colors">
                Status
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Company</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/about/company" className="hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/contact" className="hover:text-primary transition-colors">
                Contact
              </Link>
              <Link to="/legal/privacy" className="hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link to="/legal/terms" className="hover:text-primary transition-colors">
                Terms
              </Link>
              <Link to="/about/security" className="hover:text-primary transition-colors">
                Security
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border/20 pt-6 text-center text-xs text-muted-foreground">
          © 2026 AuraSense Limited · Kowloon, Hong Kong
        </div>
      </div>
    </footer>
  )
}
