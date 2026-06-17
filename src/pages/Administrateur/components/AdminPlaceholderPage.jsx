import AdminPageHeader from './AdminPageHeader'

export default function AdminPlaceholderPage({ title, description }) {
  return (
    <div>
      <AdminPageHeader title={title} description={description} />
      <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
        <p className="text-gray-500">Cette section sera bientôt disponible.</p>
      </div>
    </div>
  )
}
