import { useState } from 'react'
import { Mail, Phone, MapPin, Loader2, CheckCircle2 } from 'lucide-react'
import logoImg from '../../../assets/MiaTrossè-logo1.png'
import { submitToFormspree } from '../../../config/formspree'

const iconProps = {
  width: 15,
  height: 15,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

function IconLinkedIn(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-12h4v2" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function IconGitHub(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

function IconWhatsApp(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  )
}

function IconFacebook(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

const SOCIAL_LINKS = [
  { Icon: IconLinkedIn, label: 'LinkedIn', href: 'https://www.linkedin.com/in/aristide-kpandja-253b89353' },
  { Icon: IconGitHub, label: 'GitHub', href: 'https://github.com/kpandjagbati/FRONT-END_miatross-' },
  { Icon: IconWhatsApp, label: 'WhatsApp', href: 'https://wa.me/22890107500' },
  { Icon: IconFacebook, label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100078379868805' },
]

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterLoading, setNewsletterLoading] = useState(false)
  const [newsletterSuccess, setNewsletterSuccess] = useState(false)
  const [newsletterError, setNewsletterError] = useState('')

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return

    setNewsletterLoading(true)
    setNewsletterError('')
    setNewsletterSuccess(false)

    try {
      await submitToFormspree({
        email: newsletterEmail.trim(),
        form_type: 'Newsletter',
        _subject: 'Newsletter MiaTrossè — Nouvelle inscription',
      })
      setNewsletterSuccess(true)
      setNewsletterEmail('')
      setTimeout(() => setNewsletterSuccess(false), 4000)
    } catch {
      setNewsletterError('Inscription impossible. Réessayez plus tard.')
    } finally {
      setNewsletterLoading(false)
    }
  }

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Bande newsletter */}
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-2 flex flex-col md:flex-row
                        items-center justify-between gap-2">
          <div>
            <p className="text-white font-bold text-base">Inscrivez-vous à notre newsletter</p>
            <p className="text-gray-400 text-xs mt-0.5">Soyez les premiers informés de nos offres et nouveautés</p>
          </div>
          <div className="w-full md:w-auto flex flex-col items-stretch md:items-end gap-1">
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex w-full md:w-auto flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                name="email"
                value={newsletterEmail}
                onChange={(e) => {
                  setNewsletterEmail(e.target.value)
                  if (newsletterError) setNewsletterError('')
                }}
                required
                placeholder="Votre email…"
                className="flex-1 md:w-60 px-3 py-1.5 rounded-lg text-sm text-gray-800
                           outline-none border border-gray-700 focus:border-brand focus:ring-2
                           focus:ring-brand/20 bg-white"
              />
              <button
                type="submit"
                disabled={newsletterLoading}
                className="bg-brand hover:bg-brand-hover disabled:opacity-60 text-white px-4 py-1.5
                           rounded-lg text-sm font-semibold transition-colors shrink-0
                           flex items-center justify-center gap-2 min-w-[6.5rem]"
              >
                {newsletterLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "S'inscrire"
                )}
              </button>
            </form>
            {(newsletterSuccess || newsletterError) && (
              <p className={`text-sm flex items-center gap-1.5 ${
                newsletterSuccess ? 'text-brand' : 'text-red-400'
              }`}>
                {newsletterSuccess && (
                  <>
                    <CheckCircle2 size={16} />
                    Inscription réussie !
                  </>
                )}
                {newsletterError && newsletterError}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Corps du footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-1 pb-6 grid grid-cols-2 md:grid-cols-4 gap-6">

        {/* Logo + description */}
        <div className="col-span-2 md:col-span-1">
          <img src={logoImg} alt="Shop MiaTrossè" className="h-12 sm:h-14 w-auto mb-3 object-contain" />
          <p className="text-sm text-gray-400 leading-relaxed">
            La marketplace de référence au Togo pour acheter et vendre des produits de qualité.
          </p>
          <div className="flex gap-2.5 mt-3">
            {SOCIAL_LINKS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-brand flex items-center
                           justify-center transition-colors"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* À propos */}
        <div>
          <p className="text-white font-semibold mb-2">À propos</p>
          <ul className="space-y-1.5 text-sm">
            {['Qui sommes-nous', 'Nos valeurs', 'Conditions générales', 'Politique de confidentialité'].map(l => (
              <li key={l}><a href="#" className="hover:text-brand transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>

        {/* Mon compte */}
        <div>
          <p className="text-white font-semibold mb-2">Mon compte</p>
          <ul className="space-y-1.5 text-sm">
            {['Mes commandes', 'Mes favoris', 'Mes achats', 'Paramètres'].map(l => (
              <li key={l}><a href="#" className="hover:text-brand transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-white font-semibold mb-2">Aide & Contact</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-brand shrink-0" />
              <a href="tel:+22890107500" className="hover:text-brand transition-colors">
                +228 90 10 75 00
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-brand shrink-0" />
              contact@miatrosse.tg
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={14} className="text-brand shrink-0 mt-0.5" />
              Lomé, Togo
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 text-center py-3 text-xs text-gray-500">
        © {new Date().getFullYear()} Shop MiaTrossè — Tous droits réservés. &nbsp;|&nbsp;
        Paiement 100% sécurisé &nbsp;|&nbsp; Satisfait ou remboursé 14j
      </div>
    </footer>
  )
}
