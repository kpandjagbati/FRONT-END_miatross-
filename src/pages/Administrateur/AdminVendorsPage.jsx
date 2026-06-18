import { useEffect, useState } from 'react'
import { Plus, Store, UserPlus } from 'lucide-react'
import AdminPageHeader from './components/AdminPageHeader'
import { createVendeur, fetchVendeurs, getUtilisateurLogin } from '../../services/api/utilisateurApi'
import {
  DashboardFormActions,
  DashboardFormAlert,
  DashboardFormCard,
  DashboardFormField,
  DashboardFormSection,
  DashboardSubmitButton,
  dashboardInputClass,
} from '../../components/dashboard/DashboardForm'

const EMPTY_FORM = {
  prenom: '',
  nom: '',
  login: '',
  email: '',
  telephone: '',
  password: '',
  confirm: '',
}

export default function AdminVendorsPage() {
  const [vendeurs, setVendeurs] = useState([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const list = await fetchVendeurs()
      setVendeurs(list)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (form.password !== form.confirm) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }
    if (form.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.')
      return
    }

    setSubmitting(true)
    try {
      const payload = {
        prenom: form.prenom.trim(),
        nom: form.nom.trim(),
        login: form.login.trim(),
        email: form.email.trim() || undefined,
        telephone: form.telephone.trim(),
        password: form.password,
      }
      const created = await createVendeur(payload)
      const login = getUtilisateurLogin(created) !== '—' ? getUtilisateurLogin(created) : payload.login
      const name = created.prenom_utilisateur && created.nom_utilisateur
        ? `${created.prenom_utilisateur} ${created.nom_utilisateur}`
        : `${payload.prenom} ${payload.nom}`
      setForm(EMPTY_FORM)
      setSuccess(
        created.message
          || `Vendeur « ${name} » créé avec succès. Connectez-vous avec le login « ${login} » et le mot de passe défini.`
      )
      await load()
    } catch (err) {
      setError(err.message || 'Impossible de créer le vendeur.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="Vendeurs"
        description="Créez un compte vendeur ou consultez la liste des vendeurs inscrits"
      />

      <div className="max-w-3xl mx-auto w-full mb-4">
        <DashboardFormCard
          icon={UserPlus}
          title="Créer un vendeur"
          description="Le vendeur pourra se connecter et publier des produits immédiatement"
          maxWidth="3xl"
          onSubmit={handleSubmit}
        >
          <DashboardFormAlert type="error">{error}</DashboardFormAlert>
          <DashboardFormAlert type="success">{success}</DashboardFormAlert>

          <DashboardFormSection title="Identité">
            <div className="grid sm:grid-cols-2 gap-3">
              <DashboardFormField label="Prénom" htmlFor="v-prenom" required>
                <input
                  id="v-prenom"
                  value={form.prenom}
                  required
                  onChange={e => setForm(f => ({ ...f, prenom: e.target.value }))}
                  className={dashboardInputClass}
                />
              </DashboardFormField>
              <DashboardFormField label="Nom" htmlFor="v-nom" required>
                <input
                  id="v-nom"
                  value={form.nom}
                  required
                  onChange={e => setForm(f => ({ ...f, nom: e.target.value }))}
                  className={dashboardInputClass}
                />
              </DashboardFormField>
            </div>
          </DashboardFormSection>

          <DashboardFormSection title="Connexion">
            <div className="grid sm:grid-cols-2 gap-3">
              <DashboardFormField label="Nom d'utilisateur" htmlFor="v-login" required>
                <input
                  id="v-login"
                  value={form.login}
                  required
                  onChange={e => setForm(f => ({ ...f, login: e.target.value }))}
                  className={dashboardInputClass}
                />
              </DashboardFormField>
              <DashboardFormField label="Email" htmlFor="v-email">
                <input
                  id="v-email"
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className={dashboardInputClass}
                />
              </DashboardFormField>
              <DashboardFormField label="Téléphone" htmlFor="v-tel" required className="sm:col-span-2">
                <input
                  id="v-tel"
                  value={form.telephone}
                  required
                  onChange={e => setForm(f => ({ ...f, telephone: e.target.value }))}
                  className={dashboardInputClass}
                />
              </DashboardFormField>
            </div>
          </DashboardFormSection>

          <DashboardFormSection title="Sécurité" description="Minimum 6 caractères">
            <div className="grid sm:grid-cols-2 gap-3">
              <DashboardFormField label="Mot de passe" htmlFor="v-password" required>
                <input
                  id="v-password"
                  type="password"
                  value={form.password}
                  required
                  minLength={6}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  className={dashboardInputClass}
                  autoComplete="new-password"
                />
              </DashboardFormField>
              <DashboardFormField label="Confirmer le mot de passe" htmlFor="v-confirm" required>
                <input
                  id="v-confirm"
                  type="password"
                  value={form.confirm}
                  required
                  minLength={6}
                  onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
                  className={dashboardInputClass}
                  autoComplete="new-password"
                />
              </DashboardFormField>
            </div>
          </DashboardFormSection>

          <DashboardFormActions>
            <DashboardSubmitButton loading={submitting} loadingLabel="Création…">
              <span className="inline-flex items-center gap-2">
                <Plus size={16} />
                Créer le vendeur
              </span>
            </DashboardSubmitButton>
          </DashboardFormActions>
        </DashboardFormCard>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-brand/5 via-white to-white">
          <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Store size={16} className="text-brand" />
            Vendeurs inscrits
          </h2>
        </div>
        {loading ? (
          <p className="p-8 text-center text-gray-500">Chargement…</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="dashboard-table w-full text-sm text-gray-800">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-500">
                  <th className="px-5 py-3 font-medium">Boutique / Nom</th>
                  <th className="px-5 py-3 font-medium">Login</th>
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Téléphone</th>
                  <th className="px-5 py-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {vendeurs.map(v => (
                  <tr key={v.id_utilisateur} className="border-t border-gray-50">
                    <td className="px-5 py-3 font-medium">{v.prenom_utilisateur} {v.nom_utilisateur}</td>
                    <td className="px-5 py-3">{getUtilisateurLogin(v)}</td>
                    <td className="px-5 py-3">{v.mail_utilisateur || '—'}</td>
                    <td className="px-5 py-3">{v.telephone_urilisateur}</td>
                    <td className="px-5 py-3">
                      <span className="bg-brand/10 text-brand px-2 py-1 rounded-full text-xs font-semibold">Actif</span>
                    </td>
                  </tr>
                ))}
                {vendeurs.length === 0 && (
                  <tr><td colSpan={5} className="px-5 py-8 text-center text-gray-500">Aucun vendeur.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
