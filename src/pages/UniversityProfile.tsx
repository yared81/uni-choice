import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { University, Review } from '../types'
import ScrollReveal from '../components/ScrollReveal'

export default function UniversityProfile() {
  const { id } = useParams<{ id: string }>()
  const [uni, setUni] = useState<University | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [activeTab, setActiveTab] = useState<'overview' | 'campuses' | 'faculties' | 'programs' | 'admission' | 'contact' | 'reviews'>('overview')
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  useEffect(() => {
    // Load from both JSON file and localStorage
    Promise.all([
      fetch('/data/universities.json').then(res => res.json()).catch(() => []),
      Promise.resolve(JSON.parse(localStorage.getItem('unimerk_all_universities') || '[]'))
    ]).then(([jsonUnis, localUnis]) => {
      const allUnis = [...jsonUnis, ...localUnis]
      const found = allUnis.find((u: University) => u.id === id)
      setUni(found || null)
    })
    
    fetch('/data/reviews.json')
      .then(res => res.json())
      .then(data => {
        const uniReviews = data.filter((r: Review) => r.uniId === id)
        setReviews(uniReviews)
      })
  }, [id])

  if (!uni) {
    return (
      <div className="pt-24 pb-16">
        <section className="container-page">
          <div className="text-center py-20">
            <h1 className="text-3xl font-heading mb-4">University not found</h1>
            <Link to="/universities" className="text-olive hover:underline">Browse all universities →</Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="pt-20">
      {/* Hero Section with Parallax */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{ y }}
        >
          {uni.images[0] ? (
            <img 
              src={uni.images[0]} 
              alt={uni.name} 
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-olive/40 to-terracotta/40" />
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
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-white">{uni.name}</h1>
              {uni.verified && (
                <span className="px-4 py-2 bg-olive text-white text-sm font-medium rounded-full">
                  ✓ Verified
                </span>
              )}
            </div>
            <p className="text-xl md:text-2xl text-white/90 mb-4">
              {uni.city}{uni.country ? `, ${uni.country}` : ''}
            </p>
            <div className="flex items-center gap-6 flex-wrap">
              <span className="text-3xl font-bold text-white">★ {uni.rating.toFixed(1)}</span>
              {uni.studentBodySize && (
                <span className="text-white/90 text-lg">
                  {uni.studentBodySize.toLocaleString()} Students
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
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
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
              <h2 className="text-4xl font-heading font-bold mb-6 text-charcoal">About {uni.name}</h2>
              <p className="text-xl text-charcoal/80 leading-relaxed mb-8">{uni.description}</p>

              {/* Mission, Vision, History */}
              {(uni.mission || uni.vision || uni.history) && (
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  {uni.mission && (
                    <div className="ui-card p-6">
                      <h3 className="text-xl font-heading font-bold text-charcoal mb-3">Mission</h3>
                      <p className="text-charcoal/70 leading-relaxed">{uni.mission}</p>
                    </div>
                  )}
                  {uni.vision && (
                    <div className="ui-card p-6">
                      <h3 className="text-xl font-heading font-bold text-charcoal mb-3">Vision</h3>
                      <p className="text-charcoal/70 leading-relaxed">{uni.vision}</p>
                    </div>
                  )}
                  {uni.history && (
                    <div className="ui-card p-6">
                      <h3 className="text-xl font-heading font-bold text-charcoal mb-3">History</h3>
                      <p className="text-charcoal/70 leading-relaxed text-sm line-clamp-6">{uni.history}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Image Gallery */}
              {uni.images.length > 1 && (
                <div className="grid md:grid-cols-3 gap-4 mb-12">
                  {uni.images.slice(1, 4).map((img, i) => (
                    <motion.div
                      key={i}
                      className="rounded-lg overflow-hidden shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <img 
                        src={img} 
                        alt={`${uni.name} ${i + 2}`}
                        className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Quick Facts */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="ui-card p-6 text-center hover:shadow-xl transition-all">
                  <div className="text-3xl font-heading font-bold text-olive mb-2">★ {uni.rating.toFixed(1)}</div>
                  <div className="text-sm text-charcoal/70">Rating</div>
                </div>
                <div className="ui-card p-6 text-center hover:shadow-xl transition-all">
                  <div className="text-3xl font-heading font-bold text-olive mb-2">{uni.programs.length}</div>
                  <div className="text-sm text-charcoal/70">Programs</div>
                </div>
                {uni.studentBodySize && (
                  <div className="ui-card p-6 text-center hover:shadow-xl transition-all">
                    <div className="text-3xl font-heading font-bold text-olive mb-2">{uni.studentBodySize.toLocaleString()}</div>
                    <div className="text-sm text-charcoal/70">Students</div>
                  </div>
                )}
                {uni.campuses && uni.campuses.length > 0 && (
                  <div className="ui-card p-6 text-center hover:shadow-xl transition-all">
                    <div className="text-3xl font-heading font-bold text-olive mb-2">{uni.campuses.length}</div>
                    <div className="text-sm text-charcoal/70">Campuses</div>
                  </div>
                )}
              </div>

              {/* About City */}
              {uni.aboutCity && (
                <ScrollReveal>
                  <div className="ui-card p-8 mb-12">
                    <h3 className="text-2xl font-heading font-bold text-charcoal mb-4">About {uni.city}</h3>
                    <p className="text-charcoal/80 leading-relaxed whitespace-pre-line">{uni.aboutCity}</p>
                  </div>
                </ScrollReveal>
              )}

              {/* Campus Facilities */}
              {uni.campusFacilities && uni.campusFacilities.length > 0 && (
                <ScrollReveal>
                  <div className="ui-card p-8 mb-12">
                    <h3 className="text-2xl font-heading font-bold text-charcoal mb-6">Campus Facilities</h3>
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
                    <h3 className="text-2xl font-heading font-bold text-charcoal mb-6">Accreditation</h3>
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
                    <h3 className="text-2xl font-heading font-bold text-charcoal mb-4">Housing</h3>
                    <div className="flex items-center gap-3 mb-4">
                      {uni.housing.available ? (
                        <span className="px-4 py-2 bg-olive/10 text-olive rounded-full font-medium">
                          ✓ Housing Available
                        </span>
                      ) : (
                        <span className="px-4 py-2 bg-charcoal/10 text-charcoal rounded-full font-medium">
                          Housing Not Available
                        </span>
                      )}
                    </div>
                    {uni.housing.description && (
                      <p className="text-charcoal/80 leading-relaxed">{uni.housing.description}</p>
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
              <h2 className="text-4xl font-heading font-bold mb-6 text-charcoal">Campus Locations</h2>
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
                      <h3 className="text-2xl font-heading font-bold text-charcoal mb-4">{campus.name}</h3>
                      <div className="space-y-3 text-charcoal/70">
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
                          <p className="text-charcoal/70 leading-relaxed mt-4">{campus.description}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="ui-card p-12 text-center">
                  <p className="text-charcoal/70 text-lg">No campus information available.</p>
                </div>
              )}
            </div>
          </ScrollReveal>
        )}

        {/* Faculties Tab */}
        {activeTab === 'faculties' && (
          <ScrollReveal>
            <div>
              <h2 className="text-4xl font-heading font-bold mb-6 text-charcoal">Faculties & Departments</h2>
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
                        <p className="text-charcoal/70 leading-relaxed">{faculty.description}</p>
                      )}
                      {faculty.programs && faculty.programs.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm font-medium text-charcoal/60 mb-2">Programs:</p>
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
                  <p className="text-charcoal/70 text-lg">No faculty information available.</p>
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
                <h2 className="text-4xl font-heading font-bold mb-4 text-charcoal">Academic Programs</h2>
                <p className="text-lg text-charcoal/70">
                  Explore {uni.programs.length} programs offered at {uni.name}
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
                    <h3 className="text-2xl font-heading font-bold mb-3 text-charcoal">{p.name}</h3>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <span className="px-4 py-2 bg-olive/10 text-olive rounded-full font-medium">{p.degree}</span>
                      <span className="px-4 py-2 bg-sand text-charcoal rounded-full font-medium">{p.durationYears} years</span>
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
              <h2 className="text-4xl font-heading font-bold mb-6 text-charcoal">Admission Information</h2>
              
              {uni.admissionRequirements && (
                <div className="ui-card p-8 mb-8">
                  <h3 className="text-2xl font-heading font-bold text-charcoal mb-4">Admission Requirements</h3>
                  <div className="text-charcoal/80 leading-relaxed whitespace-pre-line">{uni.admissionRequirements}</div>
                </div>
              )}

              {uni.applicationDeadline && (
                <div className="ui-card p-8 mb-8">
                  <h3 className="text-2xl font-heading font-bold text-charcoal mb-4">Application Deadline</h3>
                  <p className="text-xl text-olive font-medium">{uni.applicationDeadline}</p>
                </div>
              )}

              {uni.housing && (
                <div className="ui-card p-8">
                  <h3 className="text-2xl font-heading font-bold text-charcoal mb-4">Housing Information</h3>
                  <div className="space-y-4">
                    <div>
                      {uni.housing.available ? (
                        <span className="px-4 py-2 bg-olive/10 text-olive rounded-full font-medium">
                          ✓ Housing Available
                        </span>
                      ) : (
                        <span className="px-4 py-2 bg-charcoal/10 text-charcoal rounded-full font-medium">
                          Housing Not Available
                        </span>
                      )}
                    </div>
                    {uni.housing.description && (
                      <p className="text-charcoal/80 leading-relaxed">{uni.housing.description}</p>
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
              <h2 className="text-4xl font-heading font-bold mb-6 text-charcoal">Contact Information</h2>
              
              {uni.contactInfo && (
                <div className="ui-card p-8 mb-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {uni.contactInfo.email && (
                      <div>
                        <label className="text-sm font-bold text-charcoal/60 mb-2 block">Email</label>
                        <a href={`mailto:${uni.contactInfo.email}`} className="text-olive hover:underline text-lg">
                          {uni.contactInfo.email}
                        </a>
                      </div>
                    )}
                    {uni.contactInfo.phone && (
                      <div>
                        <label className="text-sm font-bold text-charcoal/60 mb-2 block">Phone</label>
                        <a href={`tel:${uni.contactInfo.phone}`} className="text-olive hover:underline text-lg">
                          {uni.contactInfo.phone}
                        </a>
                      </div>
                    )}
                    {uni.contactInfo.website && (
                      <div>
                        <label className="text-sm font-bold text-charcoal/60 mb-2 block">Website</label>
                        <a href={uni.contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-olive hover:underline text-lg">
                          {uni.contactInfo.website}
                        </a>
                      </div>
                    )}
                    {uni.contactInfo.address && (
                      <div className="md:col-span-2">
                        <label className="text-sm font-bold text-charcoal/60 mb-2 block">Address</label>
                        <p className="text-charcoal/80">{uni.contactInfo.address}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {uni.socialMedia && (
                <div className="ui-card p-8">
                  <h3 className="text-2xl font-heading font-bold text-charcoal mb-6">Social Media</h3>
                  <div className="flex flex-wrap gap-4">
                    {uni.socialMedia.facebook && (
                      <a
                        href={uni.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
                      >
                        Facebook
                      </a>
                    )}
                    {uni.socialMedia.twitter && (
                      <a
                        href={uni.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-charcoal transition-all"
                      >
                        Twitter/X
                      </a>
                    )}
                    {uni.socialMedia.instagram && (
                      <a
                        href={uni.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 transition-all"
                      >
                        Instagram
                      </a>
                    )}
                    {uni.socialMedia.linkedin && (
                      <a
                        href={uni.socialMedia.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition-all"
                      >
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <ScrollReveal>
            <div>
              <div className="mb-8">
                <h2 className="text-4xl font-heading font-bold mb-4 text-charcoal">Student Reviews</h2>
                <p className="text-lg text-charcoal/70">
                  {reviews.length > 0 
                    ? `Read what ${reviews.length} ${reviews.length === 1 ? 'student has' : 'students have'} to say about ${uni.name}`
                    : 'No reviews yet. Be the first to share your experience!'
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
                              ✓ Verified Student
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-charcoal/80 leading-relaxed text-lg mb-4">{review.comment}</p>
                      <div className="flex items-center gap-6 text-sm text-charcoal/60">
                        <button className="hover:text-olive transition-colors font-medium">
                          👍 Helpful ({review.helpfulCount})
                        </button>
                        <button className="hover:text-olive transition-colors">
                          Reply
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="ui-card p-16 text-center">
                  <img 
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=400&fit=crop"
                    alt="No reviews"
                    className="w-32 h-32 rounded-full mx-auto mb-6 opacity-50"
                  />
                  <p className="text-xl text-charcoal/70 mb-4">No reviews yet.</p>
                  <p className="text-charcoal/60 mb-6">Be the first to share your experience and help other students!</p>
                  <button className="px-8 py-3 rounded-lg bg-olive text-white font-bold hover:bg-olive/90 transition-all">
                    Write a Review
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
              <h2 className="text-4xl font-heading font-bold mb-6">Ready to Apply?</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                {uni.name} could be your perfect match. Start your application process today or compare with other universities.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                {uni.contactInfo?.website && (
                  <a
                    href={uni.contactInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 rounded-lg bg-white text-olive font-bold hover:bg-offwhite transition-all duration-250 hover:scale-105 shadow-xl"
                  >
                    Visit Official Website
                  </a>
                )}
                <Link
                  to="/compare"
                  className="px-8 py-4 rounded-lg bg-white/20 text-white font-bold hover:bg-white/30 transition-all duration-250 hover:scale-105 border-2 border-white"
                >
                  Compare Universities
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}
