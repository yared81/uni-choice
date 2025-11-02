import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import ScrollReveal from '../components/ScrollReveal'

export default function Home() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [query, setQuery] = useState('')

  useEffect(() => {
    // Redirect university users to their profile
    if (user?.role === 'university') {
      navigate('/profile')
    }
  }, [user, navigate])

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/universities?q=${encodeURIComponent(query)}`)
    } else {
      navigate('/universities')
    }
  }


  return (
    <div className="overflow-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-offwhite via-sand/20 to-offwhite pt-20 overflow-hidden">
        {/* Elegant Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <img 
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=1080&fit=crop"
            alt="University campus"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-olive/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-terracotta/20 to-transparent" />
        
        <div className="container-page relative z-10 text-center max-w-4xl">
          <motion.h1 
            className="text-6xl md:text-8xl font-heading font-bold text-charcoal mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Find the School
            <br />
            <span className="text-olive">That Fits You Best</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-charcoal/70 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Finding the right school shouldn't be hard. From K‑12 to college to grad school, we make it easy to discover and connect with the best ones for you.
          </motion.p>

          {/* Centered Search */}
          <motion.div 
            className="max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="ui-card p-2 flex items-center gap-2 shadow-2xl border-2 border-olive/20">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search by university name, city, program, or keyword..."
                className="flex-1 bg-transparent outline-none text-base px-4 py-4 placeholder:text-charcoal/40"
              />
              <motion.button
                onClick={handleSearch}
                className="px-8 py-4 rounded-md bg-gradient-to-r from-olive to-terracotta text-white font-bold hover:shadow-lg transition-all duration-180 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Search
              </motion.button>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {['K-12 Schools', 'Colleges', 'Grad Schools'].map((text, i) => (
              <motion.div
                key={text}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to={`/universities?type=${text.toLowerCase().replace(' ', '')}`}
                  className="px-8 py-4 rounded-lg bg-white border-2 border-charcoal/10 hover:border-olive hover:shadow-xl transition-all duration-250 font-bold text-charcoal hover:text-olive"
                >
                  {text}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-charcoal/30 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-olive rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <ScrollReveal>
        <section className="py-20 bg-white">
          <div className="container-page">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { number: '50+', label: 'Universities' },
                { number: '10K+', label: 'Students Helped' },
                { number: '200+', label: 'Programs Listed' },
                { number: '6', label: 'Languages' }
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="ui-card p-8 hover:shadow-xl transition-all"
                >
                  <div className="text-5xl font-heading font-bold text-olive mb-2">{stat.number}</div>
                  <div className="text-lg text-charcoal/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Introduction Section with Student Image */}
      <ScrollReveal>
        <section className="py-24 bg-gradient-to-b from-white to-offwhite">
          <div className="container-page">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-charcoal mb-6">
                  Your Future Starts Here
                </h2>
                <p className="text-lg text-charcoal/70 leading-relaxed mb-6">
                  UniMerk is the trusted platform connecting students with the perfect educational institutions across Ethiopia. 
                  We've revolutionized the way students discover, compare, and make informed decisions about their academic journey.
                </p>
                <p className="text-lg text-charcoal/70 leading-relaxed mb-8">
                  With comprehensive data on over 50+ universities, detailed program information, real student reviews, 
                  and powerful comparison tools, we empower you to find the institution that aligns with your goals, 
                  budget, and aspirations.
                </p>
                <Link
                  to="/about"
                  className="inline-block px-8 py-4 rounded-lg bg-olive text-white font-bold hover:bg-olive/90 transition-all duration-250 hover:scale-105 shadow-lg"
                >
                  Learn More About Us
                </Link>
              </div>
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=800&fit=crop"
                    alt="Students studying"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <p className="text-xl font-heading font-bold">Join thousands of successful students</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Features Grid */}
      <ScrollReveal>
        <section className="py-24 bg-white">
          <div className="container-page">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-charcoal mb-4">
                Why Choose UniMerk?
              </h2>
              <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
                Everything you need to make the perfect choice for your education
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  ),
                  title: 'Comprehensive Search',
                  desc: 'Find universities by location, program, tuition, rating, and more. Our advanced filters help you narrow down your options instantly.'
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  ),
                  title: 'Side-by-Side Comparison',
                  desc: 'Compare up to three universities simultaneously. Evaluate tuition, programs, ratings, and key features in one view.'
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  ),
                  title: 'Authentic Reviews',
                  desc: 'Read verified reviews from current students and alumni. Get honest insights about campus life, academics, and career outcomes.'
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                  title: 'Expert Guidance',
                  desc: 'Access resources, guides, and expert advice to navigate the application process and make informed decisions.'
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: 'Up-to-Date Information',
                  desc: 'Our database is constantly updated with the latest tuition fees, program offerings, admission requirements, and deadlines.'
                },
                {
                  icon: (
                    <svg className="w-8 h-8 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                  title: 'Multilingual Support',
                  desc: 'Access our platform in six languages including English, Amharic, Tigrinya, Afaan Oromo, Somali, and Afar.'
                }
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  className="ui-card p-8 hover:shadow-2xl transition-all duration-250 hover:-translate-y-2"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-16 h-16 bg-olive/10 rounded-lg flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-3 text-charcoal">{feature.title}</h3>
                  <p className="text-charcoal/70 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Student Testimonials */}
      <ScrollReveal>
        <section className="py-24 bg-offwhite">
          <div className="container-page">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-charcoal mb-4">
                What Students Say
              </h2>
              <p className="text-xl text-charcoal/70">
                Real experiences from students who found their perfect match
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Meron Teklu',
                  university: 'Addis Ababa University',
                  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces',
                  text: 'UniMerk helped me compare universities easily. I found the perfect program that matched both my interests and budget. The detailed reviews from current students were incredibly helpful!'
                },
                {
                  name: 'Dawit Alemayehu',
                  university: 'Bahir Dar University',
                  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces',
                  text: 'As a first-generation student, I had no idea where to start. UniMerk provided all the information I needed in one place. The comparison tool made it so easy to see my options side by side.'
                },
                {
                  name: 'Sara Mohammed',
                  university: 'Addis Ababa University',
                  image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces',
                  text: 'I love how easy it is to search and filter universities. The multilingual support meant my family could help me make the decision. Thank you UniMerk!'
                }
              ].map((testimonial, i) => (
                <motion.div
                  key={testimonial.name}
                  className="ui-card p-8 hover:shadow-xl transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <div className="flex items-center mb-6">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-olive/20 mr-4"
                    />
                    <div>
                      <div className="font-bold text-charcoal">{testimonial.name}</div>
                      <div className="text-sm text-charcoal/60">{testimonial.university}</div>
                    </div>
                  </div>
                  <p className="text-charcoal/80 leading-relaxed italic">"{testimonial.text}"</p>
                  <div className="mt-4 flex text-olive">
                    {'★'.repeat(5)}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal>
        <section className="py-32 bg-gradient-to-r from-olive via-olive/90 to-terracotta text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=1080&fit=crop"
              alt="Students"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container-page text-center relative z-10">
            <motion.h2 
              className="text-4xl md:text-6xl font-heading font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ready to Find Your Perfect School?
            </motion.h2>
            <motion.p 
              className="text-xl md:text-2xl mb-10 text-white/90 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Join thousands of students who have found their ideal educational institution through UniMerk.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link
                to="/universities"
                className="inline-block px-12 py-5 rounded-lg bg-white text-olive font-bold text-xl hover:bg-offwhite transition-all duration-250 hover:scale-110 shadow-2xl"
              >
                Start Your Search Today
              </Link>
            </motion.div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}
