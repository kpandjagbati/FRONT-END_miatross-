import { useEffect, useState } from 'react'
import AdminPageHeader from './components/AdminPageHeader'
import { fetchCurrentUser, updateCurrentUser } from '../../services/api/utilisateurApi'

export default function AdminSettingsPage() {
  const [form, setForm] = useState({
    nom_utilisateur: '',
    prenom_utilisateur: '',
    mail_utilisateur: '',
    telephone_urilisateur: '',
    residence_utilisateur: '',
    Password_utilisateur: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchCurrentUser()
      .then(u => setForm({
        nom_utilisateur: u.nom_utilisateur || '',
        prenom_utilisateur: u.prenom_utilisateur || '',
        mail_utilisateur: u.mail_utilisateur || '',
        telephone_urilisateur: u.telephone_urilisateur || '',
        residence_utilisateur: u.residence_utilisateur || '',
        Password_utilisateur: '',
      }))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const payload = { ...form }
      if (!payload.Password_utilisateur) delete payload.Password_utilisateur
      await updateCurrentUser(payload)
      setSuccess('Paramètres enregistrés avec succès.')
      setForm(f => ({ ...f, Password_utilisateur: '' }))
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-gray-500 text-center py-12">Chargement…</p>

  return (
    <div>
      <AdminPageHeader title="Paramètres" description="Configuration de votre compte administrateur" />

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm max-w-xl space-y-4">
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-brand text-sm">{success}</p>}

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Prénom</label>
            <input value={form.prenom_utilisateur}
              onChange={e => setForm(f => ({ ...f, prenom_utilisateur: e.target.value }))}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-brand" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Nom</label>
            <input value={form.nom_utilisateur}
              onChange={e => setForm(f => ({ ...f, nom_utilisateur: e.target.value }))}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-brand" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
          <input type="email" value={form.mail_utilisateur}
            onChange={e => setForm(f => ({ ...f, mail_utilisateur: e.target.value }))}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-brand" />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Téléphone</label>
          <input value={form.telephone_urilisateur}
            onChange={e => setForm(f => ({ ...f, telephone_urilisateur: e.target.value }))}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-brand" />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Résidence</label>
          <input value={form.residence_utilisateur}
            onChange={e => setForm(f => ({ ...f, residence_utilisateur: e.target.value }))}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-brand" />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Nouveau mot de passe</label>
          <input type="password" value={form.Password_utilisateur}
            onChange={e => setForm(f => ({ ...f, Password_utilisateur: e.target.value }))}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-brand" />
        </div>

        <button type="submit" disabled={saving}
          className="bg-brand hover:bg-brand-hover disabled:opacity-60 text-white font-semibold px-6 py-3 rounded-xl">
          {saving ? 'Enregistrement…' : 'Enregistrer'}
        </button>
      </form>
    </div>
  )
}
