import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import type { University } from '../types'
import { translateUniversityName, translateCity, translateCountry, translateProgramName } from '../utils/translateUniversityData'

interface Props {
  uni: University
  index?: number
}

export default function UniversityCard({ uni, index = 0 }: Props) {
  const { t } = useTranslation()
  const [isFavorited, setIsFavorited] = useState(() => {
    const favs = JSON.parse(localStorage.getItem('unichoice_favorites') || '[]')
    return favs.includes(uni.id)
  })

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const favs = JSON.parse(localStorage.getItem('unichoice_favorites') || '[]')
    if (isFavorited) {
      const updated = favs.filter((id: string) => id !== uni.id)
      localStorage.setItem('unichoice_favorites', JSON.stringify(updated))
      setIsFavorited(false)
    } else {
      favs.push(uni.id)
      localStorage.setItem('unichoice_favorites', JSON.stringify(favs))
      setIsFavorited(true)
    }
  }

  const addToCompare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const compare = JSON.parse(localStorage.getItem('unichoice_compare') || '[]')
    if (!compare.includes(uni.id) && compare.length < 3) {
      compare.push(uni.id)
      localStorage.setItem('unichoice_compare', JSON.stringify(compare))
      // Show subtle toast notification
      const toast = document.createElement('div')
      toast.className = 'fixed bottom-4 right-4 px-4 py-3 bg-olive-600 text-white rounded-lg shadow-large z-50 animate-fade-in-up'
      toast.textContent = t('university_card.added_toast')
      document.body.appendChild(toast)
      setTimeout(() => {
        toast.style.opacity = '0'
        toast.style.transform = 'translateY(-20px)'
        setTimeout(() => document.body.removeChild(toast), 300)
      }, 2000)
    } else if (compare.length >= 3) {
      alert(t('university_card.max_compare_alert'))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
    >
      <Link 
        to={`/university/${uni.id}`} 
        className="ui-card overflow-hidden block hover:shadow-large transition-all duration-300"
      >
        {/* Image Container with Gradient Overlay */}
        <div className="aspect-[16/9] bg-gradient-to-br from-olive-100 to-terracotta-100 relative overflow-hidden">
          {uni.images?.[0] && (
            <motion.img 
              src={uni.images[0]} 
              alt={uni.name} 
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          )}
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex gap-2">
            <motion.button
              onClick={toggleFavorite}
              whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0] }}
              whileTap={{ scale: 0.9 }}
              className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all shadow-lg ${
                isFavorited 
                  ? 'bg-gradient-to-br from-red-500 to-pink-500 text-white' 
                  : 'bg-white/90 text-charcoal hover:text-red-500'
              }`}
            >
              <svg className="w-5 h-5" fill={isFavorited ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </motion.button>
          </div>

          {/* Verified Badge */}
          {uni.verified && (
            <motion.div 
              className="absolute top-3 left-3 px-3 py-1.5 bg-gradient-to-r from-olive-500 to-olive-600 backdrop-blur-md text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {t('university_card.verified')}
            </motion.div>
          )}

          {/* Rating Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="absolute bottom-3 left-3 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-full shadow-lg flex items-center gap-1.5"
          >
            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-bold text-charcoal">{uni.rating.toFixed(1)}</span>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="text-xl font-heading font-bold text-charcoal group-hover:text-olive-600 transition-colors duration-300 line-clamp-2">
              {translateUniversityName(uni.name, t)}
            </h3>
          </div>
          
          <p className="text-sm text-charcoal/70 mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-olive-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-medium">{translateCity(uni.city, t)}{uni.country && `, ${translateCountry(uni.country, t)}`}</span>
          </p>

          {/* Programs Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {uni.programs.slice(0, 2).map((p, idx) => (
              <motion.span
                key={p.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-olive-50 to-terracotta-50 text-olive-700 font-medium border border-olive-200/50"
              >
                {translateProgramName(p.name, t)}
              </motion.span>
            ))}
            {uni.programs.length > 2 && (
              <span className="text-xs px-3 py-1.5 rounded-full bg-sand text-charcoal font-medium border border-charcoal/10">
                +{uni.programs.length - 2} {t('university_card.more_programs')}
              </span>
            )}
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-4 mb-4 text-xs text-charcoal/60">
            {uni.studentBodySize && (
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                {uni.studentBodySize.toLocaleString()}
              </span>
            )}
            {uni.campuses && uni.campuses.length > 0 && (
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {uni.campuses.length} {uni.campuses.length === 1 ? t('university_card.campus') : t('university_card.campuses')}
              </span>
            )}
          </div>

          {/* Action Button */}
          <motion.button
            onClick={addToCompare}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-olive-50 to-terracotta-50 border-2 border-olive-200/50 text-olive-700 text-sm font-bold hover:from-olive-100 hover:to-terracotta-100 hover:border-olive-300 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            {t('university_card.add_to_compare')}
          </motion.button>
        </div>
      </Link>
    </motion.div>
  )
}
