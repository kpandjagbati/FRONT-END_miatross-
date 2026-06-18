import { useEffect, useState } from 'react'
import { User } from 'lucide-react'
import VendeurPageHeader from './components/VendeurPageHeader'
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

export default function VendeurProfilePage() {
  const [form, setForm] = useState({
    nom_utilisateur: '',
    prenom_utilisateur: '',
    mail_utilisateur: '',
    telephone_urilisateur: '',
    residence_utilisateur: '',
    sexe_utilisateur: 'M',
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
        sexe_utilisateur: u.sexe_utilisateur || 'M',
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
      setSuccess('Profil mis à jour avec succès.')
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
      <VendeurPageHeader title="Mon profil" description="Informations de votre compte vendeur" />

      <DashboardFormCard
        icon={User}
        title="Profil vendeur"
        description="Ces informations sont visibles sur votre espace boutique"
        onSubmit={handleSubmit}
      >
        <DashboardFormAlert type="error">{error}</DashboardFormAlert>
        <DashboardFormAlert type="success">{success}</DashboardFormAlert>

        <DashboardFormSection title="Identité">
          <div className="grid sm:grid-cols-2 gap-3">
            <DashboardFormField label="Prénom" htmlFor="vendeur-prenom" required>
              <input
                id="vendeur-prenom"
                value={form.prenom_utilisateur}
                onChange={e => setForm(f => ({ ...f, prenom_utilisateur: e.target.value }))}
                className={dashboardInputClass}
              />
            </DashboardFormField>
            <DashboardFormField label="Nom" htmlFor="vendeur-nom" required>
              <input
                id="vendeur-nom"
                value={form.nom_utilisateur}
                onChange={e => setForm(f => ({ ...f, nom_utilisateur: e.target.value }))}
                className={dashboardInputClass}
              />
            </DashboardFormField>
          </div>
        </DashboardFormSection>

        <DashboardFormSection title="Contact">
          <DashboardFormField label="Email" htmlFor="vendeur-email">
            <input
              id="vendeur-email"
              type="email"
              value={form.mail_utilisateur}
              onChange={e => setForm(f => ({ ...f, mail_utilisateur: e.target.value }))}
              className={dashboardInputClass}
            />
          </DashboardFormField>
          <DashboardFormField label="Téléphone" htmlFor="vendeur-tel">
            <input
              id="vendeur-tel"
              value={form.telephone_urilisateur}
              onChange={e => setForm(f => ({ ...f, telephone_urilisateur: e.target.value }))}
              className={dashboardInputClass}
            />
          </DashboardFormField>
          <DashboardFormField label="Résidence" htmlFor="vendeur-residence">
            <input
              id="vendeur-residence"
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
          <DashboardFormField label="Nouveau mot de passe" htmlFor="vendeur-password" hint="Optionnel">
            <input
              id="vendeur-password"
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
