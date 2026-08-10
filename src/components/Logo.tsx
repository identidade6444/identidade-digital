type LogoProps = {
  variant?: 'dark' | 'light'
  className?: string
}

const Logo = ({ variant = 'dark', className = '' }: LogoProps) => {
  const textColor = variant === 'light' ? '#FFFFFF' : '#0F172A'

  return (
    <svg
      viewBox="0 0 320 64"
      role="img"
      aria-label="Identidade Digital"
      className={className}
    >
      <defs>
        <linearGradient id="logo-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00FCFF" />
          <stop offset="100%" stopColor="#0138EB" />
        </linearGradient>
      </defs>

      <rect width="64" height="64" rx="16" fill="url(#logo-bg-grad)" />
      <path
        d="M32 47c-1-.6-13-8-13-18.4C19 22.4 23.4 18 28.8 18c1.4 0 2.9.4 4.2 1.2.7.4 1.1 1 1.1 1.8v3.4c0 .5-.6.8-1 .5-1.2-1-2.7-1.6-4.3-1.6-3.4 0-6.2 2.8-6.2 6.3 0 6.4 7.6 12.1 9.4 13.4.3.2.5.4.5.9v3.1z"
        fill="#FF6200"
      />
      <path
        d="M32 47c1-.6 13-8 13-18.4C45 22.4 40.6 18 35.2 18c-1.4 0-2.9.4-4.2 1.2-.7.4-1.1 1-1.1 1.8v3.4c0 .5.6.8 1 .5 1.2-1 2.7-1.6 4.3-1.6 3.4 0 6.2 2.8 6.2 6.3 0 6.4-7.6 12.1-9.4 13.4-.3.2-.5.4-.5.9v3.1z"
        fill="#FFED00"
      />

      <text
        x="78"
        y="30"
        fontFamily="'Playfair Display', serif"
        fontWeight="700"
        fontSize="22"
        fill={textColor}
        letterSpacing="0.5"
      >
        IDENTIDADE
      </text>
      <text
        x="78"
        y="50"
        fontFamily="Inter, sans-serif"
        fontWeight="500"
        fontSize="16"
        fill={textColor}
      >
        Digital
      </text>
    </svg>
  )
}

export default Logo
