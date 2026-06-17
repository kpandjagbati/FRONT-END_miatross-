import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import VendeurPageHeader from './components/VendeurPageHeader'
import { createProduit } from '../../services/api/produitApi'
import { fetchCategories } from '../../services/api/categorieApi'

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
    <div>
      <VendeurPageHeader title="Ajouter un produit" description="Le produit sera publié immédiatement dans la boutique" />

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm max-w-xl space-y-4">
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Nom du produit</label>
          <input required value={form.nom_produit}
            onChange={e => setForm(f => ({ ...f, nom_produit: e.target.value }))}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-brand" />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Description</label>
          <textarea rows={3} value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-brand resize-none" />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Prix (FCFA)</label>
          <input required type="number" min="0" value={form.prix}
            onChange={e => setForm(f => ({ ...f, prix: e.target.value }))}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-brand" />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Catégorie</label>
          <select required value={form.categorieId}
            onChange={e => setForm(f => ({ ...f, categorieId: e.target.value }))}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-brand bg-white">
            <option value="">Choisir une catégorie</option>
            {categories.map(c => (
              <option key={c.idcategorie_produit} value={c.idcategorie_produit}>
                {c.nom_categorieproduit}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Image</label>
          <input required type="file" accept="image/*"
            onChange={e => setImage(e.target.files?.[0] || null)}
            className="w-full text-sm" />
        </div>

        <button type="submit" disabled={loading}
          className="w-full bg-brand hover:bg-brand-hover disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors">
          {loading ? 'Publication…' : 'Publier le produit'}
        </button>
      </form>
    </div>
  )
}
