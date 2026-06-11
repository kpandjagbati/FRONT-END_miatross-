import { useState } from 'react'
import { Eye, EyeOff, User, Lock, Mail, Phone } from 'lucide-react'
import logoImg from '../../assets/MiaTrossè-logo1.png'

// ── Logo avec le vrai fichier image ────────────────────────────────────────────
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

// ── SignIn Form ────────────────────────────────────────────────────────────────
function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ identifier: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Section title */}
      <div className="mb-2">
        <p className="text-base font-semibold text-base-content">Sign in to continue</p>
        <p className="text-sm text-base-content/60 mt-0.5">
          Access your dashboard, products, and store tools.
        </p>
      </div>

      {/* Username / Email field */}
      <label className="input input-bordered flex items-center gap-3 bg-base-200 border-base-300 focus-within:border-primary focus-within:outline-none w-full">
        <User size={16} className="text-base-content/40 shrink-0" />
        <input
          type="text"
          placeholder="Username or Email"
          className="grow bg-transparent outline-none text-base-content placeholder:text-base-content/40 text-sm"
          value={form.identifier}
          onChange={e => setForm({ ...form, identifier: e.target.value })}
          required
        />
      </label>

      {/* Password field */}
      <label className="input input-bordered flex items-center gap-3 bg-base-200 border-base-300 focus-within:border-primary focus-within:outline-none w-full">
        <Lock size={16} className="text-base-content/40 shrink-0" />
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
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

      {/* Forgot password */}
      <div className="text-right">
        <a href="#" className="text-xs text-primary hover:underline font-medium">
          Forgot password?
        </a>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        id="signin-btn"
        className="btn btn-primary w-full text-white font-semibold text-sm rounded-xl"
        disabled={loading}
      >
        {loading ? <span className="loading loading-spinner loading-sm" /> : 'Sign In'}
      </button>
    </form>
  )
}

// ── SignUp Form ────────────────────────────────────────────────────────────────
function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Section title */}
      <div className="mb-2">
        <p className="text-base font-semibold text-base-content">Create your account</p>
        <p className="text-sm text-base-content/60 mt-0.5">
          Join Shop MiaTrossè and start shopping smarter.
        </p>
      </div>

      {/* Full Name */}
      <label className="input input-bordered flex items-center gap-3 bg-base-200 border-base-300 focus-within:border-primary focus-within:outline-none w-full">
        <User size={16} className="text-base-content/40 shrink-0" />
        <input
          type="text"
          placeholder="Full Name"
          className="grow bg-transparent outline-none text-base-content placeholder:text-base-content/40 text-sm"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
      </label>

      {/* Email */}
      <label className="input input-bordered flex items-center gap-3 bg-base-200 border-base-300 focus-within:border-primary focus-within:outline-none w-full">
        <Mail size={16} className="text-base-content/40 shrink-0" />
        <input
          type="email"
          placeholder="Email address"
          className="grow bg-transparent outline-none text-base-content placeholder:text-base-content/40 text-sm"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
      </label>

      {/* Phone */}
      <label className="input input-bordered flex items-center gap-3 bg-base-200 border-base-300 focus-within:border-primary focus-within:outline-none w-full">
        <Phone size={16} className="text-base-content/40 shrink-0" />
        <input
          type="tel"
          placeholder="Phone number"
          className="grow bg-transparent outline-none text-base-content placeholder:text-base-content/40 text-sm"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />
      </label>

      {/* Password */}
      <label className="input input-bordered flex items-center gap-3 bg-base-200 border-base-300 focus-within:border-primary focus-within:outline-none w-full">
        <Lock size={16} className="text-base-content/40 shrink-0" />
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          className="grow bg-transparent outline-none text-base-content placeholder:text-base-content/40 text-sm"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}
          className="text-base-content/40 hover:text-base-content/70 transition-colors shrink-0">
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </label>

      {/* Confirm password */}
      <label className="input input-bordered flex items-center gap-3 bg-base-200 border-base-300 focus-within:border-primary focus-within:outline-none w-full">
        <Lock size={16} className="text-base-content/40 shrink-0" />
        <input
          type={showConfirm ? 'text' : 'password'}
          placeholder="Confirm password"
          className="grow bg-transparent outline-none text-base-content placeholder:text-base-content/40 text-sm"
          value={form.confirm}
          onChange={e => setForm({ ...form, confirm: e.target.value })}
          required
        />
        <button type="button" onClick={() => setShowConfirm(!showConfirm)}
          className="text-base-content/40 hover:text-base-content/70 transition-colors shrink-0">
          {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </label>

      {/* Submit */}
      <button
        type="submit"
        id="signup-btn"
        className="btn btn-primary w-full text-white font-semibold text-sm rounded-xl mt-1"
        disabled={loading}
      >
        {loading ? <span className="loading loading-spinner loading-sm" /> : 'Create Account'}
      </button>
    </form>
  )
}

// ── Main Auth Page ─────────────────────────────────────────────────────────────
export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('signin')

  return (
    <div
      data-theme="miatrosse"
      className="flex min-h-dvh w-full items-center justify-center bg-base-200 px-4 py-6 sm:px-6 sm:py-8"
    >
      <div className="mx-auto flex w-full max-w-[min(100%,28rem)] flex-col items-center justify-center">
        {/* Card */}
        <div className="w-full rounded-2xl border border-base-300 bg-base-100 px-5 py-7 shadow-sm sm:px-8 sm:py-8">

          {/* Logo */}
          <div className="mb-2 flex justify-center">
            <Logo />
          </div>

          {/* Welcome text */}
          <div className="mb-5 text-center sm:mb-6">
            <h1 className="text-xl font-bold text-base-content sm:text-2xl">
              {activeTab === 'signin' ? 'Welcome back' : 'Create account'}
            </h1>
            <p className="text-sm text-base-content/60 mt-1">
              {activeTab === 'signin'
                ? 'Sign in to manage your store and products'
                : 'Join thousands of happy shoppers'}
            </p>
          </div>

          {/* Tab switcher */}
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
              Sign In
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
              Create Account
            </button>
          </div>

          {/* Forms */}
          <div className="transition-all duration-200">
            {activeTab === 'signin' ? <SignInForm /> : <SignUpForm />}
          </div>

          {/* Bottom link */}
          <div className="text-center mt-5">
            {activeTab === 'signin' ? (
              <p className="text-sm text-base-content/60">
                No account yet?{' '}
                <button
                  onClick={() => setActiveTab('signup')}
                  className="text-primary font-semibold hover:underline"
                >
                  Create one
                </button>
              </p>
            ) : (
              <p className="text-sm text-base-content/60">
                Already have an account?{' '}
                <button
                  onClick={() => setActiveTab('signin')}
                  className="text-primary font-semibold hover:underline"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="mt-4 max-w-[min(100%,28rem)] px-2 text-center text-xs text-base-content/40">
          © 2025 Shop MiaTrossè — Shop Smart. Live Better.
        </p>
      </div>
    </div>
  )
}
