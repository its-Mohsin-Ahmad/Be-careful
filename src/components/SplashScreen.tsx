import { useEffect, useState } from 'react'

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<'loading' | 'exiting'>('loading')

  useEffect(() => {
    // Show splash animation then smoothly transition to app
    const exitTimer = setTimeout(() => setPhase('exiting'), 2400)
    const doneTimer = setTimeout(() => onComplete(), 3000)
    return () => {
      clearTimeout(exitTimer)
      clearTimeout(doneTimer)
    }
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center
        bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900
        ${phase === 'exiting' ? 'splash-exit' : ''}`}
      aria-label="BE CAREFUL"
      role="status"
    >
      {/* Center content: ONLY the animated logo and BE CAREFUL */}
      <div className="flex flex-col items-center gap-6 animate-fade-in px-4">
        {/* Animated Logo */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
          <img
            src="/logo-animated.webp"
            alt="BE CAREFUL Logo"
            className="w-full h-full object-contain filter drop-shadow-[0_12px_32px_rgba(0,0,0,0.35)] select-none pointer-events-none"
          />
        </div>

        {/* Brand Name */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-wider text-center uppercase select-none">
          BE CAREFUL
        </h1>
      </div>
    </div>
  )
}
