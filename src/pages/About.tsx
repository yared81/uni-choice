import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import ScrollReveal from '../components/ScrollReveal'
import { Link } from 'react-router-dom'

export default function About() {
  const { t } = useTranslation()
  return (
    <div className="pt-20 pb-16 min-h-screen">
      {/* Hero Section */}
      <ScrollReveal>
        <section className="relative py-32 bg-gradient-to-br from-olive/20 via-white to-terracotta/20 mb-16 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=800&fit=crop"
              alt="Students"
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
              {t('about.hero_title', { appName: t('app.name') })}
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-charcoal/70 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t('about.hero_subtitle')}
            </motion.p>
          </div>
        </section>
      </ScrollReveal>

      <div className="container-page">
        {/* Story Section */}
        <ScrollReveal>
          <section className="mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-heading font-bold text-charcoal mb-6">
                  {t('about.story_title')}
                </h2>
                <div className="space-y-6 text-lg text-charcoal/80 leading-relaxed">
                  <p>
                    {t('about.story_p1', { appName: t('app.name') })}
                  </p>
                  
                  <p>
                    {t('about.story_p2')}
                  </p>

                  <p>
                    {t('about.story_p3')}
                  </p>
                </div>
              </div>
              <motion.div
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=800&fit=crop"
                  alt="Students in library"
                  className="w-full h-96 object-cover"
                />
              </motion.div>
            </div>
          </section>
        </ScrollReveal>

        {/* Mission & Vision */}
        <ScrollReveal>
          <section className="mb-20">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="ui-card p-10 hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-olive/10 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-heading font-bold text-charcoal mb-6">{t('about.mission_title')}</h2>
                <p className="text-lg text-charcoal/70 leading-relaxed">
                  {t('about.mission_text')}
                </p>
              </div>

              <div className="ui-card p-10 hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-olive/10 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-olive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-heading font-bold text-charcoal mb-6">{t('about.vision_title')}</h2>
                <p className="text-lg text-charcoal/70 leading-relaxed">
                  {t('about.vision_text')}
                </p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Values */}
        <ScrollReveal>
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-charcoal mb-4">{t('about.values_title')}</h2>
              <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
                {t('about.values_subtitle')}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: t('about.value_transparency'),
                  icon: '👁️',
                  desc: t('about.value_transparency_desc')
                },
                {
                  title: t('about.value_accessibility'),
                  icon: '🌍',
                  desc: t('about.value_accessibility_desc')
                },
                {
                  title: t('about.value_innovation'),
                  icon: '💡',
                  desc: t('about.value_innovation_desc')
                }
              ].map((value, i) => (
                <motion.div
                  key={value.title}
                  className="ui-card p-8 text-center hover:shadow-xl transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-2xl font-heading font-bold text-charcoal mb-4">{value.title}</h3>
                  <p className="text-charcoal/70 leading-relaxed">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* What We Offer */}
        <ScrollReveal>
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-charcoal mb-4">{t('about.offer_title')}</h2>
              <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
                {t('about.offer_subtitle')}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                t('about.offer_item_1'),
                t('about.offer_item_2'),
                t('about.offer_item_3'),
                t('about.offer_item_4'),
                t('about.offer_item_5'),
                t('about.offer_item_6'),
                t('about.offer_item_7'),
                t('about.offer_item_8'),
                t('about.offer_item_9')
              ].map((item, i) => (
                <motion.div
                  key={item}
                  className="ui-card p-6 flex items-start hover:shadow-lg transition-all"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <span className="text-olive text-xl mr-4">✓</span>
                  <span className="text-charcoal/70 leading-relaxed">{item}</span>
                </motion.div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Team/Impact Section */}
        <ScrollReveal>
          <section className="mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop"
                  alt="Diverse students"
                  className="w-full h-96 object-cover"
                />
              </motion.div>
              <div>
                <h2 className="text-4xl font-heading font-bold text-charcoal mb-6">{t('about.impact_title')}</h2>
                <div className="space-y-6 text-lg text-charcoal/80 leading-relaxed">
                  <p>
                    {t('about.impact_p1', { appName: t('app.name') })}
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { number: '10K+', label: t('about.impact_stat_students') },
                      { number: '50+', label: t('about.impact_stat_universities') },
                      { number: '200+', label: t('about.impact_stat_programs') },
                      { number: '6', label: t('about.impact_stat_languages') }
                    ].map((stat) => (
                      <div key={stat.label} className="ui-card p-6 text-center">
                        <div className="text-3xl font-heading font-bold text-olive mb-2">{stat.number}</div>
                        <div className="text-sm text-charcoal/70">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal>
          <section className="py-20 bg-gradient-to-r from-olive to-terracotta text-white rounded-2xl text-center">
            <h2 className="text-4xl font-heading font-bold mb-6">{t('about.cta_title')}</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {t('about.cta_subtitle')}
            </p>
            <Link
              to="/universities"
              className="inline-block px-10 py-5 rounded-lg bg-white text-olive font-bold text-lg hover:bg-offwhite transition-all duration-250 hover:scale-105 shadow-2xl"
            >
              {t('about.cta_button')}
            </Link>
          </section>
        </ScrollReveal>
      </div>
    </div>
  )
}
