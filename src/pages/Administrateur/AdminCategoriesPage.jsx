import { useEffect, useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import AdminPageHeader from './components/AdminPageHeader'
import { createCategory, deleteCategory, fetchCategories } from '../../services/api/categorieApi'

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
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-5 mb-6 shadow-sm flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[180px]">
          <label className="text-xs font-medium text-gray-600 block mb-1">Nom</label>
          <input value={form.nom_categorieproduit} required
            onChange={e => setForm(f => ({ ...f, nom_categorieproduit: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-brand" />
        </div>
        <div className="flex-1 min-w-[180px]">
          <label className="text-xs font-medium text-gray-600 block mb-1">Description</label>
          <input value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-brand" />
        </div>
        <button type="submit" className="bg-brand hover:bg-brand-hover text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2">
          <Plus size={16} /> Ajouter
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
                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
