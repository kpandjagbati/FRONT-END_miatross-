/**
 * VendeurAddProductPage
 * ────────────────────
 * Page de création d'un nouveau produit.
 * Le vendeur renseigne :
 * - Nom, description, prix du produit
 * - Catégorie de classification
 * - Image principale
 * 
 * Processus :
 * 1. Récupération des catégories disponibles
 * 2. Soumission du formulaire avec upload d'image
 * 3. Redirection vers la liste des produits après succès
 */

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PackagePlus } from 'lucide-react'
import VendeurPageHeader from './components/VendeurPageHeader'
import { createProduit } from '../../services/api/produitApi'
import { fetchCategories } from '../../services/api/categorieApi'
import {
  DashboardFormActions,
  DashboardFormAlert,
  DashboardFormCard,
  DashboardFormField,
  DashboardFormPage,
  DashboardFormSection,
  DashboardFileInput,
  DashboardSubmitButton,
  dashboardInputClass,
  dashboardSelectClass,
  dashboardTextareaClass,
} from '../../components/dashboard/DashboardForm'

export default function VendeurAddProductPage() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({ nom_produit: '', description: '', prix: '', categorieId: '' })
  const [image, setImage] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchCategories().then(setCategories).catch(err => setError(err.message))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!image) {
      setError('Veuillez sélectionner une image.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const categorie = categories.find(c => String(c.idcategorie_produit) === form.categorieId)
      await createProduit({
        nom_produit: form.nom_produit,
        description: form.description,
        prix: Number(form.prix),
        categorie_produit: categorie ? { idcategorie_produit: categorie.idcategorie_produit } : null,
      }, image)
      navigate('/vendeur/produits')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardFormPage>
      <VendeurPageHeader title="Ajouter un produit" description="Le produit sera publié immédiatement dans la boutique" />

      <DashboardFormCard
        icon={PackagePlus}
        title="Nouveau produit"
        description="Renseignez les informations de votre article"
        onSubmit={handleSubmit}
      >
        <DashboardFormAlert type="error">{error}</DashboardFormAlert>

        <DashboardFormSection title="Détails du produit">
          <DashboardFormField label="Nom du produit" htmlFor="produit-nom" required>
            <input
              id="produit-nom"
              required
              value={form.nom_produit}
              onChange={e => setForm(f => ({ ...f, nom_produit: e.target.value }))}
              className={dashboardInputClass}
              placeholder="Ex. Casque Bluetooth JBL"
            />
          </DashboardFormField>

          <DashboardFormField label="Description" htmlFor="produit-desc">
            <textarea
              id="produit-desc"
              rows={3}
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              className={dashboardTextareaClass}
              placeholder="Décrivez votre produit en quelques lignes…"
            />
          </DashboardFormField>

          <div className="grid sm:grid-cols-2 gap-3">
            <DashboardFormField label="Prix (FCFA)" htmlFor="produit-prix" required>
              <input
                id="produit-prix"
                required
                type="number"
                min="0"
                value={form.prix}
                onChange={e => setForm(f => ({ ...f, prix: e.target.value }))}
                className={dashboardInputClass}
                placeholder="0"
              />
            </DashboardFormField>

            <DashboardFormField label="Catégorie" htmlFor="produit-cat" required>
              <select
                id="produit-cat"
                required
                value={form.categorieId}
                onChange={e => setForm(f => ({ ...f, categorieId: e.target.value }))}
                className={dashboardSelectClass}
              >
                <option value="">Choisir une catégorie</option>
                {categories.map(c => (
                  <option key={c.idcategorie_produit} value={c.idcategorie_produit}>
                    {c.nom_categorieproduit}
                  </option>
                ))}
              </select>
            </DashboardFormField>
          </div>
        </DashboardFormSection>

        <DashboardFormSection title="Image du produit">
          <DashboardFileInput
            id="produit-image"
            label="Photo principale"
            hint={image ? `Fichier sélectionné : ${image.name}` : 'Une image claire augmente vos ventes'}
            required
            onChange={e => setImage(e.target.files?.[0] || null)}
          />
        </DashboardFormSection>

        <DashboardFormActions>
          <DashboardSubmitButton loading={loading} loadingLabel="Publication…">
            Publier le produit
          </DashboardSubmitButton>
        </DashboardFormActions>
      </DashboardFormCard>
    </DashboardFormPage>
  )
}
