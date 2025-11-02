import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'

export default function Help() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      q: "How do I search for universities?",
      a: "Use the search bar on the homepage or universities page. You can search by university name, city, program, or any keyword. Our advanced filters help you narrow down results by tuition range, rating, or program type. You can also use our category filters (K-12, Colleges, Grad Schools) for quick access."
    },
    {
      q: "Can I compare multiple universities?",
      a: "Yes! Click the 'Add to Compare' button on any university card or profile page. You can compare up to three universities side-by-side to evaluate tuition, programs, ratings, facilities, and other key features. Visit the Compare page to see all your selected universities in one view."
    },
    {
      q: "How do I save my favorite universities?",
      a: "Click the heart icon on any university card. Your favorites are saved locally in your browser and can be accessed from the 'Favorites' section in the navigation menu. You can add or remove favorites at any time."
    },
    {
      q: "Are the reviews verified?",
      a: "Yes, we verify student reviews to ensure authenticity. Reviews marked with a verified badge are from confirmed current students or alumni of the institution. We encourage honest feedback and moderate reviews to maintain quality."
    },
    {
      q: "How often is the information updated?",
      a: "We update our database regularly, typically at the start of each academic year and whenever universities provide new information. However, we recommend verifying critical information like tuition fees, admission requirements, and deadlines directly with the institution for the most current details."
    },
    {
      q: "Is UniMerk free to use?",
      a: "Yes! UniMerk is completely free for students. All features including search, comparison, reviews, and resources are available at no cost. We're committed to making educational information accessible to everyone."
    },
    {
      q: "How do I write a review?",
      a: "Navigate to a university's profile page and click on the 'Reviews' tab. You'll find a form at the bottom where you can share your experience. Your review helps other students make informed decisions!"
    },
    {
      q: "What languages are supported?",
      a: "UniMerk is available in six languages: English, Amharic, Tigrinya, Afaan Oromo, Somali, and Afar. Use the language switcher in the header to change your preferred language."
    },
    {
      q: "Can I request a university to be added?",
      a: "Absolutely! We're always expanding our database. Contact us through the Contact page or email us at info@unimerk.et with the university details, and we'll work to add it to our platform."
    },
    {
      q: "How accurate is the tuition information?",
      a: "We strive to provide accurate tuition information, but fees can vary by program, degree level, and change annually. Always confirm the exact tuition with the university's admissions office before making financial decisions."
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
              Help Center
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-charcoal/70 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Find answers to common questions and learn how to make the most of UniMerk.
            </motion.p>
          </div>
        </section>
      </ScrollReveal>

      <div className="container-page">
        {/* Quick Links */}
        <ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { title: 'Getting Started', icon: '🚀', desc: 'New to UniMerk? Start here', link: '/universities' },
              { title: 'Search Guide', icon: '🔍', desc: 'Learn advanced search tips', link: '/universities' },
              { title: 'Contact Support', icon: '💬', desc: 'Need more help?', link: '/contact' }
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
                  Learn more →
                </Link>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* FAQ Section */}
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-heading font-bold text-center text-charcoal mb-12">
              Frequently Asked Questions
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
              <h2 className="text-4xl font-heading font-bold mb-6">Still need help?</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Can't find what you're looking for? Our support team is here to help you with any questions or concerns.
              </p>
              <Link
                to="/contact"
                className="inline-block px-10 py-5 rounded-lg bg-white text-olive font-bold text-lg hover:bg-offwhite transition-all duration-250 hover:scale-105 shadow-2xl"
              >
                Contact Support
              </Link>
            </motion.div>
          </section>
        </ScrollReveal>
      </div>
    </div>
  )
}
