import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import ScrollReveal from '../components/ScrollReveal'

export default function Help() {
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      q: t('help.faq_search_q'),
      a: t('help.faq_search_a')
    },
    {
      q: t('help.faq_compare_q'),
      a: t('help.faq_compare_a')
    },
    {
      q: t('help.faq_favorites_q'),
      a: t('help.faq_favorites_a')
    },
    {
      q: t('help.faq_reviews_q'),
      a: t('help.faq_reviews_a')
    },
    {
      q: t('help.faq_updates_q'),
      a: t('help.faq_updates_a')
    },
    {
      q: t('help.faq_free_q', { appName: t('app.name') }),
      a: t('help.faq_free_a', { appName: t('app.name') })
    },
    {
      q: t('help.faq_write_review_q'),
      a: t('help.faq_write_review_a')
    },
    {
      q: t('help.faq_languages_q'),
      a: t('help.faq_languages_a', { appName: t('app.name') })
    },
    {
      q: t('help.faq_request_q'),
      a: t('help.faq_request_a')
    },
    {
      q: t('help.faq_tuition_q'),
      a: t('help.faq_tuition_a')
    }
  ]

  return (
    <div className="pt-20 pb-16 min-h-screen">
      {/* Hero Section */}
      <ScrollReveal>
        <section className="relative py-24 bg-gradient-to-br from-olive/20 via-white to-terracotta/20 mb-16 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1920&h=800&fit=crop"
              alt="Help center"
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
              {t('help.hero_title')}
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-charcoal/70 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t('help.hero_subtitle', { appName: t('app.name') })}
            </motion.p>
          </div>
        </section>
      </ScrollReveal>

      <div className="container-page">
        {/* Quick Links */}
        <ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { title: t('help.quick_link_getting_started'), icon: '🚀', desc: t('help.quick_link_getting_started_desc', { appName: t('app.name') }), link: '/universities' },
              { title: t('help.quick_link_search_guide'), icon: '🔍', desc: t('help.quick_link_search_guide_desc'), link: '/universities' },
              { title: t('help.quick_link_contact'), icon: '💬', desc: t('help.quick_link_contact_desc'), link: '/contact' }
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="ui-card p-8 text-center hover:shadow-xl transition-all cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-heading font-bold text-charcoal mb-2">{item.title}</h3>
                <p className="text-charcoal/70 mb-4">{item.desc}</p>
                <Link to={item.link} className="text-olive font-medium hover:underline">
                  {t('help.learn_more')}
                </Link>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* FAQ Section */}
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-heading font-bold text-center text-charcoal mb-12">
              {t('help.faq_title')}
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="ui-card overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-offwhite transition-all"
                  >
                    <h3 className="text-xl font-heading font-bold text-charcoal pr-4">{faq.q}</h3>
                    <motion.svg
                      className="w-6 h-6 text-olive flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openIndex === index ? 'auto' : 0,
                      opacity: openIndex === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <p className="text-charcoal/70 leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Contact CTA */}
        <ScrollReveal>
          <section className="mt-20 py-16 bg-gradient-to-r from-olive to-terracotta text-white rounded-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-heading font-bold mb-6">{t('help.still_need_help')}</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                {t('help.still_need_help_desc')}
              </p>
              <Link
                to="/contact"
                className="inline-block px-10 py-5 rounded-lg bg-white text-olive font-bold text-lg hover:bg-offwhite transition-all duration-250 hover:scale-105 shadow-2xl"
              >
                {t('help.contact_support')}
              </Link>
            </motion.div>
          </section>
        </ScrollReveal>
      </div>
    </div>
  )
}
