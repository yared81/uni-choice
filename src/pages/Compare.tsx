import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { University } from '../types'

export default function Compare() {
  const [comparison, setComparison] = useState<string[]>([])
  const [universities, setUniversities] = useState<University[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('unimerk_compare')
    if (stored) {
      const ids = JSON.parse(stored)
      setComparison(ids)
    }

    // Load from both JSON file and localStorage
    Promise.all([
      fetch('/data/universities.json').then(res => res.json()).catch(() => []),
      Promise.resolve(JSON.parse(localStorage.getItem('unimerk_all_universities') || '[]'))
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
    localStorage.setItem('unimerk_compare', JSON.stringify(updated))
  }

  return (
    <div className="pt-24 pb-16">
      <section className="container-page">
        <h1 className="text-5xl font-heading font-bold text-center text-charcoal mb-6">
          Compare Universities
        </h1>
        <p className="text-xl text-charcoal/70 text-center mb-12 max-w-2xl mx-auto">
          Side-by-side comparison to help you make the best decision.
        </p>

        {selected.length === 0 ? (
          <div className="ui-card p-12 text-center">
            <p className="text-xl text-charcoal/70 mb-6">
              No universities selected for comparison.
            </p>
            <Link
              to="/universities"
              className="inline-block px-6 py-3 rounded-md bg-olive text-white font-medium hover:bg-olive/90 transition-colors"
            >
              Browse Universities
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full ui-card">
              <thead>
                <tr className="border-b border-black/10">
                  <th className="text-left py-4 px-6 font-heading font-bold text-charcoal">Criteria</th>
                  {selected.map(uni => (
                    <th key={uni.id} className="text-left py-4 px-6 font-heading font-bold text-charcoal min-w-[250px]">
                      <div className="flex items-center justify-between">
                        <span>{uni.name}</span>
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
                  <td className="py-4 px-6 font-medium text-charcoal">Location</td>
                  {selected.map(uni => (
                    <td key={uni.id} className="py-4 px-6 text-charcoal/70">{uni.city}</td>
                  ))}
                </tr>
                <tr className="border-b border-black/5">
                  <td className="py-4 px-6 font-medium text-charcoal">Rating</td>
                  {selected.map(uni => (
                    <td key={uni.id} className="py-4 px-6">
                      <span className="text-olive font-bold">★ {uni.rating.toFixed(1)}</span>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-black/5">
                  <td className="py-4 px-6 font-medium text-charcoal">Country</td>
                  {selected.map(uni => (
                    <td key={uni.id} className="py-4 px-6 text-charcoal/70">
                      {uni.country || 'N/A'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-black/5">
                  <td className="py-4 px-6 font-medium text-charcoal">Student Body Size</td>
                  {selected.map(uni => (
                    <td key={uni.id} className="py-4 px-6 text-charcoal/70">
                      {uni.studentBodySize ? uni.studentBodySize.toLocaleString() : 'N/A'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-black/5">
                  <td className="py-4 px-6 font-medium text-charcoal">Programs Available</td>
                  {selected.map(uni => (
                    <td key={uni.id} className="py-4 px-6 text-charcoal/70">
                      {uni.programs.length} programs
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-black/5">
                  <td className="py-4 px-6 font-medium text-charcoal">Campuses</td>
                  {selected.map(uni => (
                    <td key={uni.id} className="py-4 px-6 text-charcoal/70">
                      {uni.campuses?.length || 0}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-black/5">
                  <td className="py-4 px-6 font-medium text-charcoal">Faculties</td>
                  {selected.map(uni => (
                    <td key={uni.id} className="py-4 px-6 text-charcoal/70">
                      {uni.faculties?.length || 0}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-black/5">
                  <td className="py-4 px-6 font-medium text-charcoal">Housing</td>
                  {selected.map(uni => (
                    <td key={uni.id} className="py-4 px-6 text-charcoal/70">
                      {uni.housing?.available ? 'Available' : 'Not Available'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-black/5">
                  <td className="py-4 px-6 font-medium text-charcoal">Verified</td>
                  {selected.map(uni => (
                    <td key={uni.id} className="py-4 px-6">
                      {uni.verified ? (
                        <span className="px-3 py-1 bg-olive/10 text-olive rounded-full text-sm font-medium">✓ Verified</span>
                      ) : (
                        <span className="text-charcoal/50">Unverified</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-charcoal">Action</td>
                  {selected.map(uni => (
                    <td key={uni.id} className="py-4 px-6">
                      <Link
                        to={`/university/${uni.id}`}
                        className="text-olive hover:underline font-medium"
                      >
                        View Details →
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

