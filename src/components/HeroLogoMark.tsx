type HeroLogoMarkProps = {
  className?: string
}

const HeroLogoMark = ({ className = '' }: HeroLogoMarkProps) => (
  <svg
    viewBox="0 0 200 240"
    role="img"
    aria-label="Identidade Digital"
    className={className}
  >
    <g transform="translate(40,0) scale(1.6)">
      <path
        d="M60 96c-2-1.2-26-16-26-36.8C34 44.8 42.8 36 53.6 36c2.8 0 5.8.8 8.4 2.4 1.4.8 2.2 2 2.2 3.6v6.8c0 1-1.2 1.6-2 1-2.4-2-5.4-3.2-8.6-3.2-6.8 0-12.4 5.6-12.4 12.6 0 12.8 15.2 24.2 18.8 26.8.6.4 1 .8 1 1.8v6.2z"
        fill="#FF6200"
      />
      <path
        d="M60 96c2-1.2 26-16 26-36.8C86 44.8 77.2 36 66.4 36c-2.8 0-5.8.8-8.4 2.4-1.4.8-2.2 2-2.2 3.6v6.8c0 1 1.2 1.6 2 1 2.4-2 5.4-3.2 8.6-3.2 6.8 0 12.4 5.6 12.4 12.6 0 12.8-15.2 24.2-18.8 26.8-.6.4-1 .8-1 1.8v6.2z"
        fill="#FFED00"
      />
    </g>
    <text
      x="100"
      y="184"
      textAnchor="middle"
      fontFamily="'Playfair Display', serif"
      fontWeight="700"
      fontSize="30"
      fill="#FFFFFF"
      letterSpacing="0.5"
    >
      IDENTIDADE
    </text>
    <text
      x="100"
      y="212"
      textAnchor="middle"
      fontFamily="Inter, sans-serif"
      fontWeight="500"
      fontSize="18"
      fill="#FFFFFF"
      fillOpacity="0.85"
    >
      Digital
    </text>
  </svg>
)

export default HeroLogoMark
