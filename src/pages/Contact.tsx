import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import ScrollReveal from '../components/ScrollReveal'

export default function Contact() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(t('contact.form_success'))
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="pt-20 pb-16 min-h-screen">
      {/* Hero Section */}
      <ScrollReveal>
        <section className="relative py-24 bg-gradient-to-br from-olive/20 via-white to-terracotta/20 mb-16 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=800&fit=crop"
              alt="Contact us"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container-page relative z-10 text-center">
            <motion.h1 
              className="text-5xl md:text-7xl font-heading font-bold text-charcoal mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {t('contact.hero_title')}
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-charcoal/70 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t('contact.hero_subtitle')}
            </motion.p>
          </div>
        </section>
      </ScrollReveal>

      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Info */}
          <ScrollReveal>
            <div>
              <h2 className="text-4xl font-heading font-bold mb-8 text-charcoal">{t('contact.info_title')}</h2>
              <div className="space-y-8">
                <motion.div
                  className="ui-card p-6 hover:shadow-xl transition-all"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-olive/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-charcoal mb-2">{t('contact.email_title')}</h3>
                      <a href={`mailto:${t('contact.email_value')}`} className="text-olive hover:underline text-lg">
                        {t('contact.email_value')}
                      </a>
                      <p className="text-charcoal/60 text-sm mt-1">{t('contact.email_response')}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="ui-card p-6 hover:shadow-xl transition-all"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-olive/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-charcoal mb-2">{t('contact.phone_title')}</h3>
                      <a href={`tel:${t('contact.phone_value')}`} className="text-olive hover:underline text-lg">
                        {t('contact.phone_value')}
                      </a>
                      <p className="text-charcoal/60 text-sm mt-1">{t('contact.phone_hours')}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="ui-card p-6 hover:shadow-xl transition-all"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-olive/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-charcoal mb-2">{t('contact.address_title')}</h3>
                      <p className="text-charcoal/70 text-lg">
                        {t('contact.address_value')}
                      </p>
                      <p className="text-charcoal/60 text-sm mt-1">{t('contact.address_visit')}</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Social Media */}
              <div className="mt-12">
                <h3 className="text-2xl font-heading font-bold text-charcoal mb-6">{t('contact.follow_us')}</h3>
                <div className="flex gap-4">
                  {['Facebook', 'Twitter', 'LinkedIn', 'Instagram'].map((social, i) => (
                    <motion.a
                      key={social}
                      href="#"
                      className="w-12 h-12 bg-olive/10 rounded-lg flex items-center justify-center text-olive hover:bg-olive hover:text-white transition-all"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <span className="text-xl">{social === 'Facebook' ? '📘' : social === 'Twitter' ? '🐦' : social === 'LinkedIn' ? '💼' : '📷'}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal>
            <div className="ui-card p-10 shadow-xl">
              <h2 className="text-4xl font-heading font-bold mb-6 text-charcoal">{t('contact.form_title')}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2">{t('contact.form_name')}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2">{t('contact.form_email')}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2">{t('contact.form_subject')}</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2">{t('contact.form_message')}</label>
                  <textarea
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full px-8 py-4 rounded-lg bg-gradient-to-r from-olive to-terracotta text-white font-bold text-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('contact.form_submit')}
                </motion.button>
              </form>
            </div>
          </ScrollReveal>
        </div>

        {/* FAQ Preview */}
        <ScrollReveal>
          <section className="py-12 bg-offwhite rounded-2xl p-10">
            <h2 className="text-3xl font-heading font-bold text-center text-charcoal mb-8">
              {t('contact.faq_title')}
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { q: t('contact.faq_quick_q'), a: t('contact.faq_quick_a') },
                { q: t('contact.faq_universities_q'), a: t('contact.faq_universities_a') },
                { q: t('contact.faq_counseling_q'), a: t('contact.faq_counseling_a') }
              ].map((faq, i) => (
                <motion.div
                  key={faq.q}
                  className="ui-card p-6 hover:shadow-lg transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <h3 className="font-bold text-charcoal mb-2">{faq.q}</h3>
                  <p className="text-charcoal/70 text-sm">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </ScrollReveal>
      </div>
    </div>
  )
}
