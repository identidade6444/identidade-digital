import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi'
import { FaInstagram } from 'react-icons/fa'
import Logo from '../components/Logo'
import {
  NAV_LINKS,
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  buildWhatsAppLink,
} from '../lib/constants'
import { useAnchorScroll } from '../hooks/useAnchorScroll'

const Footer = () => {
  const year = new Date().getFullYear()
  const scrollToAnchor = useAnchorScroll()
  const whatsappLink = buildWhatsAppLink('Olá! Vim pelo site da Identidade Digital.')

  return (
    <footer
      className="relative overflow-hidden text-neutral-white"
      style={{ background: 'linear-gradient(135deg, #0138EB 0%, #0F172A 100%)' }}
    >
      <div className="relative mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <a
              href="#top"
              onClick={(event) => scrollToAnchor(event, '#top')}
              aria-label="Identidade Digital, ir para o topo"
            >
              <Logo variant="light" className="h-10 w-auto" />
            </a>
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-neutral-white/75">
              Marketing digital 360° para pequenas e médias empresas que
              querem crescer com consistência.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-neutral-white/90">
              Navegação
            </h3>
            <ul className="mt-4 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(event) => scrollToAnchor(event, link.href)}
                    className="font-body text-sm text-neutral-white/75 transition-colors hover:text-accent-yellow"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-neutral-white/90">
              Contato
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm text-neutral-white/75 transition-colors hover:text-accent-yellow"
                >
                  <HiOutlinePhone aria-hidden="true" />
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center gap-2 font-body text-sm text-neutral-white/75 transition-colors hover:text-accent-yellow"
                >
                  <HiOutlineMail aria-hidden="true" />
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm text-neutral-white/75 transition-colors hover:text-accent-yellow"
                >
                  <FaInstagram aria-hidden="true" />
                  {INSTAGRAM_HANDLE}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-white/15 pt-6">
          <p className="font-body text-xs text-neutral-white/60">
            © {year} Identidade Digital. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
