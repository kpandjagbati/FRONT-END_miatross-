import { useEffect, useState } from 'react'
import { Settings } from 'lucide-react'
import AdminPageHeader from './components/AdminPageHeader'
import { fetchCurrentUser, updateCurrentUser } from '../../services/api/utilisateurApi'
import {
  DashboardFormActions,
  DashboardFormAlert,
  DashboardFormCard,
  DashboardFormField,
  DashboardFormPage,
  DashboardFormSection,
  DashboardSubmitButton,
  dashboardInputClass,
} from '../../components/dashboard/DashboardForm'

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
    <DashboardFormPage>
      <AdminPageHeader title="Paramètres" description="Configuration de votre compte administrateur" />

      <DashboardFormCard
        icon={Settings}
        title="Mon compte"
        description="Mettez à jour vos informations et votre mot de passe"
        onSubmit={handleSubmit}
      >
        <DashboardFormAlert type="error">{error}</DashboardFormAlert>
        <DashboardFormAlert type="success">{success}</DashboardFormAlert>

        <DashboardFormSection title="Identité">
          <div className="grid sm:grid-cols-2 gap-3">
            <DashboardFormField label="Prénom" htmlFor="admin-prenom" required>
              <input
                id="admin-prenom"
                value={form.prenom_utilisateur}
                onChange={e => setForm(f => ({ ...f, prenom_utilisateur: e.target.value }))}
                className={dashboardInputClass}
              />
            </DashboardFormField>
            <DashboardFormField label="Nom" htmlFor="admin-nom" required>
              <input
                id="admin-nom"
                value={form.nom_utilisateur}
                onChange={e => setForm(f => ({ ...f, nom_utilisateur: e.target.value }))}
                className={dashboardInputClass}
              />
            </DashboardFormField>
          </div>
        </DashboardFormSection>

        <DashboardFormSection title="Contact">
          <DashboardFormField label="Email" htmlFor="admin-email">
            <input
              id="admin-email"
              type="email"
              value={form.mail_utilisateur}
              onChange={e => setForm(f => ({ ...f, mail_utilisateur: e.target.value }))}
              className={dashboardInputClass}
            />
          </DashboardFormField>
          <DashboardFormField label="Téléphone" htmlFor="admin-tel">
            <input
              id="admin-tel"
              value={form.telephone_urilisateur}
              onChange={e => setForm(f => ({ ...f, telephone_urilisateur: e.target.value }))}
              className={dashboardInputClass}
            />
          </DashboardFormField>
          <DashboardFormField label="Résidence" htmlFor="admin-residence">
            <input
              id="admin-residence"
              value={form.residence_utilisateur}
              onChange={e => setForm(f => ({ ...f, residence_utilisateur: e.target.value }))}
              className={dashboardInputClass}
            />
          </DashboardFormField>
        </DashboardFormSection>

        <DashboardFormSection
          title="Sécurité"
          description="Laissez vide pour conserver le mot de passe actuel"
        >
          <DashboardFormField label="Nouveau mot de passe" htmlFor="admin-password" hint="Minimum 6 caractères">
            <input
              id="admin-password"
              type="password"
              value={form.Password_utilisateur}
              onChange={e => setForm(f => ({ ...f, Password_utilisateur: e.target.value }))}
              className={dashboardInputClass}
              autoComplete="new-password"
            />
          </DashboardFormField>
        </DashboardFormSection>

        <DashboardFormActions>
          <DashboardSubmitButton loading={saving} loadingLabel="Enregistrement…">
            Enregistrer
          </DashboardSubmitButton>
        </DashboardFormActions>
      </DashboardFormCard>
    </DashboardFormPage>
  )
}
