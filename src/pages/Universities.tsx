import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { University } from '../types'
import UniversityCard from '../components/UniversityCard'
import ScrollReveal from '../components/ScrollReveal'

export default function Universities() {
  const [searchParams] = useSearchParams()
  const [universities, setUniversities] = useState<University[]>([])
  const [filtered, setFiltered] = useState<University[]>([])
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    // Load from both JSON file and localStorage (user-created universities)
    Promise.all([
      fetch('/data/universities.json').then(res => res.json()).catch(() => []),
      Promise.resolve(JSON.parse(localStorage.getItem('unimerk_all_universities') || '[]'))
    ]).then(([jsonUnis, localUnis]) => {
      // Merge and deduplicate by ID
      const allUnis = [...jsonUnis, ...localUnis]
      const uniqueUnis = Array.from(
        new Map(allUnis.map(u => [u.id, u])).values()
      )
      setUniversities(uniqueUnis)
      setFiltered(uniqueUnis)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setFiltered(universities)
      return
    }
    const q = query.toLowerCase()
    const results = universities.filter(u =>
      [u.name, u.city, u.description, ...u.programs.map(p => p.name)]
        .join(' ')
        .toLowerCase()
        .includes(q)
    )
    setFiltered(results)
  }, [query, universities])

  return (
    <div className="pt-24 pb-16 min-h-screen">
      {/* Hero Section */}
      <ScrollReveal>
        <section className="relative py-24 bg-gradient-to-br from-olive/10 via-white to-terracotta/10 mb-16 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <img 
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=800&fit=crop"
              alt="University campus"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-olive/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-terracotta/20 to-transparent" />

          <div className="container-page relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1 
                className="text-5xl md:text-7xl font-heading font-bold text-charcoal mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Explore Universities
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-charcoal/70 mb-12 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Discover top institutions across Ethiopia and find the perfect fit for your academic goals.
              </motion.p>
              
              <motion.div
                className="ui-card p-2 flex items-center gap-2 shadow-2xl border-2 border-olive/20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by university name, city, program, or keyword..."
                  className="flex-1 bg-transparent outline-none text-base px-4 py-4 placeholder:text-charcoal/40"
                />
                <motion.button 
                  className="px-8 py-4 rounded-md bg-gradient-to-r from-olive to-terracotta text-white font-bold hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Search
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Stats Bar */}
      <ScrollReveal>
        <section className="container-page mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Universities', value: universities.length },
              { label: 'Cities', value: new Set(universities.map(u => u.city)).size },
              { label: 'Programs', value: universities.reduce((acc, u) => acc + u.programs.length, 0) },
              { label: 'Avg Rating', value: universities.length > 0 ? (universities.reduce((acc, u) => acc + u.rating, 0) / universities.length).toFixed(1) : '0.0' }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="ui-card p-6 text-center hover:shadow-xl transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-3xl font-heading font-bold text-olive mb-2">{stat.value}</div>
                <div className="text-sm text-charcoal/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Results */}
      <section className="container-page">
        {loading ? (
          <div className="text-center py-20">
            <motion.div
              className="inline-block w-16 h-16 border-4 border-olive border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : (
          <>
            <div className="mb-8 flex items-center justify-between">
              <motion.p 
                className="text-lg text-charcoal/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Found <span className="font-bold text-olive">{filtered.length}</span> {filtered.length === 1 ? 'university' : 'universities'}
              </motion.p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((uni, i) => (
                <motion.div
                  key={uni.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <UniversityCard uni={uni} />
                </motion.div>
              ))}
            </div>
            {filtered.length === 0 && (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="max-w-md mx-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop"
                    alt="No results"
                    className="w-full h-64 object-cover rounded-lg mb-6 opacity-50"
                  />
                  <p className="text-charcoal/60 text-xl mb-4">No universities found</p>
                  <p className="text-charcoal/50 mb-6">Try a different search term or browse all universities</p>
                  <Link
                    to="/universities"
                    className="inline-block px-6 py-3 rounded-lg bg-olive text-white font-medium hover:bg-olive/90 transition-all"
                  >
                    View All Universities
                  </Link>
                </div>
              </motion.div>
            )}
          </>
        )}
      </section>

      {/* Call to Action */}
      {!loading && filtered.length > 0 && (
        <ScrollReveal>
          <section className="mt-24 py-20 bg-gradient-to-r from-olive/10 to-terracotta/10">
            <div className="container-page text-center">
              <h2 className="text-4xl font-heading font-bold text-charcoal mb-4">
                Need Help Deciding?
              </h2>
              <p className="text-xl text-charcoal/70 mb-8 max-w-2xl mx-auto">
                Use our comparison tool to see universities side by side and make an informed choice.
              </p>
              <Link
                to="/compare"
                className="inline-block px-8 py-4 rounded-lg bg-olive text-white font-bold hover:bg-olive/90 transition-all duration-250 hover:scale-105 shadow-lg"
              >
                Compare Universities
              </Link>
            </div>
          </section>
        </ScrollReveal>
      )}
    </div>
  )
}
