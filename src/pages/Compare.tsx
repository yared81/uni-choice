import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { University } from '../types'
import { translateUniversityName } from '../utils/translateUniversityData'

export default function Compare() {
  const { t } = useTranslation()
  const [comparison, setComparison] = useState<string[]>([])
  const [universities, setUniversities] = useState<University[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('unichoice_compare')
    if (stored) {
      const ids = JSON.parse(stored)
      setComparison(ids)
    }

    // Load from both JSON file and localStorage
    Promise.all([
      fetch('/data/universities.json').then(res => res.json()).catch(() => []),
      Promise.resolve(JSON.parse(localStorage.getItem('unichoice_all_universities') || '[]'))
    ]).then(([jsonUnis, localUnis]) => {
      const allUnis = [...jsonUnis, ...localUnis]
      const uniqueUnis = Array.from(
        new Map(allUnis.map(u => [u.id, u])).values()
      )
      setUniversities(uniqueUnis)
    })
  }, [])

  const selected = universities.filter(u => comparison.includes(u.id))

  const removeFromCompare = (id: string) => {
    const updated = comparison.filter(i => i !== id)
    setComparison(updated)
    localStorage.setItem('unichoice_compare', JSON.stringify(updated))
  }

  return (
    <div className="pt-24 pb-16">
      <section className="container-page">
        <h1 className="text-5xl font-heading font-bold text-center text-charcoal mb-6">
          {t('compare.title')}
        </h1>
        <p className="text-xl text-charcoal/70 text-center mb-12 max-w-2xl mx-auto">
          {t('compare.subtitle')}
        </p>

        {selected.length === 0 ? (
          <div className="ui-card p-12 text-center">
            <p className="text-xl text-charcoal/70 mb-6">
              {t('compare.no_selection')}
            </p>
            <Link
              to="/universities"
              className="inline-block px-6 py-3 rounded-md bg-olive text-white font-medium hover:bg-olive/90 transition-colors"
            >
              {t('compare.browse')}
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full ui-card">
              <thead>
                <tr className="border-b border-black/10">
                  <th className="text-left py-4 px-6 font-heading font-bold text-charcoal">{t('compare.criteria')}</th>
                  {selected.map(uni => (
                    <th key={uni.id} className="text-left py-4 px-6 font-heading font-bold text-charcoal min-w-[250px]">
                      <div className="flex items-center justify-between">
                        <span>{translateUniversityName(uni.name, t)}</span>
                        <button
                          onClick={() => removeFromCompare(uni.id)}
                          className="text-charcoal/50 hover:text-red-500 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-black/5">
                  <td className="py-4 px-6 font-medium text-charcoal">{t('compare.location')}</td>
                  {selected.map(uni => (
                    <td key={uni.id} className="py-4 px-6 text-charcoal/70">{uni.city}</td>
                  ))}
                </tr>
                <tr className="border-b border-black/5">
                  <td className="py-4 px-6 font-medium text-charcoal">{t('compare.rating')}</td>
                  {selected.map(uni => (
                    <td key={uni.id} className="py-4 px-6">
                      <span className="text-olive font-bold">★ {uni.rating.toFixed(1)}</span>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-black/5">
                  <td className="py-4 px-6 font-medium text-charcoal">{t('compare.country')}</td>
                  {selected.map(uni => (
                    <td key={uni.id} className="py-4 px-6 text-charcoal/70">
                      {uni.country || t('compare.na')}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-black/5">
                  <td className="py-4 px-6 font-medium text-charcoal">{t('compare.student_body_size')}</td>
                  {selected.map(uni => (
                    <td key={uni.id} className="py-4 px-6 text-charcoal/70">
                      {uni.studentBodySize ? uni.studentBodySize.toLocaleString() : t('compare.na')}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-black/5">
                  <td className="py-4 px-6 font-medium text-charcoal">{t('compare.programs_available')}</td>
                  {selected.map(uni => (
                    <td key={uni.id} className="py-4 px-6 text-charcoal/70">
                      {uni.programs.length} {t('compare.programs_label')}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-black/5">
                  <td className="py-4 px-6 font-medium text-charcoal">{t('compare.campuses')}</td>
                  {selected.map(uni => (
                    <td key={uni.id} className="py-4 px-6 text-charcoal/70">
                      {uni.campuses?.length || 0}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-black/5">
                  <td className="py-4 px-6 font-medium text-charcoal">{t('compare.faculties')}</td>
                  {selected.map(uni => (
                    <td key={uni.id} className="py-4 px-6 text-charcoal/70">
                      {uni.faculties?.length || 0}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-black/5">
                  <td className="py-4 px-6 font-medium text-charcoal">{t('compare.housing')}</td>
                  {selected.map(uni => (
                    <td key={uni.id} className="py-4 px-6 text-charcoal/70">
                      {uni.housing?.available ? t('compare.available') : t('compare.not_available')}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-black/5">
                  <td className="py-4 px-6 font-medium text-charcoal">{t('compare.verified')}</td>
                  {selected.map(uni => (
                    <td key={uni.id} className="py-4 px-6">
                      {uni.verified ? (
                        <span className="px-3 py-1 bg-olive/10 text-olive rounded-full text-sm font-medium">✓ {t('compare.verified')}</span>
                      ) : (
                        <span className="text-charcoal/50">{t('compare.unverified')}</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-charcoal">{t('compare.action')}</td>
                  {selected.map(uni => (
                    <td key={uni.id} className="py-4 px-6">
                      <Link
                        to={`/university/${uni.id}`}
                        className="text-olive hover:underline font-medium"
                      >
                        {t('compare.view_details')} →
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}

