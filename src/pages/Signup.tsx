import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../contexts/AuthContext'
import ScrollReveal from '../components/ScrollReveal'
import type { Role } from '../types'

export default function Signup() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' as Role
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError(t('auth.error_password_mismatch'))
      return
    }

    if (formData.password.length < 6) {
      setError(t('auth.error_password_length'))
      return
    }

    setLoading(true)

    try {
      const success = await signup(
        formData.email,
        formData.password,
        formData.name,
        formData.role
      )
      if (success) {
        // Redirect based on role
        if (formData.role === 'university') {
          navigate('/profile')
        } else {
          navigate('/')
        }
      } else {
        setError(t('auth.error_email_exists'))
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
              {t('auth.create_account_title')}
            </h1>
            <p className="text-charcoal/70 text-center mb-8">
              {t('auth.signup_subtitle', { appName: t('app.name') })}
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
                  {t('auth.name')}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-charcoal mb-2">
                  {t('auth.email')}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-charcoal mb-2">
                  {t('auth.role')}
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as Role })}
                  className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all bg-white"
                >
                  <option value="student">{t('auth.role_student')}</option>
                  <option value="university">{t('auth.role_university_full')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-charcoal mb-2">
                  {t('auth.password')}
                </label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-charcoal mb-2">
                  {t('auth.confirm_password') || 'Confirm Password'}
                </label>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 rounded-lg bg-gradient-to-r from-olive to-terracotta text-white font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                {loading ? t('auth.creating_account') : t('auth.signup_button')}
              </motion.button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-charcoal/70">
                {t('auth.already_have_account')}{' '}
                <Link to="/login" className="text-olive font-bold hover:underline">
                  {t('auth.sign_in_link')}
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </ScrollReveal>
    </div>
  )
}

