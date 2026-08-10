import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import Logo from './Logo'
import { NAV_LINKS, buildWhatsAppLink } from '../lib/constants'
import { useAnchorScroll } from '../hooks/useAnchorScroll'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const scrollToAnchor = useAnchorScroll()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const whatsappLink = buildWhatsAppLink(
    'Olá! Vim pelo site e quero saber mais sobre os serviços da Identidade Digital.',
  )

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-neutral-white transition-shadow ${
        isScrolled ? 'shadow-md' : 'shadow-none'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <a
          href="#top"
          onClick={(event) => scrollToAnchor(event, '#top')}
          aria-label="Identidade Digital, ir para o topo"
          className="shrink-0"
        >
          <Logo className="h-10 w-auto" variant="dark" />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => scrollToAnchor(event, link.href)}
              className="font-body text-sm font-medium text-neutral-dark transition-colors hover:text-primary-blue"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-accent-orange px-5 py-2.5 font-body text-sm font-semibold text-neutral-white transition-transform hover:scale-105 hover:bg-accent-orange/90 md:inline-block"
        >
          Fale com a gente
        </a>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-neutral-dark md:hidden"
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Navegação mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-neutral-dark/10 bg-neutral-white md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => {
                    scrollToAnchor(event, link.href)
                    setIsMenuOpen(false)
                  }}
                  className="rounded-md px-2 py-3 font-body text-base font-medium text-neutral-dark hover:bg-neutral-dark/5"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 rounded-full bg-accent-orange px-5 py-3 text-center font-body text-sm font-semibold text-neutral-white"
              >
                Fale com a gente
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
