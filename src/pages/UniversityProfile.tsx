import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { University } from '../types'
import UniversityProfileView from '../components/UniversityProfileView'

export default function UniversityProfile() {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const [uni, setUni] = useState<University | null>(null)

  useEffect(() => {
    // Load from both JSON file and localStorage
    Promise.all([
      fetch('/data/universities.json').then(res => res.json()).catch(() => []),
      Promise.resolve(JSON.parse(localStorage.getItem('unichoice_all_universities') || '[]'))
    ]).then(([jsonUnis, localUnis]) => {
      const allUnis = [...jsonUnis, ...localUnis]
      const found = allUnis.find((u: University) => u.id === id)
      setUni(found || null)
    })
  }, [id])

  if (!uni) {
    return (
      <div className="pt-24 pb-16">
        <section className="container-page">
          <div className="text-center py-20">
            <h1 className="text-3xl font-heading mb-4">{t('university_profile.not_found')}</h1>
            <Link to="/universities" className="text-olive hover:underline">{t('university_profile.browse_all')} →</Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <UniversityProfileView university={uni} />
  )
}
