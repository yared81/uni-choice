import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../contexts/AuthContext'
import ScrollReveal from '../components/ScrollReveal'

export default function Login() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { login, user } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        // Wait a moment for user to be set, then check role
        setTimeout(() => {
          const storedUser = JSON.parse(localStorage.getItem('unimerk_user') || '{}')
          if (storedUser.role === 'university') {
            navigate('/profile')
          } else {
            navigate('/')
          }
        }, 100)
      } else {
        setError(t('auth.error_invalid_credentials'))
      }
    } catch (err) {
      setError(t('auth.error_occurred'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-32 pb-16 min-h-screen">
      <ScrollReveal>
        <div className="container-page max-w-md mx-auto">
          <motion.div
            className="ui-card p-10 shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-heading font-bold text-charcoal mb-2 text-center">
              {t('auth.welcome_back')}
            </h1>
            <p className="text-charcoal/70 text-center mb-8">
              {t('auth.signin_subtitle', { appName: t('app.name') })}
            </p>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-charcoal mb-2">
                  {t('auth.email')}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-charcoal mb-2">
                  {t('auth.password')}
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-charcoal/70">
                  <input type="checkbox" className="rounded" />
                  <span>{t('auth.remember_me')}</span>
                </label>
                <Link to="/help" className="text-olive hover:underline">
                  {t('auth.forgot_password')}
                </Link>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 rounded-lg bg-gradient-to-r from-olive to-terracotta text-white font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                {loading ? t('auth.signing_in') : t('auth.login_button')}
              </motion.button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-charcoal/70">
                {t('auth.dont_have_account')}{' '}
                <Link to="/signup" className="text-olive font-bold hover:underline">
                  {t('auth.sign_up_link')}
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </ScrollReveal>
    </div>
  )
}

