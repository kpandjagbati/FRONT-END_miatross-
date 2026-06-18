import { useEffect, useState } from 'react'
import { FolderPlus, Plus, Trash2 } from 'lucide-react'
import AdminPageHeader from './components/AdminPageHeader'
import { createCategory, deleteCategory, fetchCategories } from '../../services/api/categorieApi'
import {
  DashboardFormActions,
  DashboardFormAlert,
  DashboardFormCard,
  DashboardFormField,
  DashboardSubmitButton,
  dashboardInputClass,
} from '../../components/dashboard/DashboardForm'

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({ nom_categorieproduit: '', description: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    fetchCategories()
      .then(setCategories)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createCategory(form)
      setForm({ nom_categorieproduit: '', description: '' })
      setError('')
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette catégorie ?')) return
    try {
      await deleteCategory(id)
      setCategories(prev => prev.filter(c => c.idcategorie_produit !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <AdminPageHeader title="Catégories" description="Gestion des catégories produits" />

      <div className="max-w-2xl mx-auto w-full mb-4">
        <DashboardFormCard
          icon={FolderPlus}
          title="Ajouter une catégorie"
          description="Les vendeurs pourront classer leurs produits dans ces catégories"
          maxWidth="2xl"
          onSubmit={handleSubmit}
        >
          <DashboardFormAlert type="error">{error}</DashboardFormAlert>

          <div className="grid sm:grid-cols-2 gap-3">
            <DashboardFormField label="Nom" htmlFor="cat-nom" required>
              <input
                id="cat-nom"
                value={form.nom_categorieproduit}
                required
                onChange={e => setForm(f => ({ ...f, nom_categorieproduit: e.target.value }))}
                className={dashboardInputClass}
                placeholder="Ex. Électronique"
              />
            </DashboardFormField>
            <DashboardFormField label="Description" htmlFor="cat-desc">
              <input
                id="cat-desc"
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                className={dashboardInputClass}
                placeholder="Courte description"
              />
            </DashboardFormField>
          </div>

          <DashboardFormActions>
            <DashboardSubmitButton>
              <span className="inline-flex items-center gap-2">
                <Plus size={16} />
                Ajouter
              </span>
            </DashboardSubmitButton>
          </DashboardFormActions>
        </DashboardFormCard>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-brand/5 via-white to-white">
          <h2 className="text-sm font-bold text-gray-900">Catégories existantes</h2>
        </div>
        {loading ? (
          <p className="p-8 text-center text-gray-500">Chargement…</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="dashboard-table w-full text-sm text-gray-800">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-500">
                  <th className="px-5 py-3 font-medium">Nom</th>
                  <th className="px-5 py-3 font-medium">Description</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(c => (
                  <tr key={c.idcategorie_produit} className="border-t border-gray-50">
                    <td className="px-5 py-3 font-medium">{c.nom_categorieproduit}</td>
                    <td className="px-5 py-3 text-gray-600">{c.description || '—'}</td>
                    <td className="px-5 py-3">
                      <button type="button" onClick={() => handleDelete(c.idcategorie_produit)}
                        className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {categories.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-5 py-8 text-center text-gray-500">
                      Aucune catégorie. Ajoutez-en une ci-dessus.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
