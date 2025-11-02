import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'am', name: 'Amharic' },
  { code: 'ti', name: 'Tigrinya' },
  { code: 'om', name: 'Afaan Oromo' },
  { code: 'so', name: 'Somali' },
  { code: 'aa', name: 'Afar' }
]

export default function Header() {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout, isAuthenticated } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-soft' : 'bg-transparent'
    }`}>
      <div className="container-page h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-olive to-terracotta rounded-lg flex items-center justify-center transition-transform duration-250 group-hover:scale-105">
            <span className="text-white font-heading text-xl font-bold">U</span>
          </div>
          <span className="text-2xl font-heading text-charcoal font-bold">UniMerk</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors duration-180 ${
              isActive('/') ? 'text-olive' : 'text-charcoal/80 hover:text-olive'
            }`}
          >
            {t('nav.home')}
          </Link>
          <Link 
            to="/universities" 
            className={`text-sm font-medium transition-colors duration-180 ${
              isActive('/universities') ? 'text-olive' : 'text-charcoal/80 hover:text-olive'
            }`}
          >
            Universities
          </Link>
          <Link 
            to="/compare" 
            className={`text-sm font-medium transition-colors duration-180 ${
              isActive('/compare') ? 'text-olive' : 'text-charcoal/80 hover:text-olive'
            }`}
          >
            {t('nav.compare')}
          </Link>
          <Link 
            to="/about" 
            className={`text-sm font-medium transition-colors duration-180 ${
              isActive('/about') ? 'text-olive' : 'text-charcoal/80 hover:text-olive'
            }`}
          >
            {t('nav.about')}
          </Link>
          <Link 
            to="/resources" 
            className={`text-sm font-medium transition-colors duration-180 ${
              isActive('/resources') ? 'text-olive' : 'text-charcoal/80 hover:text-olive'
            }`}
          >
            Resources
          </Link>
          {isAuthenticated && (
            <Link 
              to="/profile" 
              className={`text-sm font-medium transition-colors duration-180 ${
                isActive('/profile') ? 'text-olive' : 'text-charcoal/80 hover:text-olive'
              }`}
            >
              Profile
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <select
            className="text-sm bg-white/90 border border-black/10 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-olive/50 transition-all"
            value={i18n.language}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-olive/30"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-br from-olive to-terracotta rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-sm font-medium text-charcoal hidden md:block">{user?.name}</span>
              </Link>
              <button
                onClick={() => {
                  logout()
                  navigate('/')
                }}
                className="px-4 py-2 rounded-md bg-charcoal/10 text-charcoal text-sm font-medium hover:bg-charcoal/20 transition-colors duration-180"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 rounded-md bg-olive text-white text-sm font-medium hover:bg-olive/90 transition-colors duration-180"
              >
                {t('nav.login')}
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="px-4 py-2 rounded-md bg-white border-2 border-olive text-olive text-sm font-medium hover:bg-olive/10 transition-colors duration-180"
              >
                {t('nav.signup')}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
