import { motion } from 'framer-motion'
import { CheckCircle2, Target, Users, Award, TrendingUp, Heart } from 'lucide-react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import logoImg from '../../assets/MiaTrossè-logo1.png'
import jamesAdandji from '../../assets/equipe/james-adandji.png'
import gnofamGlordia from '../../assets/equipe/gnofam-glordia.png'
import sawandougouZiad from '../../assets/equipe/sawandougou-ziad.png'
import aristideKpandja from '../../assets/equipe/aristide-kpandja.png'

// ── Valeurs de l'entreprise ────────────────────────────────────────────────
const VALUES = [
  {
    icon: Target,
    title: 'Missionnaire',
    desc: 'Offrir les meilleurs produits au meilleur prix à tous les Togolais.',
  },
  {
    icon: Heart,
    title: 'Intégrité',
    desc: 'Transparence et honnêteté dans chaque transaction et relation client.',
  },
  {
    icon: Users,
    title: 'Communauté',
    desc: 'Créer une communauté de marchands et acheteurs de confiance.',
  },
  {
    icon: TrendingUp,
    title: 'Innovation',
    desc: 'Innover constamment pour améliorer l\'expérience d\'achat en ligne.',
  },
  {
    icon: Award,
    title: 'Qualité',
    desc: 'Sélectionner rigoureusement les produits et les vendeurs.',
  },
  {
    icon: CheckCircle2,
    title: 'Fiabilité',
    desc: '100% satisfait ou remboursé — garantie inconditionnelle.',
  },
]

const MILESTONES = [
  { year: '2020', title: 'Fondation', desc: 'Lancement de MiaTrossè au Togo' },
  { year: '2021', title: 'Croissance', desc: '50 000+ utilisateurs actifs' },
  { year: '2022', title: 'Expansion', desc: 'Lancement marketplace vendeurs' },
  { year: '2023', title: 'Succès', desc: '500 000+ transactions/an' },
  { year: '2024', title: 'Leadership', desc: 'Marketplace #1 du Togo' },
  { year: '2025', title: 'Vision', desc: 'Expansion en Afrique de l\'Ouest' },
]

const STATS = [
  { number: '500k+', label: 'Clients satisfaits' },
  { number: '5k+', label: 'Vendeurs actifs' },
  { number: '50k+', label: 'Produits en stock' },
  { number: '98%', label: 'Satisfaction client' },
]

const TEAM_MEMBERS = [
  {
    name: 'James ADANDJI',
    role: 'Fondateur & CEO',
    img: jamesAdandji,
    imgAlt: 'James ADANDJI — Fondateur & CEO',
  },
  {
    name: 'GNOFAM Glordia',
    role: 'Responsable Commerciale',
    img: gnofamGlordia,
    imgAlt: 'GNOFAM Glordia — Responsable Commerciale',
  },
  {
    name: 'SAWANDOUGOU Ziad',
    role: 'Responsable Support Client',
    img: sawandougouZiad,
    imgAlt: 'SAWANDOUGOU Ziad — Responsable Support Client',
  },
  {
    name: 'Aristide KPANDJA',
    role: 'Lead Developer',
    img: aristideKpandja,
    imgAlt: 'Aristide KPANDJA — Lead Developer',
  },
]

// ── Composant animé stat ──────────────────────────────────────────────────
function StatCard({ number, label, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-bold text-[#00b649] mb-2">
        {number}
      </div>
      <p className="text-gray-600">{label}</p>
    </motion.div>
  )
}

export default function AProposPage() {
  return (
    <div className="min-h-dvh bg-gray-50">
      <Navbar />

      <main>
        {/* Hero section */}
        <section className="bg-gradient-to-b from-[#00b649]/10 to-transparent py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                À propos de <span className="text-[#00b649]">MiaTrossè</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Votre marketplace de confiance au Togo — où acheter et vendre devient
                simple, sûr et agréable.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Notre histoire */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="order-2 md:order-1"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Notre Histoire</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Fondée en 2020 par Boulous Chic, MiaTrossè est née d'une vision simple :
                rendre le e-commerce accessible et fiable pour tous les Togolais.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                En seulement quelques années, nous avons construit une communauté de plus
                de 500 000 utilisateurs et plus de 5 000 vendeurs de confiance.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Aujourd'hui, MiaTrossè est devenue la marketplace de référence au Togo,
                avec une expansion imminente en Afrique de l'Ouest.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="order-1 md:order-2 flex items-center justify-center"
            >
              <img
                src={logoImg}
                alt="Shop MiaTrossè - Shop Smart. Live Better."
                className="h-64 w-auto max-w-full object-contain sm:h-80 md:h-96 lg:h-[28rem]"
              />
            </motion.div>
          </div>
        </section>

        {/* Statistiques */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-4xl font-bold text-center text-gray-900 mb-16"
            >
              Nos chiffres parlent
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((stat, i) => (
                <StatCard key={i} {...stat} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Valeurs */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center text-gray-900 mb-16"
          >
            Nos Valeurs Fondamentales
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {VALUES.map((value, i) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-8 border border-gray-200
                             hover:border-[#00b649] hover:shadow-lg transition-all"
                >
                  <Icon size={40} className="text-[#00b649] mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-gray-900 text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-4xl font-bold text-center mb-16"
            >
              Notre Parcours
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {MILESTONES.map((milestone, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gray-800 rounded-2xl p-8 border border-gray-700
                             hover:border-[#00b649] transition-colors"
                >
                  <div className="text-[#00b649] text-3xl font-bold mb-3">
                    {milestone.year}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                  <p className="text-gray-400">{milestone.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Équipe */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center text-gray-900 mb-16"
          >
            Notre Équipe
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="text-center"
              >
                <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100
                                ring-2 ring-[#00b649]/25 shadow-md">
                  <img
                    src={member.img}
                    alt={member.imgAlt}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-[#00b649] text-sm font-medium mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA section */}
        <section className="bg-gradient-to-r from-[#00b649] to-green-600 text-white py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Rejoignez notre communauté
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Que vous soyez acheteur ou vendeur, faites partie du mouvement qui
              transforme le commerce au Togo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#00b649] px-8 py-3 rounded-xl
                               font-bold hover:bg-gray-100 transition-colors">
                Commencer à acheter
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-xl
                               font-bold hover:bg-white/10 transition-colors">
                Devenir vendeur
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
