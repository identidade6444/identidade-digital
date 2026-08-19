import { motion } from 'framer-motion'

const CLIENTES = [
  {
    name: 'Daniel Assunção Advogados',
    segment: 'Advocacia',
    image: '/clientes/daniel-assuncao-advogados.jpg',
  },
  {
    name: 'Taynara Carvalho',
    segment: 'Consultora exclusiva EBM',
    image: '/clientes/taynara-carvalho-ebm.jpg',
  },
  {
    name: 'Mercadão dos Óculos',
    segment: 'Rede de óticas',
    image: '/clientes/mercadao-dos-oculos.jpg',
  },
]

const Clients = () => {
  return (
    <section id="clientes" className="bg-neutral-dark/[0.02] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-3xl font-bold text-neutral-dark sm:text-4xl">
            Marcas que já confiam na Identidade Digital
          </h2>
          <p className="mt-4 font-body text-lg text-neutral-dark/75">
            Empresas de segmentos diferentes que escolheram unificar sua
            presença digital com a gente.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CLIENTES.map((cliente, index) => (
            <motion.div
              key={cliente.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: 'easeOut' }}
              className="overflow-hidden rounded-2xl bg-neutral-white shadow-md ring-1 ring-neutral-dark/5"
            >
              <img
                src={cliente.image}
                alt={`Anúncio de nova parceria com ${cliente.name}`}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="p-5">
                <p className="font-display text-base font-semibold text-neutral-dark">
                  {cliente.name}
                </p>
                <p className="font-body text-sm text-neutral-dark/60">{cliente.segment}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Clients
