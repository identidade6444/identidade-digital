import { useState, type FormEvent } from 'react'
import { buildWhatsAppLink } from '../lib/constants'

type FormState = {
  name: string
  contact: string
  service: string
  message: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const INITIAL_STATE: FormState = {
  name: '',
  contact: '',
  service: '',
  message: '',
}

const ContactForm = () => {
  const [form, setForm] = useState<FormState>(INITIAL_STATE)
  const [errors, setErrors] = useState<FormErrors>({})

  const handleChange = (field: keyof FormState) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {}

    if (!form.name.trim()) {
      nextErrors.name = 'Conte seu nome para a gente te chamar certo.'
    }

    if (!form.contact.trim()) {
      nextErrors.contact = 'Informe um WhatsApp ou e-mail para retorno.'
    }

    if (!form.message.trim()) {
      nextErrors.message = 'Conte rapidamente o que você precisa.'
    }

    return nextErrors
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const messageLines = [
      `Olá! Meu nome é ${form.name}.`,
      form.service ? `Tenho interesse em: ${form.service}.` : null,
      `Contato para retorno: ${form.contact}.`,
      `Mensagem: ${form.message}`,
    ].filter(Boolean)

    const whatsappLink = buildWhatsAppLink(messageLines.join('\n'))
    window.open(whatsappLink, '_blank', 'noopener,noreferrer')
    setForm(INITIAL_STATE)
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full max-w-md rounded-2xl bg-neutral-white p-6 shadow-xl sm:p-8"
    >
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="name" className="font-body text-sm font-medium text-neutral-dark">
            Nome
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={handleChange('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className="mt-1 w-full rounded-lg border border-neutral-dark/15 px-4 py-2.5 font-body text-neutral-dark outline-none focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/30"
          />
          {errors.name && (
            <p id="name-error" className="mt-1 font-body text-xs text-accent-orange">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact" className="font-body text-sm font-medium text-neutral-dark">
            WhatsApp ou e-mail
          </label>
          <input
            id="contact"
            type="text"
            value={form.contact}
            onChange={handleChange('contact')}
            aria-invalid={Boolean(errors.contact)}
            aria-describedby={errors.contact ? 'contact-error' : undefined}
            className="mt-1 w-full rounded-lg border border-neutral-dark/15 px-4 py-2.5 font-body text-neutral-dark outline-none focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/30"
          />
          {errors.contact && (
            <p id="contact-error" className="mt-1 font-body text-xs text-accent-orange">
              {errors.contact}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="service" className="font-body text-sm font-medium text-neutral-dark">
            Serviço de interesse (opcional)
          </label>
          <input
            id="service"
            type="text"
            value={form.service}
            onChange={handleChange('service')}
            placeholder="Ex: Tráfego pago, Social Media..."
            className="mt-1 w-full rounded-lg border border-neutral-dark/15 px-4 py-2.5 font-body text-neutral-dark outline-none placeholder:text-neutral-dark/40 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/30"
          />
        </div>

        <div>
          <label htmlFor="message" className="font-body text-sm font-medium text-neutral-dark">
            Mensagem
          </label>
          <textarea
            id="message"
            rows={3}
            value={form.message}
            onChange={handleChange('message')}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className="mt-1 w-full resize-none rounded-lg border border-neutral-dark/15 px-4 py-2.5 font-body text-neutral-dark outline-none focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/30"
          />
          {errors.message && (
            <p id="message-error" className="mt-1 font-body text-xs text-accent-orange">
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="mt-2 inline-flex items-center justify-center rounded-full bg-accent-orange px-6 py-3 font-body text-sm font-semibold text-neutral-white transition-transform hover:scale-105 hover:bg-accent-orange/90"
        >
          Enviar pelo WhatsApp
        </button>
      </div>
    </form>
  )
}

export default ContactForm
