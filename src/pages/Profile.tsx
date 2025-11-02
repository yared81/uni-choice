import { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../contexts/AuthContext'
import ScrollReveal from '../components/ScrollReveal'
import UniversityCard from '../components/UniversityCard'
import UniversityProfileView from '../components/UniversityProfileView'
import type { University, Program } from '../types'

// Import University Profile Components
import UniversityProfileEdit from './UniversityProfileEdit'

export default function Profile() {
  const { t } = useTranslation()
  const { user, logout, updateUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  if (!user) {
    return null
  }

  // If user is a university representative, show public profile view with settings tab
  if (user.role === 'university') {
    // Import and use UniversityProfile component here with user's university
    const [uniTab, setUniTab] = useState<'profile' | 'settings'>('profile')
    const [myUniversity, setMyUniversity] = useState<University | null>(null)
    const [reviews, setReviews] = useState<any[]>([])

    const loadUniversity = () => {
      // Load user's university
      const userUni = localStorage.getItem(`unichoice_uni_${user.id}`)
      if (userUni) {
        try {
          const parsed = JSON.parse(userUni)
          setMyUniversity(parsed)
          
          // Load reviews for this university
          const allReviews = JSON.parse(localStorage.getItem('unichoice_reviews') || '[]')
          const uniReviews = allReviews.filter((r: any) => r.uniId === parsed.id)
          setReviews(uniReviews)
        } catch (e) {}
      } else {
        setMyUniversity(null)
      }
    }

    useEffect(() => {
      loadUniversity()
      // Also check periodically if university was saved
      const interval = setInterval(loadUniversity, 1000)
      return () => clearInterval(interval)
    }, [user])

    // If no university set up yet, show setup interface directly
    if (!myUniversity) {
      return (
        <div className="pt-24 pb-16">
          <div className="container-page">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-heading font-bold text-charcoal mb-4">{t('profile.university_setup_title')}</h1>
              <p className="text-xl text-charcoal/70 mb-2">
                {t('profile.university_setup_subtitle')}
              </p>
              <p className="text-lg text-charcoal/60">
                {t('profile.university_setup_desc')}
              </p>
            </div>
            {/* Show the edit form directly for initial setup */}
            <UniversityProfileEdit />
          </div>
        </div>
      )
    }

    // Render public profile view with tabs when university is set up
    return (
      <div className="pt-20">
        {/* Tab Navigation */}
        <div className="border-b border-black/10 bg-white sticky top-20 z-40 shadow-sm">
          <div className="container-page">
            <div className="flex gap-8">
              <button
                onClick={() => setUniTab('profile')}
                className={`py-4 px-2 font-bold text-lg border-b-2 transition-colors ${
                  uniTab === 'profile'
                    ? 'border-olive text-olive'
                    : 'border-transparent text-charcoal/60 hover:text-charcoal'
                }`}
              >
                {t('profile.profile')}
              </button>
              <button
                onClick={() => setUniTab('settings')}
                className={`py-4 px-2 font-bold text-lg border-b-2 transition-colors ${
                  uniTab === 'settings'
                    ? 'border-olive text-olive'
                    : 'border-transparent text-charcoal/60 hover:text-charcoal'
                }`}
              >
                {t('profile.tab_edit')}
              </button>
            </div>
          </div>
        </div>

        {uniTab === 'profile' ? (
          // Show public profile view - how students see it
          <div className="pt-0">
            <div className="container-page py-4 bg-olive-50/30 border-b border-olive-200">
              <p className="text-center text-charcoal/70">
                <span className="font-bold text-olive">{t('profile.profile_view_label')}</span> {t('profile.profile_view_desc')}
              </p>
            </div>
            <UniversityProfileView university={myUniversity} showEditButton={true} />
          </div>
        ) : (
          // Show settings/editor
          <UniversityProfileEdit />
        )}
      </div>
    )
  }

  // Student profile (existing code)
  const [activeTab, setActiveTab] = useState<'overview' | 'edit' | 'favorites' | 'reviews' | 'settings'>('overview')
  const [isEditing, setIsEditing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [universities, setUniversities] = useState<University[]>([])

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    bio: user?.bio || '',
    gpa: user?.gpa?.toString() || '',
    dateOfBirth: user?.dateOfBirth || '',
    currentUniversity: user?.currentUniversity || '',
    graduationYear: user?.graduationYear?.toString() || '',
    major: user?.major || '',
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        bio: user.bio || '',
        gpa: user.gpa?.toString() || '',
        dateOfBirth: user.dateOfBirth || '',
        currentUniversity: user.currentUniversity || '',
        graduationYear: user.graduationYear?.toString() || '',
        major: user.major || '',
      })
    }
  }, [user])

  useEffect(() => {
    // Load universities for favorites
    fetch('/data/universities.json')
      .then(res => res.json())
      .then(data => setUniversities(data))
      .catch(() => {})
  }, [])

  const favorites = JSON.parse(localStorage.getItem('unichoice_favorites') || '[]')
  const favoriteUniversities = universities.filter(u => favorites.includes(u.id))
  const reviews = JSON.parse(localStorage.getItem('unichoice_reviews') || '[]').filter((r: any) => r.userId === user.id)

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        updateUser({ profilePicture: base64String })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    const updates = {
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      bio: formData.bio,
      gpa: formData.gpa ? parseFloat(formData.gpa) : null,
      dateOfBirth: formData.dateOfBirth,
      currentUniversity: formData.currentUniversity,
      graduationYear: formData.graduationYear ? parseInt(formData.graduationYear) : undefined,
      major: formData.major,
    }
    await updateUser(updates)
    setIsEditing(false)
    setActiveTab('overview')
  }

  const handleLogout = () => {
    navigate('/')
    setTimeout(() => logout(), 100)
  }

  const profilePicture = user.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&size=200&background=6B7B4E&color=fff&bold=true`

  return (
    <div className="pt-20 pb-16 min-h-screen bg-offwhite">
      {/* Hero Section */}
      <ScrollReveal>
        <section className="relative py-16 bg-gradient-to-br from-olive/30 via-white to-terracotta/30 mb-12 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <img 
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=800&fit=crop"
              alt={t('profile.profile')}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container-page relative z-10">
            <div className="max-w-6xl mx-auto">
              <motion.div
                className="flex flex-col md:flex-row items-center md:items-start gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Profile Picture */}
                <div className="relative group">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                    <img 
                      src={profilePicture}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 w-10 h-10 bg-olive text-white rounded-full flex items-center justify-center shadow-lg hover:bg-olive/90 transition-all group-hover:scale-110"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className="hidden"
                  />
                </div>

                {/* User Info */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-4xl md:text-5xl font-heading font-bold text-charcoal mb-2">
                    {user.name}
                  </h1>
                  <p className="text-lg text-charcoal/70 mb-3">{user.email}</p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                    <span className="px-4 py-1.5 bg-olive/10 text-olive rounded-full text-sm font-medium capitalize">
                      {user.role}
                    </span>
                    {user.gpa && (
                      <span className="px-4 py-1.5 bg-terracotta/10 text-terracotta rounded-full text-sm font-medium">
                        {t('profile.gpa')}: {user.gpa.toFixed(2)}
                      </span>
                    )}
                    {user.major && (
                      <span className="px-4 py-1.5 bg-sand text-charcoal rounded-full text-sm font-medium">
                        {user.major}
                      </span>
                    )}
                  </div>
                  {user.bio && (
                    <p className="text-charcoal/80 leading-relaxed max-w-2xl">{user.bio}</p>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <div className="container-page">
        <div className="max-w-6xl mx-auto">
          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-soft mb-8 overflow-x-auto">
            <div className="flex gap-8 px-4 border-b border-black/10">
              {(['overview', 'edit', 'favorites', 'reviews', 'settings'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab)
                    setIsEditing(tab === 'edit')
                  }}
                  className={`py-4 px-2 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab
                      ? 'border-olive text-olive'
                      : 'border-transparent text-charcoal/60 hover:text-charcoal'
                  }`}
                >
                  {t(`profile.tab_${tab}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <ScrollReveal>
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Personal Information */}
                  <div className="ui-card p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-heading font-bold text-charcoal">{t('profile.personal_information')}</h2>
                      <button
                        onClick={() => setActiveTab('edit')}
                        className="px-4 py-2 rounded-lg bg-olive/10 text-olive font-medium hover:bg-olive/20 transition-all text-sm"
                      >
                        {t('profile.edit_profile')}
                      </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm text-charcoal/60 mb-1 block">{t('profile.full_name')}</label>
                        <p className="text-lg font-medium text-charcoal">{user.name}</p>
                      </div>
                      <div>
                        <label className="text-sm text-charcoal/60 mb-1 block">{t('profile.email')}</label>
                        <p className="text-lg font-medium text-charcoal">{user.email}</p>
                      </div>
                      {user.phone && (
                        <div>
                          <label className="text-sm text-charcoal/60 mb-1 block">{t('profile.phone')}</label>
                          <p className="text-lg font-medium text-charcoal">{user.phone}</p>
                        </div>
                      )}
                      {user.dateOfBirth && (
                        <div>
                          <label className="text-sm text-charcoal/60 mb-1 block">{t('profile.date_of_birth')}</label>
                          <p className="text-lg font-medium text-charcoal">
                            {new Date(user.dateOfBirth).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                      {user.address && (
                        <div className="md:col-span-2">
                          <label className="text-sm text-charcoal/60 mb-1 block">{t('profile.address')}</label>
                          <p className="text-lg font-medium text-charcoal">{user.address}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Academic Information */}
                  {user.role === 'student' && (
                    <div className="ui-card p-8">
                      <h2 className="text-2xl font-heading font-bold text-charcoal mb-6">{t('profile.academic_information')}</h2>
                      <div className="grid md:grid-cols-2 gap-6">
                        {user.gpa && (
                          <div>
                            <label className="text-sm text-charcoal/60 mb-1 block">{t('profile.gpa')}</label>
                            <div className="flex items-center gap-2">
                              <span className="text-3xl font-heading font-bold text-olive">{user.gpa.toFixed(2)}</span>
                              <span className="text-charcoal/60">/ 4.0</span>
                            </div>
                          </div>
                        )}
                        {user.currentUniversity && (
                          <div>
                            <label className="text-sm text-charcoal/60 mb-1 block">{t('profile.university')}</label>
                            <p className="text-lg font-medium text-charcoal">{user.currentUniversity}</p>
                          </div>
                        )}
                        {user.major && (
                          <div>
                            <label className="text-sm text-charcoal/60 mb-1 block">{t('profile.major')}</label>
                            <p className="text-lg font-medium text-charcoal">{user.major}</p>
                          </div>
                        )}
                        {user.graduationYear && (
                          <div>
                            <label className="text-sm text-charcoal/60 mb-1 block">{t('profile.expected_graduation')}</label>
                            <p className="text-lg font-medium text-charcoal">{user.graduationYear}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Bio */}
                  {user.bio && (
                    <div className="ui-card p-8">
                      <h2 className="text-2xl font-heading font-bold text-charcoal mb-4">{t('profile.about_me')}</h2>
                      <p className="text-charcoal/80 leading-relaxed">{user.bio}</p>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Activity Summary */}
                  <div className="ui-card p-6">
                    <h3 className="text-xl font-heading font-bold text-charcoal mb-4">{t('profile.activity_summary')}</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-charcoal/70">{t('profile.favorite_universities')}</span>
                        <span className="text-2xl font-heading font-bold text-olive">{favorites.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-charcoal/70">{t('profile.reviews_written')}</span>
                        <span className="text-2xl font-heading font-bold text-olive">{reviews.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-charcoal/70">{t('profile.member_since')}</span>
                        <span className="text-sm font-medium text-charcoal">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="ui-card p-6">
                    <h3 className="text-xl font-heading font-bold text-charcoal mb-4">{t('profile.quick_actions')}</h3>
                    <div className="space-y-2">
                      <Link
                        to="/universities"
                        className="block px-4 py-2 rounded-lg bg-olive/10 text-olive font-medium hover:bg-olive/20 transition-all text-sm text-center"
                      >
                        {t('profile.explore_universities')}
                      </Link>
                      <button
                        onClick={() => setActiveTab('edit')}
                        className="w-full px-4 py-2 rounded-lg bg-sand text-charcoal font-medium hover:bg-sand/80 transition-all text-sm"
                      >
                        {t('profile.edit_profile')}
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 rounded-lg bg-red-500/10 text-red-600 font-medium hover:bg-red-500/20 transition-all text-sm"
                      >
                        {t('nav.logout')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Edit Tab - Same as before */}
          {activeTab === 'edit' && (
            <ScrollReveal>
              <div className="ui-card p-8">
                <h2 className="text-3xl font-heading font-bold text-charcoal mb-6">{t('profile.edit_profile')}</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-charcoal mb-2">{t('profile.full_name')} *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-charcoal mb-2">{t('profile.email')} *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                        disabled
                      />
                      <p className="text-xs text-charcoal/60 mt-1">{t('profile.email_cannot_change')}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-charcoal mb-2">{t('profile.phone_number')}</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-charcoal mb-2">{t('profile.date_of_birth')}</label>
                      <input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-charcoal mb-2">{t('profile.address')}</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-charcoal mb-2">{t('profile.gpa')}</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="4"
                        value={formData.gpa}
                        onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-charcoal mb-2">{t('profile.university')}</label>
                      <input
                        type="text"
                        value={formData.currentUniversity}
                        onChange={(e) => setFormData({ ...formData, currentUniversity: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-charcoal mb-2">{t('profile.major')}</label>
                      <input
                        type="text"
                        value={formData.major}
                        onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-charcoal mb-2">{t('profile.graduation_year')}</label>
                      <input
                        type="number"
                        min="2024"
                        max="2050"
                        value={formData.graduationYear}
                        onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-charcoal mb-2">{t('profile.bio')}</label>
                      <textarea
                        rows={4}
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all resize-none"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <motion.button
                      type="submit"
                      className="px-8 py-4 rounded-lg bg-gradient-to-r from-olive to-terracotta text-white font-bold hover:shadow-xl transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {t('profile.save')}
                    </motion.button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false)
                        setActiveTab('overview')
                      }}
                      className="px-8 py-4 rounded-lg bg-charcoal/10 text-charcoal font-bold hover:bg-charcoal/20 transition-all"
                    >
                      {t('common.cancel')}
                    </button>
                  </div>
                </form>
              </div>
            </ScrollReveal>
          )}

          {/* Favorites Tab */}
          {activeTab === 'favorites' && (
            <ScrollReveal>
              <div>
                <h2 className="text-3xl font-heading font-bold text-charcoal mb-6">{t('profile.favorite_universities')}</h2>
                {favoriteUniversities.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteUniversities.map(uni => (
                      <UniversityCard key={uni.id} uni={uni} />
                    ))}
                  </div>
                ) : (
                  <div className="ui-card p-12 text-center">
                    <div className="text-6xl mb-4">⭐</div>
                    <p className="text-xl text-charcoal/70 mb-4">{t('profile.no_favorites_yet')}</p>
                    <p className="text-charcoal/60 mb-6">{t('profile.start_exploring')}</p>
                    <Link
                      to="/universities"
                      className="inline-block px-8 py-4 rounded-lg bg-olive text-white font-bold hover:bg-olive/90 transition-all"
                    >
                      {t('profile.explore_universities')}
                    </Link>
                  </div>
                )}
              </div>
            </ScrollReveal>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <ScrollReveal>
              <div>
                <h2 className="text-3xl font-heading font-bold text-charcoal mb-6">{t('profile.my_reviews')}</h2>
                {reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((review: any, i: number) => {
                      const uni = universities.find(u => u.id === review.uniId)
                      return (
                        <motion.div
                          key={i}
                          className="ui-card p-6"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              {uni ? (
                                <Link to={`/university/${uni.id}`} className="font-bold text-charcoal hover:text-olive transition-colors">
                                  {uni.name}
                                </Link>
                              ) : (
                                <span className="font-bold text-charcoal">{t('profile.university_id')}: {review.uniId}</span>
                              )}
                            </div>
                            <span className="text-olive font-bold text-xl">★ {review.rating}</span>
                          </div>
                          <p className="text-charcoal/80 leading-relaxed mb-2">{review.comment}</p>
                          <p className="text-sm text-charcoal/60">{review.date}</p>
                        </motion.div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="ui-card p-12 text-center">
                    <div className="text-6xl mb-4">✍️</div>
                    <p className="text-xl text-charcoal/70 mb-4">{t('profile.no_reviews_yet')}</p>
                    <p className="text-charcoal/60 mb-6">{t('profile.share_experience')}</p>
                    <Link
                      to="/universities"
                      className="inline-block px-8 py-4 rounded-lg bg-olive text-white font-bold hover:bg-olive/90 transition-all"
                    >
                      {t('profile.browse_universities')}
                    </Link>
                  </div>
                )}
              </div>
            </ScrollReveal>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <ScrollReveal>
              <div className="ui-card p-8">
                <h2 className="text-3xl font-heading font-bold text-charcoal mb-6">{t('profile.settings')}</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-heading font-bold text-charcoal mb-4">{t('profile.account_settings')}</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-offwhite rounded-lg">
                        <div>
                          <p className="font-medium text-charcoal">{t('profile.account_type')}</p>
                          <p className="text-sm text-charcoal/60 capitalize">{user.role}</p>
                        </div>
                        <span className="px-4 py-1 bg-olive/10 text-olive rounded-full text-sm font-medium capitalize">
                          {user.role}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-offwhite rounded-lg">
                        <div>
                          <p className="font-medium text-charcoal">{t('profile.member_since')}</p>
                          <p className="text-sm text-charcoal/60">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-red-600 mb-4">{t('profile.danger_zone')}</h3>
                    <div className="p-6 bg-red-50 border-2 border-red-200 rounded-lg">
                      <p className="font-medium text-red-900 mb-4">{t('profile.delete_account')}</p>
                      <p className="text-sm text-red-700 mb-4">
                        {t('profile.delete_account_warning')}
                      </p>
                      <button
                        onClick={() => {
                          if (confirm(t('profile.delete_account_confirm'))) {
                            handleLogout()
                          }
                        }}
                        className="px-6 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-all"
                      >
                        {t('profile.delete_account')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </div>
  )
}
