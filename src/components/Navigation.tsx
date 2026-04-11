import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CaretDown } from '@phosphor-icons/react'

interface NavigationProps {
  onNavigate: (page: string) => void
  currentPage: string
}

export function Navigation({ onNavigate, currentPage }: NavigationProps) {
  const [isBusinessOpen, setIsBusinessOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="text-xl font-bold tracking-tight hover:text-primary transition-colors mono"
          >
            NEPA
          </button>

          <div className="flex items-center gap-8">
            <button
              onClick={() => onNavigate('platform')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                currentPage === 'platform' ? 'text-primary' : 'text-foreground'
              }`}
            >
              PLATFORM
            </button>

            <DropdownMenu open={isBusinessOpen} onOpenChange={setIsBusinessOpen}>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary">
                  BUSINESS
                  <CaretDown
                    size={14}
                    className={`transition-transform ${isBusinessOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-card border-border">
                <DropdownMenuLabel className="text-xs text-muted-foreground mono">
                  ── NEPA PLATFORM ──
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    onNavigate('voda')
                    setIsBusinessOpen(false)
                  }}
                  className="cursor-pointer"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold mono">VODA</span>
                    <span className="text-xs text-muted-foreground">
                      Video Operations Decision Agent
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    onNavigate('roda')
                    setIsBusinessOpen(false)
                  }}
                  className="cursor-pointer"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold mono">RODA</span>
                    <span className="text-xs text-muted-foreground">
                      Robotic Operations Decision Agent
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    onNavigate('eoda')
                    setIsBusinessOpen(false)
                  }}
                  className="cursor-pointer"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold mono">EODA</span>
                    <span className="text-xs text-muted-foreground">
                      Edge Operations Decision Agent
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    onNavigate('foda')
                    setIsBusinessOpen(false)
                  }}
                  className="cursor-pointer"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold mono">FODA</span>
                    <span className="text-xs text-muted-foreground">
                      Facade Operations Decision Agent
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    onNavigate('soda')
                    setIsBusinessOpen(false)
                  }}
                  className="cursor-pointer"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold mono">SODA</span>
                    <span className="text-xs text-muted-foreground">
                      Surveillance Operations Decision Agent
                    </span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={() => onNavigate('company')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                currentPage === 'company' ? 'text-primary' : 'text-foreground'
              }`}
            >
              COMPANY
            </button>

            <Button
              onClick={() => onNavigate('contact')}
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              CONTACT
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
