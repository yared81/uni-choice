import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { University } from '../types'
import UniversityCard from '../components/UniversityCard'

export default function Search() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const [universities, setUniversities] = useState<University[]>([])
  const [filtered, setFiltered] = useState<University[]>([])
  const [query, setQuery] = useState(searchParams.get('q') || '')

  useEffect(() => {
    fetch('/data/universities.json')
      .then(res => res.json())
      .then(data => {
        setUniversities(data)
        setFiltered(data)
      })
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setFiltered(universities)
      return
    }
    const q = query.toLowerCase()
    const results = universities.filter(u =>
      [u.name, u.city, u.description, ...u.programs.map(p => p.name)]
        .join(' ')
        .toLowerCase()
        .includes(q)
    )
    setFiltered(results)
  }, [query, universities])

  return (
    <section className="container-page py-10">
      <h1 className="text-2xl font-heading mb-4">{t('nav.search')}</h1>
      <div className="ui-card p-3 flex items-center gap-2 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('landing.hero_search_placeholder')}
          className="w-full bg-transparent outline-none text-base"
        />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(uni => (
          <UniversityCard key={uni.id} uni={uni} />
        ))}
      </div>
    </section>
  )
}

