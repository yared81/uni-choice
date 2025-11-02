import { TFunction } from 'i18next'

/**
 * Translates university-related data (names, cities, countries, programs)
 * Falls back to original value if translation not found
 */

// Mapping of common university names to their translation keys
const universityNameMap: Record<string, string> = {
  'addis ababa university': 'addis_ababa_university',
  'bahir dar university': 'bahir_dar_university',
  'university of gondar': 'university_of_gondar',
  'jimma university': 'jimma_university',
  'hawassa university': 'hawassa_university',
}

export function translateUniversityName(name: string, t: TFunction): string {
  const normalized = name.toLowerCase().trim()
  const key = universityNameMap[normalized] || normalized.replace(/\s+/g, '_')
  const translationKey = `universities.data.${key}`
  const translated = t(translationKey, { defaultValue: '' })
  return translated || name
}

export function translateCity(city: string, t: TFunction): string {
  const key = city.toLowerCase().trim().replace(/\s+/g, '_')
  const translationKey = `universities.data.city.${key}`
  const translated = t(translationKey, { defaultValue: '' })
  return translated || city
}

export function translateCountry(country: string, t: TFunction): string {
  const key = country.toLowerCase().trim().replace(/\s+/g, '_')
  const translationKey = `universities.data.country.${key}`
  const translated = t(translationKey, { defaultValue: '' })
  return translated || country
}

export function translateProgramName(programName: string, t: TFunction): string {
  const key = programName.toLowerCase().trim().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')
  const translationKey = `universities.data.program.${key}`
  const translated = t(translationKey, { defaultValue: '' })
  return translated || programName
}

export function translateCampusDescription(uniId: string, campusId: string, description: string, t: TFunction): string {
  const translationKey = `universities_data.${uniId}.campuses.${campusId}.description`
  const translated = t(translationKey, { defaultValue: '' })
  return translated || description
}

export function translateFacultyDescription(uniId: string, facultyId: string, description: string, t: TFunction): string {
  const translationKey = `universities_data.${uniId}.faculties.${facultyId}.description`
  const translated = t(translationKey, { defaultValue: '' })
  return translated || description
}

export function translateAdmissionRequirements(uniId: string, requirements: string, t: TFunction): string {
  const translationKey = `universities_data.${uniId}.admission_requirements`
  const translated = t(translationKey, { defaultValue: '' })
  return translated || requirements
}

export function translateApplicationDeadline(uniId: string, deadline: string, t: TFunction): string {
  const translationKey = `universities_data.${uniId}.application_deadline`
  const translated = t(translationKey, { defaultValue: '' })
  return translated || deadline
}

export function translateHousingDescription(uniId: string, description: string, t: TFunction): string {
  const translationKey = `universities_data.${uniId}.housing_description`
  const translated = t(translationKey, { defaultValue: '' })
  return translated || description
}

export function translateDescription(uniId: string, description: string, t: TFunction): string {
  const translationKey = `universities_data.${uniId}.description`
  const translated = t(translationKey, { defaultValue: '' })
  return translated || description
}

export function translateMission(uniId: string, mission: string, t: TFunction): string {
  const translationKey = `universities_data.${uniId}.mission`
  const translated = t(translationKey, { defaultValue: '' })
  return translated || mission
}

export function translateVision(uniId: string, vision: string, t: TFunction): string {
  const translationKey = `universities_data.${uniId}.vision`
  const translated = t(translationKey, { defaultValue: '' })
  return translated || vision
}

export function translateHistory(uniId: string, history: string, t: TFunction): string {
  const translationKey = `universities_data.${uniId}.history`
  const translated = t(translationKey, { defaultValue: '' })
  return translated || history
}

export function translateAboutCity(uniId: string, aboutCity: string, t: TFunction): string {
  const translationKey = `universities_data.${uniId}.about_city`
  const translated = t(translationKey, { defaultValue: '' })
  return translated || aboutCity
}

