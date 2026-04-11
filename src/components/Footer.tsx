import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t border-border/20 bg-card/40 backdrop-blur-xl relative z-10">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
          <Link
            to="/about/privacy"
            className="hover:text-primary transition-colors"
          >
            Privacy
          </Link>
          <Link
            to="/about/terms"
            className="hover:text-primary transition-colors"
          >
            Terms
          </Link>
          <Link
            to="/about/security"
            className="hover:text-primary transition-colors"
          >
            Security
          </Link>
          <Link
            to="/about/contact"
            className="hover:text-primary transition-colors"
          >
            Contact
          </Link>
          <Link
            to="/resources/status"
            className="hover:text-primary transition-colors"
          >
            Status
          </Link>
        </div>
        
        <div className="mt-6 text-center text-xs text-muted-foreground">
          © 2024 AuraSense NEPA. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
