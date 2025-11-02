import { useTranslation } from 'react-i18next'

export default function Favorites() {
  const { t } = useTranslation()

  return (
    <section className="container-page py-10">
      <h1 className="text-2xl font-heading mb-4">{t('nav.favorites')}</h1>
      <div className="text-sm text-black/60">{t('favorites.no_favorites')}</div>
    </section>
  )
}

