export const dashboardInputClass =
  'w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 ' +
  'outline-none transition-colors focus:bg-white focus:border-brand focus:ring-2 focus:ring-brand/20'

export const dashboardSelectClass = `${dashboardInputClass} cursor-pointer`

export const dashboardTextareaClass = `${dashboardInputClass} resize-none min-h-[4.5rem]`

export function DashboardFormPage({ children, maxWidth = 'xl' }) {
  const maxWidthClass = {
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
  }[maxWidth] || 'max-w-xl'

  return (
    <div className={`${maxWidthClass} mx-auto w-full min-h-[calc(100dvh-11rem)] flex flex-col justify-center py-3`}>
      {children}
    </div>
  )
}

export function DashboardFormAlert({ type = 'error', children }) {
  if (!children) return null

  const styles = type === 'success'
    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
    : 'bg-red-50 border-red-200 text-red-700'

  return (
    <div className={`rounded-lg border px-3 py-2 text-sm ${styles}`}>
      {children}
    </div>
  )
}

export function DashboardFormCard({
  title,
  description,
  icon: Icon,
  maxWidth = 'xl',
  centered = false,
  children,
  onSubmit,
}) {
  const maxWidthClass = {
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    full: 'max-w-full',
  }[maxWidth] || 'max-w-xl'

  const wrapperClass = centered
    ? `${maxWidthClass} mx-auto w-full`
    : maxWidthClass

  return (
    <div className={wrapperClass}>
      <form
        onSubmit={onSubmit}
        className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden"
      >
        {(title || description) && (
          <div className="px-5 py-3 border-b border-gray-100 bg-gradient-to-r from-brand/5 via-white to-white">
            <div className="flex items-center gap-2.5">
              {Icon && (
                <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                  <Icon size={17} className="text-brand" />
                </div>
              )}
              <div className="min-w-0">
                {title && <h2 className="text-sm font-bold text-gray-900">{title}</h2>}
                {description && (
                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">{description}</p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="p-4 space-y-4">
          {children}
        </div>
      </form>
    </div>
  )
}

export function DashboardFormSection({ title, description, children }) {
  return (
    <section className="space-y-3">
      {(title || description) && (
        <div className="pb-0.5 border-b border-gray-100">
          {title && <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">{title}</h3>}
          {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
        </div>
      )}
      <div className="space-y-3">{children}</div>
    </section>
  )
}

export function DashboardFormField({
  label,
  htmlFor,
  hint,
  required,
  className = '',
  children,
}) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={htmlFor} className="text-xs font-medium text-gray-700 block mb-1">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      {children}
      {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
    </div>
  )
}

export function DashboardFormActions({ children }) {
  return (
    <div className="pt-1 border-t border-gray-100">
      {children}
    </div>
  )
}

export function DashboardSubmitButton({
  children,
  loading = false,
  loadingLabel = 'Enregistrement…',
  fullWidth = true,
  className = '',
  ...props
}) {
  return (
    <button
      type="submit"
      disabled={loading || props.disabled}
      className={`${fullWidth ? 'w-full' : 'w-full sm:w-auto sm:min-w-[10rem]'}
                  bg-brand hover:bg-brand-hover disabled:opacity-60 text-white font-semibold px-5 py-2.5
                  rounded-lg transition-colors shadow-sm shadow-brand/20 ${className}`}
      {...props}
    >
      {loading ? loadingLabel : children}
    </button>
  )
}

export function DashboardFileInput({ id, label, hint, onChange, accept = 'image/*', required }) {
  return (
    <DashboardFormField label={label} htmlFor={id} hint={hint} required={required}>
      <label
        htmlFor={id}
        className="flex flex-col items-center justify-center w-full min-h-[4.5rem] px-3 py-3
                   border-2 border-dashed border-gray-200 rounded-lg bg-gray-50
                   hover:border-brand/40 hover:bg-brand/5 transition-colors cursor-pointer"
      >
        <span className="text-sm font-medium text-gray-700">Choisir un fichier</span>
        <span className="text-xs text-gray-500 mt-1">PNG, JPG ou WEBP</span>
        <input
          id={id}
          type="file"
          accept={accept}
          required={required}
          onChange={onChange}
          className="sr-only"
        />
      </label>
    </DashboardFormField>
  )
}
