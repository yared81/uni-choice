import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import type { University, Review, ReviewReply } from '../types'
import ScrollReveal from './ScrollReveal'
import { translateUniversityName, translateCity, translateCountry, translateProgramName, translateCampusDescription, translateFacultyDescription, translateAdmissionRequirements, translateApplicationDeadline, translateHousingDescription, translateDescription, translateMission, translateVision, translateHistory, translateAboutCity } from '../utils/translateUniversityData'

interface Props {
  university: University
  showEditButton?: boolean
}

export default function UniversityProfileView({ university: uni, showEditButton = false }: Props) {
  const { user } = useAuth()
  const { t } = useTranslation()
  const [reviews, setReviews] = useState<Review[]>([])
  const [activeTab, setActiveTab] = useState<'overview' | 'campuses' | 'faculties' | 'programs' | 'admission' | 'contact' | 'reviews'>('overview')
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  useEffect(() => {
    // Load reviews from localStorage and JSON
    Promise.all([
      fetch('/data/reviews.json').then(res => res.json()).catch(() => []),
      Promise.resolve(JSON.parse(localStorage.getItem('unichoice_reviews') || '[]'))
    ]).then(([jsonReviews, localReviews]) => {
      const allReviews = [...jsonReviews, ...localReviews]
      const uniReviews = allReviews.filter((r: Review) => r.uniId === uni.id)
      setReviews(uniReviews)
    })
  }, [uni.id])

  const handleReplySubmit = (reviewId: string) => {
    if (!replyText.trim() || !user) return

    const newReply: ReviewReply = {
      id: Date.now().toString(),
      reviewId,
      author: user.name,
      comment: replyText,
      date: new Date().toLocaleDateString(),
      isUniversityReply: user.role === 'university'
    }

    // Update review with reply
    const allReviews = JSON.parse(localStorage.getItem('unichoice_reviews') || '[]')
    const reviewIndex = allReviews.findIndex((r: Review) => r.id === reviewId)
    if (reviewIndex !== -1) {
      if (!allReviews[reviewIndex].replies) {
        allReviews[reviewIndex].replies = []
      }
      allReviews[reviewIndex].replies!.push(newReply)
      localStorage.setItem('unichoice_reviews', JSON.stringify(allReviews))
      
      // Update local state
      const updatedReviews = [...reviews]
      const localReviewIndex = updatedReviews.findIndex(r => r.id === reviewId)
      if (localReviewIndex !== -1) {
        if (!updatedReviews[localReviewIndex].replies) {
          updatedReviews[localReviewIndex].replies = []
        }
        updatedReviews[localReviewIndex].replies!.push(newReply)
        setReviews(updatedReviews)
      }
    }

    setReplyText('')
    setReplyingTo(null)
  }

  return (
    <div className="pt-20">
      {/* Hero Section with Parallax */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{ y }}
        >
          {(uni.profilePicture || uni.images?.[0]) ? (
            <img 
              src={uni.profilePicture || uni.images?.[0]} 
              alt={translateUniversityName(uni.name, t)} 
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-olive/30 via-terracotta/30 to-charcoal/20 relative overflow-hidden">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23 11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000' fill-opacity='0.4'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat'
              }}></div>
              {/* Animated shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              {/* Placeholder icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="text-9xl text-white/20"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.3, 0.2]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  🎓
                </motion.div>
              </div>
            </div>
          )}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-transparent" />
        
        <div className="container-page relative z-10 h-full flex items-end pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-white">{translateUniversityName(uni.name, t)}</h1>
              {uni.verified && (
                <span className="px-4 py-2 bg-olive text-white text-sm font-medium rounded-full">
                  ✓ {t('university_profile.verified')}
                </span>
              )}
              {showEditButton && user?.role === 'university' && (
                <Link
                  to="/profile"
                  className="px-4 py-2 bg-white/20 backdrop-blur-md text-white text-sm font-medium rounded-full hover:bg-white/30 transition-all"
                >
                  {t('university_profile.edit_profile')}
                </Link>
              )}
            </div>
            <p className="text-xl md:text-2xl text-white/90 mb-4">
              {translateCity(uni.city, t)}{uni.country ? `, ${translateCountry(uni.country, t)}` : ''}
            </p>
            <div className="flex items-center gap-6 flex-wrap">
              <span className="text-3xl font-bold text-white">★ {uni.rating.toFixed(1)}</span>
              {uni.studentBodySize && (
                <span className="text-white/90 text-lg">
                  {uni.studentBodySize.toLocaleString()} {t('university_profile.students')}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-black/10 bg-white sticky top-20 z-40 shadow-sm">
        <div className="container-page">
          <div className="flex gap-8 overflow-x-auto">
            {(['overview', 'campuses', 'faculties', 'programs', 'admission', 'contact', 'reviews'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 font-bold text-lg border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-olive text-olive'
                    : 'border-transparent text-charcoal/60 hover:text-charcoal'
                }`}
              >
                {t(`university_profile.${tab}`)}
                {tab === 'reviews' && reviews.length > 0 && (
                  <span className="ml-2 text-sm">({reviews.length})</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container-page py-12">
        {activeTab === 'overview' && (
          <ScrollReveal>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-heading font-bold mb-6 text-charcoal">{t('university_profile.about')} {translateUniversityName(uni.name, t)}</h2>
              <p className="text-xl text-charcoal/80 leading-relaxed mb-8">{translateDescription(uni.id, uni.description, t)}</p>

              {/* Profile Picture/Logo */}
              {uni.profilePicture && (
                <div className="mb-12">
                  <img 
                    src={uni.profilePicture} 
                    alt={`${translateUniversityName(uni.name, t)} logo`}
                    className="w-32 h-32 rounded-xl object-cover shadow-lg"
                  />
                </div>
              )}

              {/* Mission, Vision, History */}
              {(uni.mission || uni.vision || uni.history) && (
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  {uni.mission && (
                    <div className="ui-card p-6">
                      <h3 className="text-xl font-heading font-bold text-charcoal mb-3">{t('university_profile.mission')}</h3>
                      <p className="text-charcoal/70 leading-relaxed">{translateMission(uni.id, uni.mission, t)}</p>
                    </div>
                  )}
                  {uni.vision && (
                    <div className="ui-card p-6">
                      <h3 className="text-xl font-heading font-bold text-charcoal mb-3">{t('university_profile.vision')}</h3>
                      <p className="text-charcoal/70 leading-relaxed">{translateVision(uni.id, uni.vision, t)}</p>
                    </div>
                  )}
                  {uni.history && (
                    <div className="ui-card p-6">
                      <h3 className="text-xl font-heading font-bold text-charcoal mb-3">{t('university_profile.history')}</h3>
                      <p className="text-charcoal/70 leading-relaxed text-sm line-clamp-6">{translateHistory(uni.id, uni.history, t)}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Image Gallery - Up to 10 images with placeholders */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                {Array.from({ length: 10 }).map((_, i) => {
                  const hasImage = uni.images && uni.images[i];
                  return (
                    <motion.div
                      key={i}
                      className="relative rounded-lg overflow-hidden shadow-lg group"
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ 
                        delay: i * 0.1,
                        duration: 0.6,
                        type: "spring",
                        stiffness: 100
                      }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      style={{ minHeight: '256px' }}
                    >
                      {hasImage ? (
                        <>
                          <img 
                            src={uni.images[i]} 
                            alt={`${translateUniversityName(uni.name, t)} ${i + 1}`}
                            className="w-full h-64 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            onClick={() => window.open(uni.images![i], '_blank')}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              {t('common.view_full_size', 'Click to view full size')}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-64 bg-gradient-to-br from-olive/20 via-terracotta/20 to-charcoal/10 flex items-center justify-center relative overflow-hidden">
                          {/* Animated background pattern */}
                          <div className="absolute inset-0 opacity-10" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            backgroundRepeat: 'repeat'
                          }}></div>
                          {/* Placeholder content */}
                          <motion.div
                            className="relative z-10 text-center p-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.1 + 0.3 }}
                          >
                            <motion.div
                              className="text-6xl mb-4 text-olive/40"
                              animate={{ 
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0]
                              }}
                              transition={{ 
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              📷
                            </motion.div>
                            <p className="text-charcoal/50 font-medium text-sm">
                              {t('university_profile.image_placeholder', 'Image Placeholder')}
                            </p>
                            <p className="text-charcoal/30 text-xs mt-2">
                              {i + 1}/10
                            </p>
                          </motion.div>
                          {/* Shimmer effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{
                              x: ['-100%', '100%'],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 1,
                              ease: "easeInOut"
                            }}
                          />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Quick Facts */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                  { value: `★ ${uni.rating.toFixed(1)}`, label: t('university_profile.rating', 'Rating') },
                  { value: uni.programs.length.toString(), label: t('university_profile.programs', 'Programs') },
                  uni.studentBodySize ? { value: uni.studentBodySize.toLocaleString(), label: t('university_profile.students', 'Students') } : null,
                  uni.campuses && uni.campuses.length > 0 ? { value: uni.campuses.length.toString(), label: t('university_profile.campuses', 'Campuses') } : null
                ].filter(Boolean).map((fact, i) => (
                  <motion.div
                    key={i}
                    className="ui-card p-6 text-center group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileHover={{ 
                      scale: 1.05,
                      y: -5,
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                    }}
                  >
                    <motion.div 
                      className="text-3xl font-heading font-bold text-olive mb-2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                    >
                      {fact!.value}
                    </motion.div>
                    <div className="text-sm text-charcoal/70 group-hover:text-charcoal transition-colors">{fact!.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* About City */}
              {uni.aboutCity && (
                <ScrollReveal>
                  <div className="ui-card p-8 mb-12">
                    <h3 className="text-2xl font-heading font-bold text-charcoal mb-4">{t('university_profile.about')} {translateCity(uni.city, t)}</h3>
                    <p className="text-charcoal/80 leading-relaxed whitespace-pre-line">{translateAboutCity(uni.id, uni.aboutCity, t)}</p>
                  </div>
                </ScrollReveal>
              )}

              {/* Campus Facilities */}
              {uni.campusFacilities && uni.campusFacilities.length > 0 && (
                <ScrollReveal>
                  <div className="ui-card p-8 mb-12">
                    <h3 className="text-2xl font-heading font-bold text-charcoal mb-6">{t('university_profile.campus_facilities')}</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {uni.campusFacilities.map((facility, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-olive rounded-full"></div>
                          <span className="text-charcoal/80">{facility}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {/* Accreditation */}
              {uni.accreditation && uni.accreditation.length > 0 && (
                <ScrollReveal>
                  <div className="ui-card p-8 mb-12">
                    <h3 className="text-2xl font-heading font-bold text-charcoal mb-6">{t('university_profile.accreditation')}</h3>
                    <div className="flex flex-wrap gap-3">
                      {uni.accreditation.map((acc, i) => (
                        <span key={i} className="px-4 py-2 bg-terracotta/10 text-terracotta rounded-full font-medium">
                          {acc}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {/* Housing */}
              {uni.housing && (
                <ScrollReveal>
                  <div className="ui-card p-8">
                    <h3 className="text-2xl font-heading font-bold text-charcoal mb-4">{t('university_profile.housing')}</h3>
                    <div className="flex items-center gap-3 mb-4">
                      {uni.housing.available ? (
                        <span className="px-4 py-2 bg-olive/10 text-olive rounded-full font-medium">
                          ✓ {t('university_profile.housing_available')}
                        </span>
                      ) : (
                        <span className="px-4 py-2 bg-charcoal/10 text-charcoal rounded-full font-medium">
                          {t('university_profile.housing_not_available')}
                        </span>
                      )}
                    </div>
                    {uni.housing.description && (
                      <p className="text-charcoal/80 leading-relaxed">{translateHousingDescription(uni.id, uni.housing.description, t)}</p>
                    )}
                  </div>
                </ScrollReveal>
              )}
            </div>
          </ScrollReveal>
        )}

        {/* Campuses Tab */}
        {activeTab === 'campuses' && (
          <ScrollReveal>
            <div>
              <h2 className="text-4xl font-heading font-bold mb-6 text-charcoal">{t('university_profile.campus_locations')}</h2>
              {uni.campuses && uni.campuses.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {uni.campuses.map((campus, i) => (
                    <motion.div
                      key={campus.id || i}
                      className="ui-card p-8 hover:shadow-xl transition-all"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {/* Campus Profile Picture */}
                      {campus.profilePicture && (
                        <div className="mb-6">
                          <img 
                            src={campus.profilePicture} 
                            alt={`${campus.name} logo`}
                            className="w-24 h-24 rounded-lg object-cover shadow-md"
                          />
                        </div>
                      )}
                      <h3 className="text-2xl font-heading font-bold text-charcoal mb-4">{campus.name}</h3>
                      <div className="space-y-3 text-charcoal/70 mb-4">
                        <div className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-olive mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <div>
                            <p className="font-medium text-charcoal">{campus.address}</p>
                            <p>{campus.city}</p>
                          </div>
                        </div>
                        {campus.phone && (
                          <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>{campus.phone}</span>
                          </div>
                        )}
                        {campus.email && (
                          <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <a href={`mailto:${campus.email}`} className="text-olive hover:underline">{campus.email}</a>
                          </div>
                        )}
                        {campus.description && (
                          <p className="text-charcoal/70 leading-relaxed mt-4">{translateCampusDescription(uni.id, campus.id || `campus-${i}`, campus.description, t)}</p>
                        )}
                      </div>
                      {/* Campus Images Gallery - Up to 10 images with placeholders */}
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        {Array.from({ length: 4 }).map((_, idx) => {
                          const hasImage = campus.images && campus.images[idx];
                          return (
                            <motion.div
                              key={idx}
                              className="relative rounded-lg overflow-hidden group"
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: idx * 0.1, duration: 0.5 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              {hasImage ? (
                                <>
                                  <img
                                    src={campus.images![idx]}
                                    alt={`${campus.name} ${idx + 1}`}
                                    className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                                    onClick={() => window.open(campus.images![idx], '_blank')}
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </>
                              ) : (
                                <div className="w-full h-32 bg-gradient-to-br from-olive/15 via-terracotta/15 to-charcoal/10 flex items-center justify-center relative overflow-hidden">
                                  <motion.div
                                    className="text-3xl text-olive/30"
                                    animate={{ 
                                      scale: [1, 1.1, 1],
                                      opacity: [0.3, 0.4, 0.3]
                                    }}
                                    transition={{ 
                                      duration: 2,
                                      repeat: Infinity,
                                      ease: "easeInOut"
                                    }}
                                  >
                                    🏛️
                                  </motion.div>
                                  <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                    animate={{
                                      x: ['-100%', '100%'],
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      repeatDelay: 1,
                                      ease: "easeInOut"
                                    }}
                                  />
                                </div>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="ui-card p-12 text-center">
                  <p className="text-charcoal/70 text-lg">{t('university_profile.no_campus_info')}</p>
                </div>
              )}
            </div>
          </ScrollReveal>
        )}

        {/* Faculties Tab */}
        {activeTab === 'faculties' && (
          <ScrollReveal>
            <div>
              <h2 className="text-4xl font-heading font-bold mb-6 text-charcoal">{t('university_profile.faculties_departments')}</h2>
              {uni.faculties && uni.faculties.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {uni.faculties.map((faculty, i) => (
                    <motion.div
                      key={faculty.id || i}
                      className="ui-card p-8 hover:shadow-xl transition-all"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <h3 className="text-2xl font-heading font-bold text-charcoal mb-4">{faculty.name}</h3>
                      {faculty.description && (
                        <p className="text-charcoal/70 leading-relaxed">{translateFacultyDescription(uni.id, faculty.id || `faculty-${i}`, faculty.description, t)}</p>
                      )}
                      {faculty.programs && faculty.programs.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm font-medium text-charcoal/60 mb-2">{t('university_profile.programs')}:</p>
                          <div className="flex flex-wrap gap-2">
                            {faculty.programs.map((prog, idx) => (
                              <span key={idx} className="px-3 py-1 bg-olive/10 text-olive rounded-full text-sm">
                                {prog}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="ui-card p-12 text-center">
                  <p className="text-charcoal/70 text-lg">{t('university_profile.no_faculty_info')}</p>
                </div>
              )}
            </div>
          </ScrollReveal>
        )}

        {/* Programs Tab */}
        {activeTab === 'programs' && (
          <ScrollReveal>
            <div>
              <div className="mb-8">
                <h2 className="text-4xl font-heading font-bold mb-4 text-charcoal">{t('university_profile.academic_programs')}</h2>
                <p className="text-lg text-charcoal/70">
                  {t('university_profile.explore_programs', { count: uni.programs.length, university: translateUniversityName(uni.name, t) })}
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {uni.programs.map((p, i) => (
                  <motion.div
                    key={p.id}
                    className="ui-card p-8 hover:shadow-xl transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <h3 className="text-2xl font-heading font-bold mb-3 text-charcoal">{translateProgramName(p.name, t)}</h3>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="px-4 py-2 bg-olive/10 text-olive rounded-full font-medium">{p.degree}</span>
                      <span className="px-4 py-2 bg-sand text-charcoal rounded-full font-medium">{p.durationYears} {t('university_profile.years')}</span>
                      <span className="px-4 py-2 bg-terracotta/10 text-terracotta rounded-full font-medium">{p.language}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Admission Tab */}
        {activeTab === 'admission' && (
          <ScrollReveal>
            <div className="max-w-4xl">
              <h2 className="text-4xl font-heading font-bold mb-6 text-charcoal">{t('university_profile.admission_information')}</h2>
              
              {uni.admissionRequirements && (
                <div className="ui-card p-8 mb-8">
                  <h3 className="text-2xl font-heading font-bold text-charcoal mb-4">{t('university_profile.admission_requirements')}</h3>
                  <div className="text-charcoal/80 leading-relaxed whitespace-pre-line">{translateAdmissionRequirements(uni.id, uni.admissionRequirements, t)}</div>
                </div>
              )}

              {uni.applicationDeadline && (
                <div className="ui-card p-8 mb-8">
                  <h3 className="text-2xl font-heading font-bold text-charcoal mb-4">{t('university_profile.application_deadline')}</h3>
                  <p className="text-xl text-olive font-medium">{translateApplicationDeadline(uni.id, uni.applicationDeadline, t)}</p>
                </div>
              )}

              {uni.housing && (
                <div className="ui-card p-8">
                  <h3 className="text-2xl font-heading font-bold text-charcoal mb-4">{t('university_profile.housing_information')}</h3>
                  <div className="space-y-4">
                    <div>
                      {uni.housing.available ? (
                        <span className="px-4 py-2 bg-olive/10 text-olive rounded-full font-medium">
                          ✓ {t('university_profile.housing_available')}
                        </span>
                      ) : (
                        <span className="px-4 py-2 bg-charcoal/10 text-charcoal rounded-full font-medium">
                          {t('university_profile.housing_not_available')}
                        </span>
                      )}
                    </div>
                    {uni.housing.description && (
                      <p className="text-charcoal/80 leading-relaxed">{translateHousingDescription(uni.id, uni.housing.description, t)}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <ScrollReveal>
            <div className="max-w-4xl">
              <h2 className="text-4xl font-heading font-bold mb-6 text-charcoal">{t('university_profile.contact_information')}</h2>
              
              {uni.contactInfo && (
                <div className="ui-card p-8 mb-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {uni.contactInfo.email && (
                      <div>
                        <label className="text-sm font-bold text-charcoal/60 mb-2 block">{t('common.email')}</label>
                        <a href={`mailto:${uni.contactInfo.email}`} className="text-olive hover:underline text-lg">
                          {uni.contactInfo.email}
                        </a>
                      </div>
                    )}
                    {uni.contactInfo.phone && (
                      <div>
                        <label className="text-sm font-bold text-charcoal/60 mb-2 block">{t('university_profile.phone')}</label>
                        <a href={`tel:${uni.contactInfo.phone}`} className="text-olive hover:underline text-lg">
                          {uni.contactInfo.phone}
                        </a>
                      </div>
                    )}
                    {uni.contactInfo.website && (
                      <div>
                        <label className="text-sm font-bold text-charcoal/60 mb-2 block">{t('university_profile.website')}</label>
                        <a href={uni.contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-olive hover:underline text-lg">
                          {uni.contactInfo.website}
                        </a>
                      </div>
                    )}
                    {uni.contactInfo.address && (
                      <div className="md:col-span-2">
                        <label className="text-sm font-bold text-charcoal/60 mb-2 block">{t('university_profile.address')}</label>
                        <p className="text-charcoal/80">{uni.contactInfo.address}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {uni.socialMedia && (
                <div className="ui-card p-8">
                  <h3 className="text-2xl font-heading font-bold text-charcoal mb-6">{t('university_profile.social_media')}</h3>
                  <div className="flex flex-wrap gap-4">
                    {uni.socialMedia.facebook && (
                      <a
                        href={uni.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
                      >
                        {t('university_profile.facebook')}
                      </a>
                    )}
                    {uni.socialMedia.twitter && (
                      <a
                        href={uni.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-charcoal transition-all"
                      >
                        {t('university_profile.twitter')}
                      </a>
                    )}
                    {uni.socialMedia.instagram && (
                      <a
                        href={uni.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 transition-all"
                      >
                        {t('university_profile.instagram')}
                      </a>
                    )}
                    {uni.socialMedia.linkedin && (
                      <a
                        href={uni.socialMedia.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition-all"
                      >
                        {t('university_profile.linkedin')}
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        )}

        {/* Reviews Tab with Reply Functionality */}
        {activeTab === 'reviews' && (
          <ScrollReveal>
            <div>
              <div className="mb-8">
                <h2 className="text-4xl font-heading font-bold mb-4 text-charcoal">{t('university_profile.student_reviews')}</h2>
                <p className="text-lg text-charcoal/70">
                  {reviews.length > 0 
                    ? t('university_profile.reviews_description', { count: reviews.length, university: translateUniversityName(uni.name, t) })
                    : t('university_profile.no_reviews_yet')
                  }
                </p>
              </div>
              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review, i) => (
                    <motion.div
                      key={review.id}
                      className="ui-card p-8 hover:shadow-lg transition-all"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <img 
                            src={`https://i.pravatar.cc/100?img=${i + 1}`}
                            alt={review.author}
                            className="w-16 h-16 rounded-full border-4 border-olive/20"
                          />
                          <div>
                            <div className="font-bold text-lg text-charcoal">{review.author}</div>
                            <div className="text-sm text-charcoal/60">{review.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-olive">★ {review.rating}</span>
                          {review.verified && (
                            <span className="px-3 py-1 bg-olive/10 text-olive text-xs rounded-full font-medium">
                              ✓ {t('university_profile.verified_student')}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-charcoal/80 leading-relaxed text-lg mb-4">{review.comment}</p>
                      <div className="flex items-center gap-6 text-sm text-charcoal/60 mb-4">
                        <button className="hover:text-olive transition-colors font-medium">
                          👍 {t('university_profile.helpful')} ({review.helpfulCount})
                        </button>
                        {user?.role === 'university' && (
                          <button 
                            onClick={() => setReplyingTo(replyingTo === review.id ? null : review.id)}
                            className="hover:text-olive transition-colors font-medium"
                          >
                            {replyingTo === review.id ? t('university_profile.cancel_reply') : t('university_profile.reply')}
                          </button>
                        )}
                      </div>

                      {/* Reply Form */}
                      {replyingTo === review.id && user?.role === 'university' && (
                        <div className="mt-4 p-4 bg-olive-50 rounded-lg border border-olive-200">
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2 border border-olive-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 resize-none mb-2"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleReplySubmit(review.id)}
                              disabled={!replyText.trim()}
                              className="px-4 py-2 bg-olive text-white rounded-lg font-medium hover:bg-olive/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {t('university_profile.post_reply')}
                            </button>
                            <button
                              onClick={() => {
                                setReplyText('')
                                setReplyingTo(null)
                              }}
                              className="px-4 py-2 bg-white border border-olive-200 text-olive rounded-lg font-medium hover:bg-olive-50 transition-all"
                            >
                              {t('common.cancel')}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Existing Replies */}
                      {review.replies && review.replies.length > 0 && (
                        <div className="mt-6 space-y-4 pl-8 border-l-2 border-olive-200">
                          {review.replies.map((reply) => (
                            <div key={reply.id} className="bg-olive-50/50 p-4 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-bold text-charcoal">{reply.author}</span>
                                {reply.isUniversityReply && (
                                  <span className="px-2 py-0.5 bg-olive text-white text-xs rounded-full font-medium">
                                    {t('university_profile.university')}
                                  </span>
                                )}
                                <span className="text-xs text-charcoal/60">{reply.date}</span>
                              </div>
                              <p className="text-charcoal/80 leading-relaxed">{reply.comment}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="ui-card p-16 text-center">
                  <img 
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=400&fit=crop"
                    alt={t('university_profile.no_reviews_image_alt')}
                    className="w-32 h-32 rounded-full mx-auto mb-6 opacity-50"
                  />
                  <p className="text-xl text-charcoal/70 mb-4">{t('university_profile.no_reviews_yet')}</p>
                  <p className="text-charcoal/60 mb-6">{t('university_profile.be_first_review')}</p>
                  <button className="px-8 py-3 rounded-lg bg-olive text-white font-bold hover:bg-olive/90 transition-all">
                    {t('university_profile.write_review')}
                  </button>
                </div>
              )}
            </div>
          </ScrollReveal>
        )}
      </section>

      {/* CTA Section */}
      <ScrollReveal>
        <section className="my-20">
          <div className="container-page">
            <div className="ui-card p-12 bg-gradient-to-r from-olive to-terracotta text-white text-center">
              <h2 className="text-4xl font-heading font-bold mb-6">{t('university_profile.ready_to_apply')}</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                {t('university_profile.apply_description', { university: translateUniversityName(uni.name, t) })}
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                {uni.contactInfo?.website && (
                  <a
                    href={uni.contactInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 rounded-lg bg-white text-olive font-bold hover:bg-offwhite transition-all duration-250 hover:scale-105 shadow-xl"
                  >
                    {t('university_profile.visit_official_website')}
                  </a>
                )}
                <Link
                  to="/compare"
                  className="px-8 py-4 rounded-lg bg-white/20 text-white font-bold hover:bg-white/30 transition-all duration-250 hover:scale-105 border-2 border-white"
                >
                  {t('university_profile.compare_universities')}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

