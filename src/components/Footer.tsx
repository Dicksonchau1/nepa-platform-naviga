interface FooterProps {
  onNavigate: (page: string) => void
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-border/20 bg-card/40 backdrop-blur-xl relative z-10">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
          <button
            onClick={() => onNavigate('privacy')}
            className="hover:text-primary transition-colors"
          >
            Privacy
          </button>
          <button
            onClick={() => onNavigate('terms')}
            className="hover:text-primary transition-colors"
          >
            Terms
          </button>
          <button
            onClick={() => onNavigate('security')}
            className="hover:text-primary transition-colors"
          >
            Security
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="hover:text-primary transition-colors"
          >
            Contact
          </button>
          <button
            onClick={() => onNavigate('status')}
            className="hover:text-primary transition-colors"
          >
            Status
          </button>
        </div>
        
        <div className="mt-6 text-center text-xs text-muted-foreground">
          © 2024 AuraSense NEPA. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
