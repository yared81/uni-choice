import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-charcoal text-white/80">
      <div className="container-page py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/uniCHoice_logo.ico" 
                alt={t('app.name')}
                className="w-10 h-10 object-contain"
              />
              <span className="text-xl font-heading font-bold text-white">{t('app.name')}</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">{t('footer.quick_links')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-olive transition-colors">{t('footer.home')}</Link></li>
              <li><Link to="/universities" className="hover:text-olive transition-colors">{t('footer.universities')}</Link></li>
              <li><Link to="/compare" className="hover:text-olive transition-colors">{t('footer.compare_schools')}</Link></li>
              <li><Link to="/about" className="hover:text-olive transition-colors">{t('footer.about_us')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">{t('footer.connect')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="hover:text-olive transition-colors">{t('footer.contact_us')}</Link></li>
              <li><Link to="/help" className="hover:text-olive transition-colors">{t('footer.help_center')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-white/60">
            © {new Date().getFullYear()} {t('app.name')}. {t('footer.all_rights_reserved')}.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-white/60 hover:text-olive transition-colors">{t('footer.privacy_policy')}</Link>
            <Link to="/terms" className="text-white/60 hover:text-olive transition-colors">{t('footer.terms_of_service')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
