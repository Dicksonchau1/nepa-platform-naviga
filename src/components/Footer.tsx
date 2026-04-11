import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t border-border/20 bg-card/40 backdrop-blur-xl relative z-10">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Platform</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/landing" className="hover:text-primary transition-colors">
                Landing
              </Link>
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/playground" className="hover:text-primary transition-colors">
                Playground
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Products</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/products/voda" className="hover:text-primary transition-colors">
                VODA
              </Link>
              <Link to="/products/roda" className="hover:text-primary transition-colors">
                RODA
              </Link>
              <Link to="/products/eoda" className="hover:text-primary transition-colors">
                EODA
              </Link>
              <Link to="/products/foda" className="hover:text-primary transition-colors">
                FODA
              </Link>
              <Link to="/products/soda" className="hover:text-primary transition-colors">
                SODA
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Resources</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/resources/docs" className="hover:text-primary transition-colors">
                Docs
              </Link>
              <Link to="/resources/api" className="hover:text-primary transition-colors">
                API Reference
              </Link>
              <Link to="/resources/guides" className="hover:text-primary transition-colors">
                Guides
              </Link>
              <Link to="/resources/changelog" className="hover:text-primary transition-colors">
                Changelog
              </Link>
              <Link to="/resources/status" className="hover:text-primary transition-colors">
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
              <Link to="/about/contact" className="hover:text-primary transition-colors">
                Contact
              </Link>
              <Link to="/about/privacy" className="hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link to="/about/terms" className="hover:text-primary transition-colors">
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
