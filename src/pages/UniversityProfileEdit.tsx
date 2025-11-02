import { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import ScrollReveal from '../components/ScrollReveal'
import type { University, Program, Campus, Faculty } from '../types'

export default function UniversityProfileEdit() {
  const { user, logout, updateUser } = useAuth()
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const campusFileInputRef = useRef<HTMLInputElement>(null)
  const [myUniversity, setMyUniversity] = useState<University | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('basic')

  const [formData, setFormData] = useState<Partial<University>>({
    name: '',
    city: '',
    country: '',
    rating: 4.0,
    programs: [],
    images: [],
    description: '',
    verified: false,
    aboutCity: '',
    campuses: [],
    faculties: [],
    admissionRequirements: '',
    applicationDeadline: '',
    studentBodySize: undefined,
    campusFacilities: [],
    housing: { available: false },
    contactInfo: {},
    socialMedia: {},
    accreditation: [],
    history: '',
    mission: '',
    vision: ''
  })

  useEffect(() => {
    if (!user || user.role !== 'university') {
      navigate('/login')
      return
    }

    // Load user's university from localStorage
    const userUni = localStorage.getItem(`unimerk_uni_${user.id}`)
    if (userUni) {
      try {
        const parsed = JSON.parse(userUni)
        setMyUniversity(parsed)
        setFormData({ ...formData, ...parsed })
      } catch (e) {}
    }
  }, [user, navigate])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        if (index !== undefined) {
          const newImages = [...(formData.images || [])]
          newImages[index] = base64String
          setFormData({ ...formData, images: newImages })
        } else {
          setFormData({ ...formData, images: [...(formData.images || []), base64String] })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = (index: number) => {
    const newImages = formData.images?.filter((_, i) => i !== index) || []
    setFormData({ ...formData, images: newImages })
  }

  const addProgram = () => {
    const newProgram: Program = {
      id: Date.now().toString(),
      name: '',
      degree: 'BSc',
      durationYears: 4,
      language: 'English'
    }
    setFormData({
      ...formData,
      programs: [...(formData.programs || []), newProgram]
    })
  }

  const updateProgram = (index: number, updates: Partial<Program>) => {
    const newPrograms = [...(formData.programs || [])]
    newPrograms[index] = { ...newPrograms[index], ...updates }
    setFormData({ ...formData, programs: newPrograms })
  }

  const removeProgram = (index: number) => {
    const newPrograms = formData.programs?.filter((_, i) => i !== index) || []
    setFormData({ ...formData, programs: newPrograms })
  }

  const addCampus = () => {
    const newCampus: Campus = {
      id: Date.now().toString(),
      name: '',
      address: '',
      city: '',
      phone: '',
      email: '',
      description: ''
    }
    setFormData({
      ...formData,
      campuses: [...(formData.campuses || []), newCampus]
    })
  }

  const updateCampus = (index: number, updates: Partial<Campus>) => {
    const newCampuses = [...(formData.campuses || [])]
    newCampuses[index] = { ...newCampuses[index], ...updates }
    setFormData({ ...formData, campuses: newCampuses })
  }

  const removeCampus = (index: number) => {
    const newCampuses = formData.campuses?.filter((_, i) => i !== index) || []
    setFormData({ ...formData, campuses: newCampuses })
  }

  const addFaculty = () => {
    const newFaculty: Faculty = {
      id: Date.now().toString(),
      name: '',
      description: '',
      programs: []
    }
    setFormData({
      ...formData,
      faculties: [...(formData.faculties || []), newFaculty]
    })
  }

  const updateFaculty = (index: number, updates: Partial<Faculty>) => {
    const newFaculties = [...(formData.faculties || [])]
    newFaculties[index] = { ...newFaculties[index], ...updates }
    setFormData({ ...formData, faculties: newFaculties })
  }

  const removeFaculty = (index: number) => {
    const newFaculties = formData.faculties?.filter((_, i) => i !== index) || []
    setFormData({ ...formData, faculties: newFaculties })
  }

  const addFacility = () => {
    const facility = prompt('Enter facility name:')
    if (facility) {
      setFormData({
        ...formData,
        campusFacilities: [...(formData.campusFacilities || []), facility]
      })
    }
  }

  const removeFacility = (index: number) => {
    const newFacilities = formData.campusFacilities?.filter((_, i) => i !== index) || []
    setFormData({ ...formData, campusFacilities: newFacilities })
  }

  const addAccreditation = () => {
    const acc = prompt('Enter accreditation name:')
    if (acc) {
      setFormData({
        ...formData,
        accreditation: [...(formData.accreditation || []), acc]
      })
    }
  }

  const removeAccreditation = (index: number) => {
    const newAcc = formData.accreditation?.filter((_, i) => i !== index) || []
    setFormData({ ...formData, accreditation: newAcc })
  }

  const handleSave = async () => {
    if (!user) return

    setIsSaving(true)
    
    const universityData: University = {
      id: user.id,
      name: formData.name || '',
      city: formData.city || '',
      country: formData.country || '',
      rating: formData.rating || 4.0,
      programs: formData.programs || [],
      images: formData.images || [],
      description: formData.description || '',
      verified: formData.verified || false,
      aboutCity: formData.aboutCity,
      campuses: formData.campuses || [],
      faculties: formData.faculties || [],
      admissionRequirements: formData.admissionRequirements,
      applicationDeadline: formData.applicationDeadline,
      studentBodySize: formData.studentBodySize,
      campusFacilities: formData.campusFacilities || [],
      housing: formData.housing,
      contactInfo: formData.contactInfo || {},
      socialMedia: formData.socialMedia || {},
      accreditation: formData.accreditation || [],
      history: formData.history,
      mission: formData.mission,
      vision: formData.vision
    }

    // Save to localStorage
    localStorage.setItem(`unimerk_uni_${user.id}`, JSON.stringify(universityData))
    
    // Update user to link university
    await updateUser({ universityId: user.id })

    // Add to universities list in localStorage for display
    const allUnis = JSON.parse(localStorage.getItem('unimerk_all_universities') || '[]')
    const existingIndex = allUnis.findIndex((u: University) => u.id === universityData.id)
    if (existingIndex >= 0) {
      allUnis[existingIndex] = universityData
    } else {
      allUnis.push(universityData)
    }
    localStorage.setItem('unimerk_all_universities', JSON.stringify(allUnis))

    setMyUniversity(universityData)
    setIsSaving(false)
    alert('University information saved successfully!')
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (!user) {
    return null
  }

  const sections = [
    { id: 'basic', name: 'Basic Info' },
    { id: 'about', name: 'About & Description' },
    { id: 'city', name: 'About City' },
    { id: 'campuses', name: 'Campuses' },
    { id: 'faculties', name: 'Faculties' },
    { id: 'programs', name: 'Programs' },
    { id: 'admission', name: 'Admission' },
    { id: 'contact', name: 'Contact & Social' },
    { id: 'other', name: 'Additional Info' }
  ]

  return (
    <div className="pt-20 pb-16 min-h-screen bg-offwhite">
      {/* Hero Section */}
      <ScrollReveal>
        <section className="relative py-16 bg-gradient-to-br from-olive/30 via-white to-terracotta/30 mb-12 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <img 
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=800&fit=crop"
              alt="University Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="container-page relative z-10">
            <div className="max-w-6xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-charcoal mb-4">
                  {formData.name || 'University Profile Setup'}
                </h1>
                <p className="text-lg text-charcoal/70 mb-6">
                  Manage your comprehensive university information
                </p>
                <div className="flex items-center justify-center gap-4">
                  <span className="px-4 py-1.5 bg-olive/10 text-olive rounded-full text-sm font-medium">
                    University Representative
                  </span>
                  <span className="px-4 py-1.5 bg-sand text-charcoal rounded-full text-sm font-medium">
                    {user.name}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <div className="container-page">
        <div className="max-w-6xl mx-auto">
          {/* Section Navigation */}
          <div className="bg-white rounded-lg shadow-soft mb-8 overflow-x-auto">
            <div className="flex gap-2 px-4 py-2 border-b border-black/10">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    activeSection === section.id
                      ? 'bg-olive text-white'
                      : 'bg-offwhite text-charcoal/70 hover:bg-olive/10 hover:text-olive'
                  }`}
                >
                  {section.name}
                </button>
              ))}
            </div>
          </div>

          <ScrollReveal>
            <div className="ui-card p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-heading font-bold text-charcoal">{sections.find(s => s.id === activeSection)?.name}</h2>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-500/10 text-red-600 font-medium hover:bg-red-500/20 transition-all text-sm"
                >
                  Logout
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-8">
                
                {/* Basic Information */}
                {activeSection === 'basic' && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-charcoal mb-2">University Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name || ''}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                          placeholder="Addis Ababa University"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-charcoal mb-2">City *</label>
                        <input
                          type="text"
                          required
                          value={formData.city || ''}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                          placeholder="Addis Ababa"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-charcoal mb-2">Country</label>
                        <input
                          type="text"
                          value={formData.country || ''}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                          placeholder="Ethiopia"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-charcoal mb-2">Rating</label>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="5"
                          value={formData.rating || 4.0}
                          onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                          className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-charcoal mb-2">Student Body Size</label>
                        <input
                          type="number"
                          min="0"
                          value={formData.studentBodySize || ''}
                          onChange={(e) => setFormData({ ...formData, studentBodySize: parseInt(e.target.value) || undefined })}
                          className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                          placeholder="5000"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.verified || false}
                          onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                          className="w-5 h-5 text-olive rounded"
                        />
                        <label className="text-sm font-medium text-charcoal">Verified University</label>
                      </div>
                    </div>

                    {/* Images */}
                    <div>
                      <label className="block text-sm font-bold text-charcoal mb-4">University Images</label>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        {formData.images?.map((img, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={img}
                              alt={`University ${index + 1}`}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-6 py-3 rounded-lg bg-olive/10 text-olive font-medium hover:bg-olive/20 transition-all"
                      >
                        + Add Image
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        multiple
                      />
                    </div>
                  </div>
                )}

                {/* About & Description */}
                {activeSection === 'about' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-charcoal mb-2">University Description *</label>
                      <textarea
                        rows={6}
                        required
                        value={formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all resize-none"
                        placeholder="Write a comprehensive description of your university..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-charcoal mb-2">History</label>
                      <textarea
                        rows={4}
                        value={formData.history || ''}
                        onChange={(e) => setFormData({ ...formData, history: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all resize-none"
                        placeholder="University history and background..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-charcoal mb-2">Mission</label>
                      <textarea
                        rows={3}
                        value={formData.mission || ''}
                        onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all resize-none"
                        placeholder="University mission statement..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-charcoal mb-2">Vision</label>
                      <textarea
                        rows={3}
                        value={formData.vision || ''}
                        onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all resize-none"
                        placeholder="University vision statement..."
                      />
                    </div>
                  </div>
                )}

                {/* About City */}
                {activeSection === 'city' && (
                  <div>
                    <label className="block text-sm font-bold text-charcoal mb-2">About the City/Location</label>
                    <textarea
                      rows={8}
                      value={formData.aboutCity || ''}
                      onChange={(e) => setFormData({ ...formData, aboutCity: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all resize-none"
                      placeholder="Describe the city, location advantages, transportation, climate, culture, local attractions, etc..."
                    />
                  </div>
                )}

                {/* Campuses */}
                {activeSection === 'campuses' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-heading font-bold text-charcoal">Campus Locations</h3>
                      <button
                        type="button"
                        onClick={addCampus}
                        className="px-4 py-2 rounded-lg bg-olive text-white font-medium hover:bg-olive/90 transition-all"
                      >
                        + Add Campus
                      </button>
                    </div>
                    {formData.campuses?.map((campus, index) => (
                      <div key={campus.id || index} className="ui-card p-6 bg-offwhite">
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-bold text-charcoal mb-2">Campus Name *</label>
                            <input
                              type="text"
                              required
                              value={campus.name}
                              onChange={(e) => updateCampus(index, { name: e.target.value })}
                              className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                              placeholder="Main Campus"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-charcoal mb-2">City</label>
                            <input
                              type="text"
                              value={campus.city}
                              onChange={(e) => updateCampus(index, { city: e.target.value })}
                              className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-charcoal mb-2">Address</label>
                            <input
                              type="text"
                              value={campus.address}
                              onChange={(e) => updateCampus(index, { address: e.target.value })}
                              className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-charcoal mb-2">Phone</label>
                            <input
                              type="tel"
                              value={campus.phone || ''}
                              onChange={(e) => updateCampus(index, { phone: e.target.value })}
                              className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-charcoal mb-2">Email</label>
                            <input
                              type="email"
                              value={campus.email || ''}
                              onChange={(e) => updateCampus(index, { email: e.target.value })}
                              className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-charcoal mb-2">Description</label>
                            <textarea
                              rows={3}
                              value={campus.description || ''}
                              onChange={(e) => updateCampus(index, { description: e.target.value })}
                              className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all resize-none"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeCampus(index)}
                          className="px-4 py-2 rounded-lg bg-red-500/10 text-red-600 font-medium hover:bg-red-500/20 transition-all"
                        >
                          Remove Campus
                        </button>
                      </div>
                    ))}
                    {(!formData.campuses || formData.campuses.length === 0) && (
                      <div className="text-center py-8 text-charcoal/60">
                        No campuses added yet. Click "Add Campus" to get started.
                      </div>
                    )}
                  </div>
                )}

                {/* Faculties */}
                {activeSection === 'faculties' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-heading font-bold text-charcoal">Faculties/Departments</h3>
                      <button
                        type="button"
                        onClick={addFaculty}
                        className="px-4 py-2 rounded-lg bg-olive text-white font-medium hover:bg-olive/90 transition-all"
                      >
                        + Add Faculty
                      </button>
                    </div>
                    {formData.faculties?.map((faculty, index) => (
                      <div key={faculty.id || index} className="ui-card p-6 bg-offwhite">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-bold text-charcoal mb-2">Faculty Name *</label>
                            <input
                              type="text"
                              required
                              value={faculty.name}
                              onChange={(e) => updateFaculty(index, { name: e.target.value })}
                              className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                              placeholder="Faculty of Engineering"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-charcoal mb-2">Description</label>
                            <textarea
                              rows={3}
                              value={faculty.description || ''}
                              onChange={(e) => updateFaculty(index, { description: e.target.value })}
                              className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all resize-none"
                              placeholder="Description of the faculty..."
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFaculty(index)}
                          className="mt-4 px-4 py-2 rounded-lg bg-red-500/10 text-red-600 font-medium hover:bg-red-500/20 transition-all"
                        >
                          Remove Faculty
                        </button>
                      </div>
                    ))}
                    {(!formData.faculties || formData.faculties.length === 0) && (
                      <div className="text-center py-8 text-charcoal/60">
                        No faculties added yet. Click "Add Faculty" to get started.
                      </div>
                    )}
                  </div>
                )}

                {/* Programs */}
                {activeSection === 'programs' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-heading font-bold text-charcoal">Academic Programs</h3>
                      <button
                        type="button"
                        onClick={addProgram}
                        className="px-4 py-2 rounded-lg bg-olive text-white font-medium hover:bg-olive/90 transition-all"
                      >
                        + Add Program
                      </button>
                    </div>
                    {formData.programs?.map((program, index) => (
                      <div key={program.id || index} className="ui-card p-6 bg-offwhite">
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-bold text-charcoal mb-2">Program Name *</label>
                            <input
                              type="text"
                              required
                              value={program.name}
                              onChange={(e) => updateProgram(index, { name: e.target.value })}
                              className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                              placeholder="Computer Science"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-charcoal mb-2">Degree Type *</label>
                            <select
                              value={program.degree}
                              onChange={(e) => updateProgram(index, { degree: e.target.value as Program['degree'] })}
                              className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all bg-white"
                            >
                              <option value="BSc">BSc</option>
                              <option value="BA">BA</option>
                              <option value="LLB">LLB</option>
                              <option value="BEng">BEng</option>
                              <option value="MSc">MSc</option>
                              <option value="MA">MA</option>
                              <option value="PhD">PhD</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-charcoal mb-2">Duration (Years) *</label>
                            <input
                              type="number"
                              required
                              min="1"
                              max="10"
                              value={program.durationYears}
                              onChange={(e) => updateProgram(index, { durationYears: parseInt(e.target.value) })}
                              className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-charcoal mb-2">Language *</label>
                            <input
                              type="text"
                              required
                              value={program.language}
                              onChange={(e) => updateProgram(index, { language: e.target.value })}
                              className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                              placeholder="English"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeProgram(index)}
                          className="px-4 py-2 rounded-lg bg-red-500/10 text-red-600 font-medium hover:bg-red-500/20 transition-all"
                        >
                          Remove Program
                        </button>
                      </div>
                    ))}
                    {(!formData.programs || formData.programs.length === 0) && (
                      <div className="text-center py-8 text-charcoal/60">
                        No programs added yet. Click "Add Program" to get started.
                      </div>
                    )}
                  </div>
                )}

                {/* Admission */}
                {activeSection === 'admission' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-charcoal mb-2">Admission Requirements</label>
                      <textarea
                        rows={6}
                        value={formData.admissionRequirements || ''}
                        onChange={(e) => setFormData({ ...formData, admissionRequirements: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all resize-none"
                        placeholder="List admission requirements, GPA minimums, test scores, prerequisites, etc..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-charcoal mb-2">Application Deadline</label>
                      <input
                        type="text"
                        value={formData.applicationDeadline || ''}
                        onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                        placeholder="e.g., June 30, 2024"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-charcoal mb-2">Housing Information</label>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.housing?.available || false}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              housing: { ...formData.housing, available: e.target.checked } 
                            })}
                            className="w-5 h-5 text-olive rounded"
                          />
                          <label className="text-sm font-medium text-charcoal">Housing Available</label>
                        </div>
                        {formData.housing?.available && (
                          <textarea
                            rows={3}
                            value={formData.housing?.description || ''}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              housing: { ...formData.housing, description: e.target.value } 
                            })}
                            className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all resize-none"
                            placeholder="Describe housing options, availability, costs..."
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact & Social */}
                {activeSection === 'contact' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-heading font-bold text-charcoal mb-4">Contact Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-charcoal mb-2">Email</label>
                          <input
                            type="email"
                            value={formData.contactInfo?.email || ''}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              contactInfo: { ...formData.contactInfo, email: e.target.value } 
                            })}
                            className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-charcoal mb-2">Phone</label>
                          <input
                            type="tel"
                            value={formData.contactInfo?.phone || ''}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              contactInfo: { ...formData.contactInfo, phone: e.target.value } 
                            })}
                            className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-charcoal mb-2">Website</label>
                          <input
                            type="url"
                            value={formData.contactInfo?.website || ''}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              contactInfo: { ...formData.contactInfo, website: e.target.value } 
                            })}
                            className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                            placeholder="https://..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-charcoal mb-2">Address</label>
                          <input
                            type="text"
                            value={formData.contactInfo?.address || ''}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              contactInfo: { ...formData.contactInfo, address: e.target.value } 
                            })}
                            className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-charcoal mb-4">Social Media</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-charcoal mb-2">Facebook</label>
                          <input
                            type="url"
                            value={formData.socialMedia?.facebook || ''}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              socialMedia: { ...formData.socialMedia, facebook: e.target.value } 
                            })}
                            className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                            placeholder="https://facebook.com/..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-charcoal mb-2">Twitter/X</label>
                          <input
                            type="url"
                            value={formData.socialMedia?.twitter || ''}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              socialMedia: { ...formData.socialMedia, twitter: e.target.value } 
                            })}
                            className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                            placeholder="https://twitter.com/..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-charcoal mb-2">Instagram</label>
                          <input
                            type="url"
                            value={formData.socialMedia?.instagram || ''}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              socialMedia: { ...formData.socialMedia, instagram: e.target.value } 
                            })}
                            className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                            placeholder="https://instagram.com/..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-charcoal mb-2">LinkedIn</label>
                          <input
                            type="url"
                            value={formData.socialMedia?.linkedin || ''}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              socialMedia: { ...formData.socialMedia, linkedin: e.target.value } 
                            })}
                            className="w-full px-4 py-3 border-2 border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-olive/50 focus:border-olive transition-all"
                            placeholder="https://linkedin.com/company/..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Additional Info */}
                {activeSection === 'other' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-charcoal mb-2">Campus Facilities</label>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {formData.campusFacilities?.map((facility, index) => (
                          <span key={index} className="px-3 py-1 bg-olive/10 text-olive rounded-full text-sm flex items-center gap-2">
                            {facility}
                            <button
                              type="button"
                              onClick={() => removeFacility(index)}
                              className="hover:text-red-600"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={addFacility}
                        className="px-4 py-2 rounded-lg bg-olive/10 text-olive font-medium hover:bg-olive/20 transition-all"
                      >
                        + Add Facility
                      </button>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-charcoal mb-2">Accreditation</label>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {formData.accreditation?.map((acc, index) => (
                          <span key={index} className="px-3 py-1 bg-terracotta/10 text-terracotta rounded-full text-sm flex items-center gap-2">
                            {acc}
                            <button
                              type="button"
                              onClick={() => removeAccreditation(index)}
                              className="hover:text-red-600"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={addAccreditation}
                        className="px-4 py-2 rounded-lg bg-terracotta/10 text-terracotta font-medium hover:bg-terracotta/20 transition-all"
                      >
                        + Add Accreditation
                      </button>
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="flex gap-4 pt-6 border-t border-black/10">
                  <motion.button
                    type="submit"
                    disabled={isSaving}
                    className="px-10 py-4 rounded-lg bg-gradient-to-r from-olive to-terracotta text-white font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSaving ? 1 : 1.02 }}
                    whileTap={{ scale: isSaving ? 1 : 0.98 }}
                  >
                    {isSaving ? 'Saving...' : 'Save All Information'}
                  </motion.button>
                  {myUniversity && (
                    <Link
                      to={`/university/${myUniversity.id}`}
                      className="px-10 py-4 rounded-lg bg-sand text-charcoal font-bold hover:bg-sand/80 transition-all flex items-center"
                    >
                      View Public Profile
                    </Link>
                  )}
                </div>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}
