import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { clsx } from 'clsx'

interface LogoProps {
  collapsed?: boolean
  className?: string
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
}

const sizeClasses = {
  sm: {
    iconBox: 'w-8 h-8 rounded-lg',
    iconImg: 'w-7 h-7',
    dot: 'w-2 h-2',
    title: 'text-sm',
    subtitle: 'text-[9px]',
  },
  md: {
    iconBox: 'w-10 h-10 rounded-xl',
    iconImg: 'w-9 h-9',
    dot: 'w-2.5 h-2.5',
    title: 'text-base',
    subtitle: 'text-[10px]',
  },
  lg: {
    iconBox: 'w-14 h-14 rounded-2xl',
    iconImg: 'w-12 h-12',
    dot: 'w-3 h-3',
    title: 'text-xl',
    subtitle: 'text-xs',
  },
  xl: {
    iconBox: 'w-20 h-20 rounded-3xl',
    iconImg: 'w-16 h-16',
    dot: 'w-3.5 h-3.5',
    title: 'text-2xl',
    subtitle: 'text-sm',
  },
}

export default function Logo({
  collapsed = false,
  className,
  onClick,
  size = 'md',
  animated = true,
}: LogoProps) {
  const navigate = useNavigate()
  const [imgError, setImgError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    onClick?.()
    navigate('/')
  }

  const s = sizeClasses[size] || sizeClasses.md

  // Choose between animated webp and static png fallback
  const logoSrc = animated && !imgError ? '/logo-animated.webp' : '/logo.png'

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={clsx(
        'group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-xl p-1 -m-1 transition-transform duration-200 active:scale-95 text-left',
        className
      )}
      aria-label="BE CAREFUL – Go to home"
    >
      {/* Animated Logo Container (transparent, no white box) */}
      <div
        className={clsx(
          'relative flex-shrink-0 flex items-center justify-center overflow-visible transition-all duration-300',
          s.iconBox,
          isHovered ? 'scale-105' : ''
        )}
      >
        {/* Subtle ambient cyan/teal glow behind emblem on hover */}
        <div
          className="absolute inset-0 rounded-full bg-teal-400/25 blur-md pointer-events-none transition-opacity duration-300"
          style={{ opacity: isHovered ? 0.8 : 0 }}
          aria-hidden="true"
        />

        {/* The Animated Logo Image - 100% transparent background */}
        <img
          src={logoSrc}
          alt="BE CAREFUL Logo"
          onError={() => setImgError(true)}
          className={clsx(
            'relative z-10 w-full h-full object-contain select-none pointer-events-none transition-transform duration-300',
            isHovered ? 'scale-110 drop-shadow-md' : 'drop-shadow-sm'
          )}
          loading="eager"
        />

        {/* Pulse Live Dot */}
        <span
          className={clsx(
            'absolute -top-0.5 -right-0.5 flex z-20',
            s.dot
          )}
          aria-hidden="true"
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-full w-full bg-emerald-500 border border-white" />
        </span>
      </div>

      {/* Brand Text */}
      {!collapsed && (
        <div className="flex flex-col leading-tight min-w-0">
          <span
            className={clsx(
              'font-extrabold tracking-tight text-primary-700 group-hover:text-primary-800 transition-colors duration-200 leading-none',
              s.title
            )}
          >
            BE CAREFUL
          </span>
          <span
            className={clsx(
              'font-medium text-slate-400 tracking-wider uppercase mt-0.5 truncate group-hover:text-primary-600/70 transition-colors duration-200',
              s.subtitle
            )}
          >
            Healthcare Platform
          </span>
        </div>
      )}
    </button>
  )
}
