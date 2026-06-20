import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle2, ChevronDown, Loader2, AlertCircle } from 'lucide-react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { submitToFormspree } from '../../config/formspree'
// ── Données contact ────────────────────────────────────────────────────────
const CONTACT_INFO = [
  {
    icon: Phone,
    title: 'Téléphone',
    value: '+228 90 10 75 00',
    desc: 'Disponible du lundi au vendredi, 8h-18h',
    link: 'tel:+22890107500',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'contact@miatrosse.tg',
    desc: 'Réponse en moins de 24h',
    link: 'mailto:contact@miatrosse.tg',
  },
  {
    icon: MapPin,
    title: 'Adresse',
    value: 'Lomé, Togo',
    desc: 'Zone commerciale centrale',
    link: '#',
  },
]

const SUBJECT_LABELS = {
  general: 'Question générale',
  delivery: 'Livraison',
  product: 'Produit défectueux',
  vendor: 'Devenir vendeur',
  other: 'Autre',
}

const FAQ_ITEMS = [
  {
    q: 'Comment puis-je créer un compte ?',
    a: 'Cliquez sur "Connexion" et sélectionnez "Créer un compte". Remplissez vos informations et confirmez votre email.',
  },
  {
    q: 'Quels sont les délais de livraison ?',
    a: 'Délai habituel de livraison : 2 à 5 jours ouvrables selon votre localisation au Togo.',
  },
  {
    q: 'Puis-je retourner un produit ?',
    a: 'Oui, vous avez 14 jours pour retourner un produit non utilisé après réception.',
  },
  {
    q: 'Comment devenir vendeur sur MiaTrossè ?',
    a: 'Allez dans "Devenir vendeur", complétez votre profil et attendez notre validation (1-2 jours).',
  },
  {
    q: 'Acceptez-vous les paiements mobiles ?',
    a: 'Oui, nous acceptons les paiements via Moov Money, Tmoney et les cartes bancaires.',
  },
  {
    q: 'Comment contacter le support ?',
    a: 'Vous pouvez nous joindre par téléphone, email ou via le formulaire ci-dessous.',
  },
]

// ── Composant FAQ ────────────────────────────────────────────────────────
function FAQItem({ item, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="border border-gray-200 rounded-xl overflow-hidden hover:border-brand
                 transition-colors"
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 bg-white hover:bg-gray-50 flex items-center
                   justify-between transition-colors"
      >
        <span className="text-left font-semibold text-gray-900">{item.q}</span>
        <ChevronDown size={20} className={`text-brand transition-transform duration-300 shrink-0
                         ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="px-6 py-4 bg-gray-50 border-t border-gray-200"
        >
          <p className="text-gray-600">{item.a}</p>
        </motion.div>
      )}
    </motion.div>
  )
}

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

export default function ContactPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [openFaq, setOpenFaq] = useState(null)
  const sent = searchParams.get('sent') === '1'

  useEffect(() => {
    if (!sent) return
    const timer = setTimeout(() => setSearchParams({}, { replace: true }), 6000)
    return () => clearTimeout(timer)
  }, [sent, setSearchParams])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await submitToFormspree({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'Non renseigné',
        subject: SUBJECT_LABELS[formData.subject] || formData.subject,
        message: formData.message,
        _subject: `Contact MiaTrossè — ${SUBJECT_LABELS[formData.subject] || formData.subject}`,
      })
      window.location.replace('/contact?sent=1')
    } catch {
      setError('Impossible d\'envoyer votre message. Veuillez réessayer ou nous appeler directement.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-dvh bg-gray-50">
      <Navbar />

      <main>
        {/* Hero section */}
        <section className="bg-gradient-to-b from-brand/10 to-transparent py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Nous contacter
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Une question ? Besoin d'aide ? Notre équipe est là pour vous !
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact info cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {CONTACT_INFO.map((info, i) => {
              const Icon = info.icon
              return (
                <motion.a
                  key={i}
                  href={info.link}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-8 border border-gray-200
                             hover:border-brand hover:shadow-lg transition-all text-center"
                >
                  <Icon size={40} className="text-brand mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{info.title}</h3>
                  <p className="text-lg font-semibold text-gray-900 mb-2">{info.value}</p>
                  <p className="text-sm text-gray-600">{info.desc}</p>
                </motion.a>
              )
            })}
          </div>

          {/* Formulaire de contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Envoyez-nous un message
            </h2>

            {sent && (
              <div className="mb-8 bg-brand/10 border border-brand/20 rounded-xl p-6
                              flex items-center gap-3">
                <CheckCircle2 size={24} className="text-brand shrink-0" />
                <div>
                  <p className="font-bold text-brand">Message envoyé !</p>
                  <p className="text-sm text-brand/80">
                    Nous vous répondrons dans les 24h.
                  </p>
                </div>
              </div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8 bg-red-50 border border-red-200 rounded-xl p-6
                           flex items-start gap-3"
              >
                <AlertCircle size={24} className="text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-red-900">Erreur d'envoi</p>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Nom */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Votre nom"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl
                               outline-none focus:border-brand focus:ring-2
                               focus:ring-brand/20 transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="votre@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl
                               outline-none focus:border-brand focus:ring-2
                               focus:ring-brand/20 transition-all"
                  />
                </div>
              </div>

              {/* Téléphone */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+228 90 10 75 00"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl
                             outline-none focus:border-brand focus:ring-2
                             focus:ring-brand/20 transition-all"
                />
              </div>

              {/* Sujet */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Sujet
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl
                             outline-none focus:border-brand focus:ring-2
                             focus:ring-brand/20 transition-all cursor-pointer
                             bg-white text-gray-900"
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="general">Question générale</option>
                  <option value="delivery">Livraison</option>
                  <option value="product">Produit défectueux</option>
                  <option value="vendor">Devenir vendeur</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Décrivez votre message en détail…"
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl
                             outline-none focus:border-brand focus:ring-2
                             focus:ring-brand/20 transition-all resize-none"
                />
              </div>

              {/* Bouton */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand hover:bg-brand-hover text-white
                           font-bold py-3 px-6 rounded-xl transition-colors
                           flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Envoyer le message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </section>

        {/* FAQ section */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Questions fréquentes
              </h2>
              <p className="text-gray-600 text-lg">
                Trouvez réponse à vos questions les plus communes
              </p>
            </motion.div>

            <div className="space-y-4">
              {FAQ_ITEMS.map((item, i) => (
                <FAQItem
                  key={i}
                  item={item}
                  index={i}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
