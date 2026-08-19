export const WHATSAPP_NUMBER = '5564993380223'
export const CONTACT_EMAIL = 'identidadedigital64@gmail.com'
export const CONTACT_PHONE_DISPLAY = '(64) 99338-0223'
export const INSTAGRAM_HANDLE = '@Ident_idadedigital'
export const INSTAGRAM_URL = 'https://instagram.com/Ident_idadedigital'

export function buildWhatsAppLink(message: string) {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`
}

export const NAV_LINKS = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Clientes', href: '#clientes' },
  { label: 'Contato', href: '#contato' },
]
