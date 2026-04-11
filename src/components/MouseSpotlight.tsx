import { useMouseSpotlight } from '@/hooks/useMouseSpotlight'

export function MouseSpotlight() {
  const spotlightRef = useMouseSpotlight()

  return <div ref={spotlightRef} className="mouse-spotlight" />
}
