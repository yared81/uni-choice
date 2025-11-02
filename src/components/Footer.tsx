import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/80">
      <div className="container-page py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-olive to-terracotta rounded-lg flex items-center justify-center">
                <span className="text-white font-heading text-xl font-bold">U</span>
              </div>
              <span className="text-xl font-heading font-bold text-white">UniMerk</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Your trusted partner in discovering the perfect educational institution across Ethiopia.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-olive transition-colors">Home</Link></li>
              <li><Link to="/universities" className="hover:text-olive transition-colors">Universities</Link></li>
              <li><Link to="/compare" className="hover:text-olive transition-colors">Compare Schools</Link></li>
              <li><Link to="/about" className="hover:text-olive transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/resources" className="hover:text-olive transition-colors">Study Guides</Link></li>
              <li><Link to="/resources/admissions" className="hover:text-olive transition-colors">Admissions Info</Link></li>
              <li><Link to="/resources/scholarships" className="hover:text-olive transition-colors">Scholarships</Link></li>
              <li><Link to="/help" className="hover:text-olive transition-colors">Help Center</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="hover:text-olive transition-colors">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-olive transition-colors">Our Story</Link></li>
              <li><Link to="/resources/blog" className="hover:text-olive transition-colors">Blog</Link></li>
              <li><Link to="/resources/newsletter" className="hover:text-olive transition-colors">Newsletter</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-white/60">
            © {new Date().getFullYear()} UniMerk. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-white/60 hover:text-olive transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-white/60 hover:text-olive transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

