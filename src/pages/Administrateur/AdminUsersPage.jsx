import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import AdminPageHeader from './components/AdminPageHeader'
import { deleteUtilisateur, fetchUtilisateurs, getUtilisateurLogin } from '../../services/api/utilisateurApi'

export default function AdminUsersPage() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    fetchUtilisateurs()
      .then(setUsers)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cet utilisateur ?')) return
    try {
      await deleteUtilisateur(id)
      setUsers(prev => prev.filter(u => u.id_utilisateur !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <AdminPageHeader title="Utilisateurs" description="Liste des comptes depuis l'API backend" />

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <p className="p-8 text-center text-gray-500">Chargement…</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="dashboard-table w-full text-sm text-gray-800">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-500">
                  <th className="px-5 py-3 font-medium">Nom</th>
                  <th className="px-5 py-3 font-medium">Login</th>
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Téléphone</th>
                  <th className="px-5 py-3 font-medium">Rôle</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id_utilisateur} className="border-t border-gray-50">
                    <td className="px-5 py-3 font-medium">{u.prenom_utilisateur} {u.nom_utilisateur}</td>
                    <td className="px-5 py-3">{getUtilisateurLogin(u)}</td>
                    <td className="px-5 py-3">{u.mail_utilisateur || '—'}</td>
                    <td className="px-5 py-3">{u.telephone_urilisateur}</td>
                    <td className="px-5 py-3">
                      <span className="bg-brand/10 text-brand px-2 py-1 rounded-full text-xs font-semibold">
                        {u.type_utilisateur?.libelle_type_utilisateur || '—'}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <button type="button" onClick={() => handleDelete(u.id_utilisateur)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr><td colSpan={6} className="px-5 py-8 text-center text-gray-500">Aucun utilisateur.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
