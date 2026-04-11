export function SensorSweep() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div 
        className="absolute w-full h-[2px] left-0 sensor-sweep"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.4) 50%, transparent)',
          filter: 'blur(1px)',
        }}
      />
    </div>
  )
}
