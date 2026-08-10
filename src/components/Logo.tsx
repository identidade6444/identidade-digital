import logoMark from '../assets/logo-mark.png'

type LogoProps = {
  variant?: 'dark' | 'light'
  className?: string
}

const Logo = ({ variant = 'dark', className = '' }: LogoProps) => {
  const textColor = variant === 'light' ? 'text-neutral-white' : 'text-neutral-dark'
  const subTextColor = variant === 'light' ? 'text-neutral-white/85' : 'text-neutral-dark/70'

  return (
    <span
      role="img"
      aria-label="Identidade Digital"
      className={`inline-flex items-center gap-2 ${className}`}
    >
      <img src={logoMark} alt="" className="h-full w-auto object-contain" />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-lg font-bold tracking-wide ${textColor}`}>
          IDENTIDADE
        </span>
        <span className={`font-body text-xs font-medium ${subTextColor}`}>Digital</span>
      </span>
    </span>
  )
}

export default Logo
