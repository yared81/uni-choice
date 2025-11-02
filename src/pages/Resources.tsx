import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'

export default function Resources() {
  const { category } = useParams()
  
  const resources = [
    {
      id: 'admissions',
      title: 'Admissions Guide',
      icon: '📝',
      description: 'Complete guide to university admissions in Ethiopia, including requirements, deadlines, and tips for a successful application.',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop',
      content: `Applying to university can be overwhelming, but with the right information and preparation, you can navigate the process successfully.

## Understanding Admission Requirements

Each university in Ethiopia has specific admission requirements that typically include:
- Minimum grade point average (GPA)
- Entrance examination scores
- Required subjects for specific programs
- Language proficiency (for programs taught in English)
- Additional documentation (certificates, recommendation letters)

## Application Timeline

Most universities follow a similar application timeline:
- **Early Application**: October - December
- **Regular Application**: January - March
- **Deadline Extensions**: Some universities offer late applications until April
- **Results Announcement**: May - June
- **Registration**: July - August

## Tips for Success

1. **Start Early**: Begin preparing at least a year in advance
2. **Research Thoroughly**: Understand each program's specific requirements
3. **Prepare Documentation**: Keep all certificates and documents organized
4. **Practice Entrance Exams**: Many universities require entrance examinations
5. **Seek Guidance**: Consult with counselors, teachers, or current students

## Financial Planning

Consider all costs including:
- Tuition fees
- Accommodation
- Books and materials
- Living expenses
- Transportation

Many universities offer scholarships and financial aid programs. Research these opportunities early.`
    },
    {
      id: 'scholarships',
      title: 'Scholarships & Financial Aid',
      icon: '💰',
      description: 'Discover available scholarships, grants, and financial aid programs to support your education.',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
      content: `Financing your education is a crucial part of planning for university. Ethiopia offers various scholarship opportunities for eligible students.

## Government Scholarships

The Ethiopian government provides several scholarship programs:
- Merit-based scholarships for top-performing students
- Need-based financial assistance
- Regional development scholarships
- Special programs for underrepresented groups

## University-Specific Scholarships

Many universities offer their own scholarship programs:
- Academic excellence scholarships
- Sports and arts scholarships
- Leadership scholarships
- Alumni-funded scholarships

## International Scholarships

Several international organizations provide funding:
- UNESCO scholarships
- World Bank programs
- Regional development funds
- Private foundation grants

## Application Process

1. Research available opportunities
2. Check eligibility criteria
3. Prepare required documents
4. Submit applications before deadlines
5. Follow up on application status

## Tips for Scholarship Applications

- Maintain strong academic performance
- Get involved in extracurricular activities
- Write compelling personal statements
- Secure strong recommendation letters
- Meet all deadlines`
    },
    {
      id: 'blog',
      title: 'Student Blog & Insights',
      icon: '✍️',
      description: 'Read stories, tips, and insights from current students and alumni.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
      content: `Welcome to our community blog where students share their experiences, tips, and insights about university life in Ethiopia.

## Featured Stories

### "My Journey to Addis Ababa University"
One student shares their experience navigating the admission process and adjusting to university life.

### "Balancing Academics and Social Life"
Practical advice on managing time effectively while enjoying the university experience.

### "Career Preparation at University"
How to make the most of university resources to prepare for your future career.

## Student Tips

- Time Management Strategies
- Study Techniques That Work
- Building Professional Networks
- Making the Most of University Resources
- Navigating Campus Life

Stay tuned for regular updates from our student contributors!`
    }
  ]

  const selected = category ? resources.find(r => r.id === category) : null

  return (
    <div className="pt-20 pb-16 min-h-screen">
      {selected ? (
        <>
          {/* Article Header */}
          <ScrollReveal>
            <section className="relative py-24 bg-gradient-to-br from-olive/20 via-white to-terracotta/20 mb-16 overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <img 
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="container-page relative z-10">
                <Link to="/resources" className="text-olive hover:underline mb-6 inline-block font-medium">
                  ← Back to Resources
                </Link>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="text-6xl mb-4">{selected.icon}</div>
                  <h1 className="text-5xl md:text-7xl font-heading font-bold text-charcoal mb-6">{selected.title}</h1>
                  <p className="text-xl text-charcoal/70 max-w-3xl">{selected.description}</p>
                </motion.div>
              </div>
            </section>
          </ScrollReveal>

          {/* Article Content */}
          <ScrollReveal>
            <div className="container-page">
              <div className="max-w-4xl mx-auto">
                <div className="ui-card p-12 mb-8">
                  <img 
                    src={selected.image}
                    alt={selected.title}
                    className="w-full h-96 object-cover rounded-lg mb-8"
                  />
                  <div className="prose prose-lg max-w-none">
                    <div className="whitespace-pre-line text-charcoal/80 leading-relaxed text-lg">
                      {selected.content}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </>
      ) : (
        <>
          {/* Hero Section */}
          <ScrollReveal>
            <section className="relative py-24 bg-gradient-to-br from-olive/20 via-white to-terracotta/20 mb-16 overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <img 
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=800&fit=crop"
                  alt="Resources"
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
                  Resources & Guides
                </motion.h1>
                <motion.p 
                  className="text-xl md:text-2xl text-charcoal/70 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Access comprehensive guides, tips, and resources to help you navigate your educational journey.
                </motion.p>
              </div>
            </section>
          </ScrollReveal>

          {/* Resources Grid */}
          <div className="container-page">
            <ScrollReveal>
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {resources.map((resource, i) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      to={`/resources/${resource.id}`}
                      className="ui-card p-8 hover:shadow-2xl transition-all duration-300 block h-full group"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="text-6xl mb-6"
                      >
                        {resource.icon}
                      </motion.div>
                      <div className="relative mb-4 overflow-hidden rounded-lg">
                        <img 
                          src={resource.image}
                          alt={resource.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <h3 className="text-2xl font-heading font-bold mb-4 text-charcoal group-hover:text-olive transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-charcoal/70 leading-relaxed mb-6">{resource.description}</p>
                      <span className="text-olive font-bold mt-4 inline-block group-hover:translate-x-2 transition-transform">
                        Learn more →
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            {/* Additional Resources */}
            <ScrollReveal>
              <section className="mt-24 py-16 bg-offwhite rounded-2xl p-10">
                <h2 className="text-4xl font-heading font-bold text-center text-charcoal mb-12">
                  Additional Resources
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { title: 'Career Guide', icon: '💼' },
                    { title: 'Study Tips', icon: '📚' },
                    { title: 'Financial Planning', icon: '💳' },
                    { title: 'Student Life', icon: '🎓' }
                  ].map((item, i) => (
                    <motion.div
                      key={item.title}
                      className="ui-card p-6 text-center hover:shadow-lg transition-all cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <div className="text-4xl mb-3">{item.icon}</div>
                      <h3 className="font-bold text-charcoal">{item.title}</h3>
                    </motion.div>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          </div>
        </>
      )}
    </div>
  )
}
