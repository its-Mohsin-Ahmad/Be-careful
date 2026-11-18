import { useEffect, useState } from 'react'

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<'loading' | 'exiting'>('loading')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100 }
        // Slow at 70%, then quick finish
        const inc = p < 70 ? Math.random() * 8 + 4 : Math.random() * 15 + 8
        return Math.min(p + inc, 100)
      })
    }, 120)
    // Start exit after 2.4s
    const exitTimer = setTimeout(() => setPhase('exiting'), 2400)
    const doneTimer = setTimeout(() => onComplete(), 3000)
    return () => { clearInterval(interval); clearTimeout(exitTimer); clearTimeout(doneTimer) }
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center
        bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900
        ${phase === 'exiting' ? 'splash-exit' : ''}`}
      aria-label="Loading BE CAREFUL healthcare platform"
      role="status"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-white/5"
            style={{
              width:  `${(i + 1) * 160}px`,
              height: `${(i + 1) * 160}px`,
              top:    '50%',
              left:   '50%',
              transform: 'translate(-50%, -50%)',
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative flex flex-col items-center gap-8 px-8">
        {/* Logo block */}
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          {/* Animated Medical Logo */}
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center animate-float">
            {/* Outer spinning ring */}
            <svg viewBox="0 0 120 120" className="w-full h-full absolute inset-0 pointer-events-none" aria-hidden="true">
              <circle cx="60" cy="60" r="54" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
              <circle cx="60" cy="60" r="54" stroke="rgba(45,212,191,0.6)" strokeWidth="2.5" fill="none"
                strokeDasharray="340" strokeDashoffset="240"
                style={{ animation: 'spin 4s linear infinite', transformOrigin: 'center' }} />
            </svg>

            {/* Animated Logo - 100% transparent background, floating */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center p-2">
              <img
                src="/logo-animated.webp"
                alt="BE CAREFUL animated logo"
                className="w-full h-full object-contain filter drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)] select-none pointer-events-none"
              />
              <span className="absolute top-1 right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 border border-white" />
              </span>
            </div>
          </div>

          {/* Brand name */}
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-none">
              BE CAREFUL
            </h1>
            <p className="mt-2 text-sm sm:text-base font-medium text-primary-200 tracking-widest uppercase">
              Your Health. Your Care. Your Information.
            </p>
          </div>
        </div>

        {/* ECG line */}
        <div className="w-64 sm:w-80 h-12 overflow-hidden" aria-hidden="true">
          <svg viewBox="0 0 320 48" className="w-full h-full" preserveAspectRatio="none">
            <path
              className="ecg-line"
              d="M0,24 L40,24 L50,24 L55,8 L60,40 L65,4 L70,44 L75,24 L90,24 L130,24 L140,24 L145,8 L150,40 L155,4 L160,44 L165,24 L180,24 L220,24 L230,24 L235,8 L240,40 L245,4 L250,44 L255,24 L270,24 L320,24"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Loading text + progress */}
        <div className="flex flex-col items-center gap-3 w-64 sm:w-80">
          <p className="text-sm font-medium text-primary-200 animate-pulse-slow">
            Preparing your healthcare experience…
          </p>
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-white/50 tabular-nums">{Math.round(progress)}%</p>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2 max-w-xs animate-fade-in">
          {['Doctors', 'Appointments', 'Records', 'Queue', 'Wellness'].map(f => (
            <span key={f} className="px-3 py-1 text-xs font-medium bg-white/10 border border-white/20 text-white/80 rounded-full">
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom disclaimer */}
      <p className="absolute bottom-6 text-center text-xs text-white/40 px-6 max-w-md">
        Educational healthcare information platform. Always consult a qualified healthcare professional for medical advice.
      </p>
    </div>
  )
}
