import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './i18n/config'
import './style.css'

import { AuthProvider } from './contexts/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import Home from './pages/Home'
import Universities from './pages/Universities'
import UniversityProfile from './pages/UniversityProfile'
import Compare from './pages/Compare'
import About from './pages/About'
import Contact from './pages/Contact'
import Help from './pages/Help'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'

function PrivacyPage() {
  const { t } = useTranslation()
  return (
    <div className="container-page py-20">
      <h1 className="text-4xl font-heading font-bold mb-6">{t('footer.privacy_policy')}</h1>
      <p className="text-charcoal/70">{t('legal.privacy_content', { defaultValue: 'Privacy policy content coming soon...' })}</p>
    </div>
  )
}

function TermsPage() {
  const { t } = useTranslation()
  return (
    <div className="container-page py-20">
      <h1 className="text-4xl font-heading font-bold mb-6">{t('footer.terms_of_service')}</h1>
      <p className="text-charcoal/70">{t('legal.terms_content', { defaultValue: 'Terms of service content coming soon...' })}</p>
    </div>
  )
}

function AppRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/universities" element={<PageTransition><Universities /></PageTransition>} />
        <Route path="/university/:id" element={<PageTransition><UniversityProfile /></PageTransition>} />
        <Route path="/compare" element={<PageTransition><Compare /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/help" element={<PageTransition><Help /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
        <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
        <Route path="/privacy" element={<PageTransition><PrivacyPage /></PageTransition>} />
        <Route path="/terms" element={<PageTransition><TermsPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  useEffect(() => {
    // Load fonts
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = 'https://fonts.googleapis.com'
    document.head.appendChild(link)
    
    const link2 = document.createElement('link')
    link2.rel = 'preconnect'
    link2.href = 'https://fonts.gstatic.com'
    link2.crossOrigin = ''
    document.head.appendChild(link2)
    
    const link3 = document.createElement('link')
    link3.rel = 'stylesheet'
    link3.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@600;700&family=Merriweather:wght@700&display=swap'
    document.head.appendChild(link3)
  }, [])

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

