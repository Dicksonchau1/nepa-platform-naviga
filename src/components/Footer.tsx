interface FooterProps {
  onNavigate: (page: string) => void
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-border/20 bg-card/40 backdrop-blur-xl relative z-10">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-4 gap-12">
          <div>
            <h3 className="text-lg font-bold mb-4 mono">NEPA</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Neuromorphic Edge Processing Architecture. Deterministic. Traceable. Accountable.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3 text-muted-foreground">PLATFORM</h4>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => onNavigate('voda')}
                className="text-sm text-foreground hover:text-primary transition-colors text-left"
              >
                VODA
              </button>
              <button
                onClick={() => onNavigate('roda')}
                className="text-sm text-foreground hover:text-primary transition-colors text-left"
              >
                RODA
              </button>
              <button
                onClick={() => onNavigate('eoda')}
                className="text-sm text-foreground hover:text-primary transition-colors text-left"
              >
                EODA
              </button>
              <button
                onClick={() => onNavigate('foda')}
                className="text-sm text-foreground hover:text-primary transition-colors text-left"
              >
                FODA
              </button>
              <button
                onClick={() => onNavigate('soda')}
                className="text-sm text-foreground hover:text-primary transition-colors text-left"
              >
                SODA
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3 text-muted-foreground">COMPANY</h4>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => onNavigate('company')}
                className="text-sm text-foreground hover:text-primary transition-colors text-left"
              >
                About
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="text-sm text-foreground hover:text-primary transition-colors text-left"
              >
                Contact
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3 text-muted-foreground">RESOURCES</h4>
            <div className="flex flex-col gap-2">
              <button className="text-sm text-foreground hover:text-primary transition-colors text-left">
                API Docs
              </button>
              <button className="text-sm text-foreground hover:text-primary transition-colors text-left">
                Technical Papers
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/20 flex items-center justify-between">
          <p className="text-sm text-muted-foreground mono">
            © 2024 NEPA. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Neuromorphic Edge Processing Architecture
          </p>
        </div>
      </div>
    </footer>
  )
}
