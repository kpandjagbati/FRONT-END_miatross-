import { useEffect, useState } from 'react'
import { Eye, EyeOff, User, Lock, Mail, Phone, Store } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth, BACKEND_DEMO_ACCOUNTS } from '../../context/AuthContext'
import { registerVendeur } from '../../services/api/authApi'
import logoImg from '../../assets/MiaTrossè-logo1.png'

function Logo() {
  return (
    <div className="flex w-full items-center justify-center px-2">
      <img
        src={logoImg}
        alt="Shop MiaTrossè - Shop Smart. Live Better."
        className="h-24 w-auto max-w-full object-contain sm:h-28 md:h-32 lg:h-36"
      />
    </div>
  )
}

function SignInForm({ defaultLogin = '', successMessage = '', redirectTo = null }) {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ identifier: defaultLogin, password: '' })
  const [error, setError] = useState('')
  const { login, loading, getDashboardPath } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (defaultLogin) {
      setForm(prev => ({ ...prev, identifier: defaultLogin }))
    }
  }, [defaultLogin])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const user = await login(form.identifier, form.password)
      if (redirectTo && allowedRedirect(user.role, redirectTo)) {
        navigate(redirectTo)
      } else {
        navigate(getDashboardPath(user.role))
      }
    } catch (err) {
      setError(err.message || 'Identifiants invalides.')
    }
  }

  function allowedRedirect(role, path) {
    if (path.startsWith('/vendeur')) return role === 'vendeur'
    if (path.startsWith('/admin')) return role === 'admin'
    return true
  }

  const fillDemo = (account) => {
    setForm({ identifier: account.login, password: account.password })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-2">
        <p className="text-base font-semibold text-base-content">Connexion</p>
        <p className="text-sm text-base-content/60 mt-0.5">
          Connectez-vous avec votre compte et mot de passe pour accéder au dashboard.
        </p>
      </div>

      {successMessage && (
        <div className="rounded-xl bg-green-50 border border-green-200 px-3 py-2 text-xs text-green-800">
          {successMessage}
        </div>
      )}

      <label className="input input-bordered flex items-center gap-3 bg-base-200 border-base-300 focus-within:border-primary focus-within:outline-none w-full">
        <User size={16} className="text-base-content/40 shrink-0" />
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          className="grow bg-transparent outline-none text-base-content placeholder:text-base-content/40 text-sm"
          value={form.identifier}
          onChange={e => setForm({ ...form, identifier: e.target.value })}
          required
        />
      </label>

      <label className="input input-bordered flex items-center gap-3 bg-base-200 border-base-300 focus-within:border-primary focus-within:outline-none w-full">
        <Lock size={16} className="text-base-content/40 shrink-0" />
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Mot de passe"
          className="grow bg-transparent outline-none text-base-content placeholder:text-base-content/40 text-sm"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-base-content/40 hover:text-base-content/70 transition-colors shrink-0"
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </label>

      <button
        type="submit"
        id="signin-btn"
        className="btn btn-primary w-full text-white font-semibold text-sm rounded-xl"
        disabled={loading}
      >
        {loading ? <span className="loading loading-spinner loading-sm" /> : 'Se connecter'}
      </button>

      {error && <p className="text-xs text-error text-center">{error}</p>}

      <div className="pt-2 border-t border-base-300">
        <p className="text-xs text-base-content/50 text-center mb-2">Comptes de test</p>
        <div className="flex flex-col gap-1.5">
          {BACKEND_DEMO_ACCOUNTS.map(account => (
            <button
              key={account.login}
              type="button"
              onClick={() => fillDemo(account)}
              className="text-xs text-primary hover:underline text-center"
            >
              {account.label} — {account.login} / {account.password}
            </button>
          ))}
        </div>
      </div>
    </form>
  )
}

