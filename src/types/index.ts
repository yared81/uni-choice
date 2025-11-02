export type Role = 'guest' | 'student' | 'university'

export interface Program {
  id: string
  name: string
  degree: 'BSc' | 'BA' | 'LLB' | 'BEng' | 'MSc' | 'MA' | 'PhD'
  durationYears: number
  language: string
}

export interface Campus {
  id: string
  name: string
  address: string
  city: string
  phone?: string
  email?: string
  description?: string
}

export interface Faculty {
  id: string
  name: string
  description?: string
  programs?: string[] // Programs offered in this faculty
}

export interface University {
  id: string
  name: string
  city: string
  country?: string
  rating: number
  programs: Program[]
  images: string[]
  description: string
  verified?: boolean
  // Detailed Information
  aboutCity?: string // Information about the city/location
  campuses?: Campus[]
  faculties?: Faculty[]
  admissionRequirements?: string
  applicationDeadline?: string
  studentBodySize?: number
  campusFacilities?: string[]
  housing?: {
    available: boolean
    description?: string
  }
  contactInfo?: {
    email?: string
    phone?: string
    website?: string
    address?: string
  }
  socialMedia?: {
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
  }
  accreditation?: string[]
  history?: string
  mission?: string
  vision?: string
  // Legacy field for backwards compatibility (optional)
  tuition?: { minUsd: number; maxUsd: number }
}

export interface Review {
  id: string
  uniId: string
  author: string
  rating: number
  comment: string
  date: string
  helpfulCount: number
  verified?: boolean
}

