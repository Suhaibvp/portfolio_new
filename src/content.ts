/**
 * Edit this file to update the portfolio.
 * Empty strings and empty arrays are omitted from the site, so you can fill
 * them in whenever you have the detail (photo, Play Store, extra bio, etc.).
 */
export type SocialLink = {
  label: string
  href: string
  hint?: string
}

export type Stat = {
  value: string
  label: string
}

export type Project = {
  id: string
  name: string
  tag: string
  period?: string
  summary: string
  highlights: string[]
  tech: string[]
  accent: 'brass' | 'signal' | 'iris' | 'ember'
  /** Optional live / store / case-study URL */
  href?: string
}

export type Role = {
  title: string
  company: string
  location: string
  period: string
  projects: Project[]
}

export type SkillGroup = {
  name: string
  items: string[]
}

export type Certification = {
  name: string
  issuer: string
  year?: string
}

export type Testimonial = {
  quote: string
  name: string
  role: string
}

/** Works on both GitHub Pages (/repo/) and Vercel (/). */
const withBase = (path: string) => {
  if (!path || path.startsWith('http')) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

/**
 * Single source of truth for the portfolio.
 * Empty strings / empty arrays stay hidden — fill them in when you have the detail.
 */
export const profile = {
  firstName: 'Suhaib',
  lastName: 'VP',
  role: 'Android Developer',
  headline: 'Native Android for devices that live in the real world.',
  location: 'Bengaluru, Karnataka, India',
  availability: 'Immediate joiner',
  years: '3.5',
  email: 'suhaibvp9895@gmail.com',
  phone: '+91 98951 62766',
  phoneRaw: '9895162766',
  resumeUrl: withBase('Suhaib_VP_Resume.pdf'),

  /**
   * Drop a square portrait into /public (e.g. portrait.jpg)
   * then set this to 'portrait.jpg'
   */
  photo: withBase(''),

  tagline:
    'I build production Android apps that talk to hardware — BLE, GPS, cameras, and cloud — with architecture that stays maintainable years later.',

  extraAbout:
    '', // A second paragraph if you want to add more of your story.

  domains: ['IoT', 'Automotive', 'Sports tech', 'Computer vision'],

  socials: [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/suhaib-vp' },
    { label: 'GitHub', href: 'https://github.com/Suhaibvp' },
    { label: 'Play Store', href: '' }, // Add your developer page URL
    { label: 'Website', href: '' },
  ] satisfies SocialLink[],

  stats: [
    { value: '3.5', label: 'Years building Android' },
    { value: '4+', label: 'Production products shipped' },
    { value: '1', label: 'National championship live' },
    { value: 'Go', label: 'Ready to join immediately' },
  ] satisfies Stat[],
}

export const experience: Role[] = [
  {
    title: 'Senior Software Engineer',
    company: 'InThings Technologies',
    location: 'Karinkallathani, Kerala',
    period: 'Jan 2023 — May 2026',
    projects: [
      {
        id: 'drsafe',
        name: 'ADASOne & DrSafe',
        tag: 'Automotive safety',
        summary:
          'A dual-application Android suite for driver safety — BLE device control, live telemetry, GPS, and synchronized video — evolved from ADASOne into the production DrSafe product.',
        highlights: [
          'End-to-end BLE layer: scanning, OTA firmware delivery, ESP camera and hub configuration, with Kotlin Coroutines and Services so the UI never blocks.',
          'MVVM architecture with synchronized video playback, real-time speed/RPM graphing, and GPS tracking.',
          'NavGraph navigation and modular structure so both apps can grow without becoming unmaintainable.',
          'Jetpack Compose screens introduced alongside existing views to modernize the UI gradually.',
        ],
        tech: [
          'Kotlin',
          'Java',
          'MVVM',
          'BLE',
          'Coroutines',
          'Jetpack Compose',
          'Services',
          'Navigation',
          'REST',
          'GPS',
        ],
        accent: 'ember',
      },
      {
        id: 'onesense',
        name: 'Onesense Configuration',
        tag: 'IoT · native rewrite',
        summary:
          'A dedicated native Kotlin app that replaced a cross-platform build, giving the client a faster, more native way to configure IoT hardware.',
        highlights: [
          'BLE and Wi-Fi device configuration, including OTA firmware updates.',
          'QR-based device verification with ZXing and Google ML Kit.',
          'Cloud-to-physical device mapping through local REST APIs.',
        ],
        tech: [
          'Kotlin',
          'BLE',
          'Wi-Fi Manager',
          'REST',
          'ZXing',
          'OTA',
          'ML Kit',
        ],
        accent: 'signal',
      },
      {
        id: 'shooting',
        name: 'Shooting Sports Tracker',
        tag: 'Sports · computer vision',
        summary:
          'Multi-role competition software for guest, coach, and student — interactive shot marking, live scoring, climate inputs, and analytics.',
        highlights: [
          'Computer vision + Google ML Kit pipeline that auto-detects shot positions and extracts scores from images.',
          'Performance analytics with competitor-level trends, graphs, and comparative metrics.',
          'Unit tests around core scoring logic.',
        ],
        tech: [
          'Kotlin',
          'Jetpack Compose',
          'XML',
          'Firebase',
          'ML Kit',
          'Computer Vision',
        ],
        accent: 'iris',
      },
      {
        id: 'athleon',
        name: 'Athleon',
        tag: 'National sports platform',
        summary:
          'The first digital competition system for Indian national deaf sports — live at the 2025 National Deaf Shooting Championship in Ahmedabad.',
        highlights: [
          'Real-time competition management deployed on the championship floor.',
          'Official Letter of Appreciation from the All India Sports Council of the Deaf (AISCD), a Ministry of Youth Affairs & Sports recognized body.',
        ],
        tech: ['Firebase', 'Realtime sync'],
        accent: 'brass',
      },
    ],
  },
  {
    title: 'Full Stack Development Intern',
    company: 'Zoople Technologies',
    location: 'Ernakulam, Kerala',
    period: 'Jun 2022 — Dec 2022',
    projects: [
      {
        id: 'zoople',
        name: 'API-first backend',
        tag: 'Internship',
        summary:
          'RESTful APIs and PostgreSQL work in Python Django — the backend counterpart to the Android clients I build today.',
        highlights: [
          'Designed maintainable Django REST endpoints and data models.',
          'Query optimization and performance work on PostgreSQL.',
          'Full-stack collaboration that still informs how I consume APIs on Android.',
        ],
        tech: ['Python', 'Django', 'PostgreSQL', 'REST'],
        accent: 'signal',
      },
    ],
  },
]

export const skills: SkillGroup[] = [
  {
    name: 'Languages',
    items: ['Kotlin', 'Java', 'SQL', 'Dart'],
  },
  {
    name: 'Android',
    items: [
      'Android SDK',
      'Jetpack Compose',
      'MVVM',
      'Coroutines',
      'Hilt',
      'Navigation',
      'Services',
      'JUnit',
      'Mockito',
    ],
  },
  {
    name: 'Devices & sensing',
    items: [
      'BLE',
      'Wi-Fi Manager',
      'OTA updates',
      'GPS & Maps',
      'Google ML Kit',
      'QR (ZXing)',
    ],
  },
  {
    name: 'Architecture',
    items: ['MVVM', 'MVP', 'Repository', 'Clean Architecture', 'OOP'],
  },
  {
    name: 'Data & cloud',
    items: ['REST APIs', 'Firebase', 'SQLite / Room', 'PostgreSQL', 'MySQL'],
  },
  {
    name: 'Also fluent in',
    items: ['Flutter', '.NET MAUI', 'Xamarin', 'Python Django', 'Git', 'Play Console'],
  },
]

export const education = {
  degree: 'Bachelor of Computer Applications',
  school: 'Calicut University',
  place: 'Calicut, Kerala',
  period: '2019 — 2022',
}

export const recognition = {
  title: 'Letter of Appreciation',
  body: 'Received from the All India Sports Council of the Deaf for delivering the first digital competition system used at the 2025 National Deaf Shooting Championship (AISCD, Ahmedabad).',
  org: 'AISCD · Ministry of Youth Affairs & Sports, Government of India',
}

/** Optional — add entries and they appear automatically */
export const certifications: Certification[] = [
  // { name: 'Associate Android Developer', issuer: 'Google', year: '2024' },
]

export const spokenLanguages: string[] = [
  // 'English', 'Malayalam', 'Hindi'
]

export const interests: string[] = [
  // 'Open source Android', 'Motorsport telemetry', 'Photography'
]

export const testimonials: Testimonial[] = [
  // {
  //   quote: '…',
  //   name: 'Name',
  //   role: 'Title, Company',
  // },
]

export const featuredProjects = experience.flatMap((role) => role.projects)