function SignUpForm({ onRegistered }) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [form, setForm] = useState({
    prenom: '',
    nom: '',
    login: '',
    email: '',
    phone: '',
    password: '',
    confirm: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirm) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }
    if (form.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.')
      return
    }

    setLoading(true)
    try {
      const response = await registerVendeur({
        prenom: form.prenom.trim(),
        nom: form.nom.trim(),
        login: form.login.trim(),
        email: form.email.trim(),
        telephone: form.phone.trim(),
        password: form.password,
      })
      onRegistered({
        login: response.login,
        message: response.message,
      })
    } catch (err) {
      setError(err.message || 'Impossible de créer le compte.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="mb-2">
        <p className="text-base font-semibold text-base-content inline-flex items-center gap-2">
          <Store size={18} className="text-primary" />
          Devenir vendeur
        </p>
        <p className="text-sm text-base-content/60 mt-0.5">
          Créez votre compte vendeur, puis connectez-vous pour accéder à votre dashboard.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <label className="input input-bordered flex items-center gap-2 bg-base-200 border-base-300 focus-within:border-primary w-full">
          <input
            type="text"
            placeholder="Prénom"
            className="grow bg-transparent outline-none text-base-content placeholder:text-base-content/40 text-sm min-w-0"
            value={form.prenom}
            onChange={e => setForm({ ...form, prenom: e.target.value })}
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 bg-base-200 border-base-300 focus-within:border-primary w-full">
          <input
            type="text"
            placeholder="Nom"
            className="grow bg-transparent outline-none text-base-content placeholder:text-base-content/40 text-sm min-w-0"
            value={form.nom}
            onChange={e => setForm({ ...form, nom: e.target.value })}
            required
          />
        </label>
      </div>

      <label className="input input-bordered flex items-center gap-3 bg-base-200 border-base-300 focus-within:border-primary focus-within:outline-none w-full">
        <User size={16} className="text-base-content/40 shrink-0" />
        <input
          type="text"
          placeholder="Nom d'utilisateur (login)"
          className="grow bg-transparent outline-none text-base-content placeholder:text-base-content/40 text-sm"
          value={form.login}
          onChange={e => setForm({ ...form, login: e.target.value })}
          required
        />
      </label>

      <label className="input input-bordered flex items-center gap-3 bg-base-200 border-base-300 focus-within:border-primary focus-within:outline-none w-full">
        <Mail size={16} className="text-base-content/40 shrink-0" />
        <input
          type="email"
          placeholder="Email"
          className="grow bg-transparent outline-none text-base-content placeholder:text-base-content/40 text-sm"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
      </label>

      <label className="input input-bordered flex items-center gap-3 bg-base-200 border-base-300 focus-within:border-primary focus-within:outline-none w-full">
        <Phone size={16} className="text-base-content/40 shrink-0" />
        <input
          type="tel"
          placeholder="Téléphone"
          className="grow bg-transparent outline-none text-base-content placeholder:text-base-content/40 text-sm"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
          required
        />
      </label>

      <label className="input input-bordered flex items-center gap-3 bg-base-200 border-base-300 focus-within:border-primary focus-within:outline-none w-full">
        <Lock size={16} className="text-base-content/40 shrink-0" />
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Mot de passe"
          className="grow bg-transparent outline-none text-base-content placeholder:text-base-content/40 text-sm"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
          minLength={6}
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}
          className="text-base-content/40 hover:text-base-content/70 transition-colors shrink-0">
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </label>

      <label className="input input-bordered flex items-center gap-3 bg-base-200 border-base-300 focus-within:border-primary focus-within:outline-none w-full">
        <Lock size={16} className="text-base-content/40 shrink-0" />
        <input
          type={showConfirm ? 'text' : 'password'}
          placeholder="Confirmer le mot de passe"
          className="grow bg-transparent outline-none text-base-content placeholder:text-base-content/40 text-sm"
          value={form.confirm}
          onChange={e => setForm({ ...form, confirm: e.target.value })}
          required
          minLength={6}
        />
        <button type="button" onClick={() => setShowConfirm(!showConfirm)}
          className="text-base-content/40 hover:text-base-content/70 transition-colors shrink-0">
          {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </label>

      <button
        type="submit"
        id="signup-btn"
        className="btn btn-primary w-full text-white font-semibold text-sm rounded-xl mt-1"
        disabled={loading}
      >
        {loading ? <span className="loading loading-spinner loading-sm" /> : 'Créer mon compte vendeur'}
      </button>

      {error && <p className="text-xs text-error text-center">{error}</p>}
    </form>
  )
}

export default function AuthPage() {
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') === 'signup' ? 'signup' : 'signin')
  const [registeredLogin, setRegisteredLogin] = useState('')
  const [registrationMessage, setRegistrationMessage] = useState('')
  const redirectTo = searchParams.get('redirect') || null

  const handleRegistered = ({ login, message }) => {
    setRegisteredLogin(login)
    setRegistrationMessage(message)
    setActiveTab('signin')
  }

  return (
    <div
      data-theme="miatrosse"
      className="flex min-h-dvh w-full items-center justify-center bg-base-200 px-4 py-6 sm:px-6 sm:py-8"
    >
      <div className="mx-auto flex w-full max-w-[min(100%,28rem)] flex-col items-center justify-center">
        <div className="w-full rounded-2xl border border-base-300 bg-base-100 px-5 py-7 shadow-sm sm:px-8 sm:py-8">
          <div className="mb-2 flex justify-center">
            <Logo />
          </div>

          <div className="mb-5 text-center sm:mb-6">
            <h1 className="text-xl font-bold text-base-content sm:text-2xl">
              {activeTab === 'signin' ? 'Connexion' : 'Inscription vendeur'}
            </h1>
            <p className="text-sm text-base-content/60 mt-1">
              {activeTab === 'signin'
                ? 'Accédez à votre espace vendeur ou administrateur'
                : 'Rejoignez MiaTrossè en tant que vendeur'}
            </p>
          </div>

          <div className="mb-5 flex rounded-xl bg-base-200 p-1 sm:mb-6">
            <button
              id="tab-signin"
              onClick={() => setActiveTab('signin')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'signin'
                  ? 'bg-base-100 text-base-content shadow-sm'
                  : 'text-base-content/50 hover:text-base-content/80'
              }`}
            >
              Connexion
            </button>
            <button
              id="tab-signup"
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'signup'
                  ? 'bg-base-100 text-base-content shadow-sm'
                  : 'text-base-content/50 hover:text-base-content/80'
              }`}
            >
              Devenir vendeur
            </button>
          </div>

          <div className="transition-all duration-200">
            {activeTab === 'signin' ? (
              <SignInForm
                defaultLogin={registeredLogin}
                successMessage={registrationMessage}
                redirectTo={redirectTo}
              />
            ) : (
              <SignUpForm onRegistered={handleRegistered} />
            )}
          </div>

          <div className="text-center mt-5">
            {activeTab === 'signin' ? (
              <p className="text-sm text-base-content/60">
                Pas encore vendeur ?{' '}
                <button
                  onClick={() => setActiveTab('signup')}
                  className="text-primary font-semibold hover:underline"
                >
                  Créer un compte
                </button>
              </p>
            ) : (
              <p className="text-sm text-base-content/60">
                Déjà inscrit ?{' '}
                <button
                  onClick={() => setActiveTab('signin')}
                  className="text-primary font-semibold hover:underline"
                >
                  Se connecter
                </button>
              </p>
            )}
          </div>
        </div>

        <p className="mt-4 max-w-[min(100%,28rem)] px-2 text-center text-xs text-base-content/40">
          © 2025 Shop MiaTrossè — Shop Smart. Live Better.
        </p>
      </div>
    </div>
  )
}
