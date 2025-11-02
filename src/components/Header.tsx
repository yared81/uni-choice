import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'am', name: 'አማርኛ', flag: '🇪🇹' },
  { code: 'ti', name: 'ትግርኛ', flag: '🇪🇹' },
  { code: 'om', name: 'Afaan Oromo', flag: '🇪🇹' },
  { code: 'so', name: 'Soomaali', flag: '🇪🇹' },
  { code: 'aa', name: 'Afar', flag: '🇪🇹' }
]

export default function Header() {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout, isAuthenticated } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    setIsLanguageMenuOpen(false)
  }

  const isActive = (path: string) => location.pathname === path

  const currentLanguage = LANGUAGES.find(lang => lang.code === i18n.language) || LANGUAGES[0]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-medium border-b border-olive-100/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-page h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <img 
              src="/img/uniChoice_logo.ico" 
              alt={t('app.name')}
              className="w-12 h-12 object-contain"
            />
          </motion.div>
          <div>
            <span className="text-2xl font-heading text-charcoal font-bold bg-gradient-to-r from-olive-600 to-terracotta-600 bg-clip-text text-transparent">
              {t('app.name')}
            </span>
            <p className="text-xs text-charcoal/60 -mt-1 hidden lg:block">{t('app.tagline')}</p>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {[
            { path: '/', key: 'nav.home' },
            { path: '/universities', key: 'nav.universities' },
            { path: '/compare', key: 'nav.compare' },
            { path: '/favorites', key: 'nav.favorites' },
            { path: '/about', key: 'nav.about' },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-250"
            >
              {isActive(item.path) && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-olive-50 to-terracotta-50 rounded-lg border border-olive-200/50"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <span className={`relative z-10 ${
                isActive(item.path) 
                  ? 'text-olive-700 font-bold' 
                  : 'text-charcoal/70 hover:text-olive-600'
              }`}>
                {t(item.key)}
              </span>
            </Link>
          ))}
          {isAuthenticated && (
            <Link
              to="/profile"
              className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-250 ${
                isActive('/profile') 
                  ? 'text-olive-700 font-bold' 
                  : 'text-charcoal/70 hover:text-olive-600'
              }`}
            >
              {t('nav.profile')}
            </Link>
          )}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/90 border border-olive-200/50 text-sm font-medium text-charcoal hover:bg-olive-50 hover:border-olive-300 transition-all duration-250 shadow-sm"
            >
              <span className="text-lg">{currentLanguage.flag}</span>
              <span className="hidden sm:inline">{currentLanguage.name}</span>
              <motion.svg
                animate={{ rotate: isLanguageMenuOpen ? 180 : 0 }}
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </motion.button>

            <AnimatePresence>
              {isLanguageMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-large border border-olive-100/50 overflow-hidden"
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-olive-50 transition-colors ${
                        i18n.language === lang.code ? 'bg-olive-50 text-olive-700 font-bold' : 'text-charcoal'
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span>{lang.name}</span>
                      {i18n.language === lang.code && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto text-olive-600"
                        >
                          ✓
                        </motion.span>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Auth Buttons */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-olive-50 transition-all duration-250 group"
              >
                {user?.profilePicture ? (
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-olive-300 group-hover:border-olive-500 transition-colors shadow-sm"
                  />
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 bg-gradient-to-br from-olive-500 to-terracotta-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md"
                  >
                    {user?.name.charAt(0).toUpperCase()}
                  </motion.div>
                )}
                <span className="text-sm font-medium text-charcoal hidden md:block group-hover:text-olive-700 transition-colors">
                  {user?.name}
                </span>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  logout()
                  navigate('/')
                }}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium hover:shadow-lg transition-all duration-250"
              >
                {t('nav.logout')}
              </motion.button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className="px-4 py-2 rounded-lg bg-white border-2 border-olive-500 text-olive-600 text-sm font-medium hover:bg-olive-50 transition-all duration-250 shadow-sm"
              >
                {t('nav.login')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/signup')}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-olive-500 to-olive-600 text-white text-sm font-medium shadow-md hover:shadow-glow-olive transition-all duration-250"
              >
                {t('nav.signup')}
              </motion.button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-olive-50 transition-colors"
          >
            <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-olive-100/50"
          >
            <nav className="container-page py-4 space-y-2">
              {[
                { path: '/', key: 'nav.home' },
                { path: '/universities', key: 'nav.universities' },
                { path: '/compare', key: 'nav.compare' },
                { path: '/favorites', key: 'nav.favorites' },
                { path: '/about', key: 'nav.about' },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive(item.path)
                      ? 'bg-olive-50 text-olive-700 font-bold'
                      : 'text-charcoal hover:bg-olive-50 hover:text-olive-600'
                  }`}
                >
                  {t(item.key)}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
