import { Link } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import type { University } from '../types'

interface Props {
  uni: University
}

export default function UniversityCard({ uni }: Props) {
  const [isFavorited, setIsFavorited] = useState(() => {
    const favs = JSON.parse(localStorage.getItem('unimerk_favorites') || '[]')
    return favs.includes(uni.id)
  })

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const favs = JSON.parse(localStorage.getItem('unimerk_favorites') || '[]')
    if (isFavorited) {
      const updated = favs.filter((id: string) => id !== uni.id)
      localStorage.setItem('unimerk_favorites', JSON.stringify(updated))
      setIsFavorited(false)
    } else {
      favs.push(uni.id)
      localStorage.setItem('unimerk_favorites', JSON.stringify(favs))
      setIsFavorited(true)
    }
  }

  const addToCompare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const compare = JSON.parse(localStorage.getItem('unimerk_compare') || '[]')
    if (!compare.includes(uni.id) && compare.length < 3) {
      compare.push(uni.id)
      localStorage.setItem('unimerk_compare', JSON.stringify(compare))
      alert('Added to comparison!')
    } else if (compare.length >= 3) {
      alert('Maximum 3 universities can be compared at once.')
    }
  }

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Link 
        to={`/university/${uni.id}`} 
        className="ui-card overflow-hidden block hover:shadow-2xl transition-all duration-300 group"
      >
        <div className="aspect-[16/9] bg-sand/30 relative overflow-hidden">
          {uni.images?.[0] && (
            <motion.img 
              src={uni.images[0]} 
              alt={uni.name} 
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-3 right-3 flex gap-2">
            <motion.button
              onClick={toggleFavorite}
              className={`w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all shadow-lg ${
                isFavorited ? 'text-red-500' : 'text-charcoal/50'
              }`}
              whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0] }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill={isFavorited ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </motion.button>
          </div>
          {uni.verified && (
            <motion.div 
              className="absolute top-3 left-3 px-3 py-1 bg-olive/90 backdrop-blur-sm text-white text-xs font-bold rounded-full shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              ✓ Verified
            </motion.div>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="text-xl font-heading font-bold text-charcoal group-hover:text-olive transition-colors">
              {uni.name}
            </h3>
            <span className="text-lg font-bold text-olive whitespace-nowrap flex items-center gap-1">
              ★ {uni.rating.toFixed(1)}
            </span>
          </div>
          <p className="text-sm text-charcoal/70 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {uni.city}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {uni.programs.slice(0, 2).map(p => (
              <span key={p.id} className="text-xs px-3 py-1.5 rounded-full bg-olive/10 text-olive font-medium">
                {p.name}
              </span>
            ))}
            {uni.programs.length > 2 && (
              <span className="text-xs px-3 py-1.5 rounded-full bg-sand text-charcoal font-medium">
                +{uni.programs.length - 2} more
              </span>
            )}
          </div>
          <motion.button
            onClick={addToCompare}
            className="w-full px-4 py-3 rounded-lg bg-offwhite border-2 border-charcoal/10 text-charcoal text-sm font-bold hover:bg-olive hover:text-white hover:border-olive transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Add to Compare
          </motion.button>
        </div>
      </Link>
    </motion.div>
  )
}
