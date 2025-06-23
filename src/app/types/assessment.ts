export interface AssessmentData {
  relationship: string
  occupancyType: string
  ageRange: string
  livingSituation: string
  timeline: string
  challenges: string[]
  supportNeeded: string[]
  primaryConcerns: string[]
  needsRoundTheClock: string
  wanderingConcerns: string
  memoryDiagnosis: string
  financialConsiderations: string[]
  readinessToMove: string
}

export interface Question {
  id: string
  text: string
  options: string[]
  subtitle?: string
  isMultipleChoice?: boolean
}

export interface CareRecommendation {
  type: 'Memory Care' | 'Assisted Living'
  title: string
  description: string
  suiteImages: string[]
  features: string[]
}

export interface ContactInfo {
  name: string
  phone: string
  email: string
  bestTimeToContact: string
} 