import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import AdminPageHeader from './components/AdminPageHeader'
import { createVendeur, fetchVendeurs, getUtilisateurLogin } from '../../services/api/utilisateurApi'

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

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
      {success && (
        <div className="mb-4 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800">
          {success}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-gray-100 p-5 mb-6 shadow-sm"
      >
        <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Plus size={16} className="text-brand" />
          Créer un vendeur
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Prénom</label>
            <input
              value={form.prenom}
              required
              onChange={e => setForm(f => ({ ...f, prenom: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-brand"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Nom</label>
            <input
              value={form.nom}
              required
              onChange={e => setForm(f => ({ ...f, nom: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-brand"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Nom d'utilisateur</label>
            <input
              value={form.login}
              required
              onChange={e => setForm(f => ({ ...f, login: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-brand"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-brand"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Téléphone</label>
            <input
              value={form.telephone}
              required
              onChange={e => setForm(f => ({ ...f, telephone: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-brand"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Mot de passe</label>
            <input
              type="password"
              value={form.password}
              required
              minLength={6}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-brand"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 block mb-1">Confirmer le mot de passe</label>
            <input
              type="password"
              value={form.confirm}
              required
              minLength={6}
              onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-brand"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-brand hover:bg-brand-hover disabled:opacity-60 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2"
        >
          <Plus size={16} />
          {submitting ? 'Création…' : 'Créer le vendeur'}
        </button>
      </form>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
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
