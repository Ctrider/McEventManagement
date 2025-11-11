// Vercel serverless function for events API

// In-memory data storage for Vercel (will reset on cold starts)
let events = [
  {
    id: '1',
    title: 'Battle of the Golds 2024',
    description: 'The ultimate inter-house competition featuring athletics, swimming, and team sports. Our annual signature event where houses compete for the coveted Gold Trophy. Includes traditional Sinhala and Tamil cultural elements alongside modern sports.',
    shortDescription: 'Ultimate inter-house competition for the Gold Trophy',
    category: 'Sports',
    date: '2024-12-20',
    time: '07:00 AM - 06:00 PM',
    location: 'School Stadium & Sports Complex',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    registrationRequired: true,
    registrationDeadline: '2024-12-15',
    maxParticipants: 400,
    currentRegistrations: 312,
    organizer: 'Sports Committee & Student Council',
    contactEmail: 'sports@mcevents.edu',
    status: 'upcoming',
    featured: true,
    tags: ['sports', 'competition', 'athletics', 'tradition', 'gold-trophy'],
    schedule: [
      { time: '07:00 AM', activity: 'Opening Ceremony & House March' },
      { time: '08:00 AM', activity: 'Track & Field Events' },
      { time: '10:30 AM', activity: 'Swimming Competitions' },
      { time: '12:30 PM', activity: 'Cultural Performance Break' },
      { time: '01:30 PM', activity: 'Team Sports (Volleyball, Basketball)' },
      { time: '04:00 PM', activity: 'Relay Races' },
      { time: '05:30 PM', activity: 'Awards & Closing Ceremony' }
    ]
  },
  {
    id: '2',
    title: 'Annual Science & Technology Fair',
    description: 'Showcase groundbreaking scientific innovations and technological projects. Features categories in Robotics, AI, Environmental Science, and Traditional Sri Lankan Engineering. Special focus on sustainable solutions for our island nation.',
    shortDescription: 'Innovative science projects with Sri Lankan focus',
    category: 'Academic',
    date: '2024-12-15',
    time: '09:00 AM - 05:00 PM',
    location: 'Science Complex & Innovation Labs',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    registrationRequired: true,
    registrationDeadline: '2024-12-10',
    maxParticipants: 150,
    currentRegistrations: 87,
    organizer: 'Science & Technology Department',
    contactEmail: 'science@mcevents.edu',
    status: 'upcoming',
    featured: true,
    tags: ['science', 'technology', 'innovation', 'robotics', 'sustainability'],
    schedule: [
      { time: '09:00 AM', activity: 'Project Setup & Judging' },
      { time: '11:00 AM', activity: 'Public Exhibition Opens' },
      { time: '01:00 PM', activity: 'Student Presentations' },
      { time: '03:00 PM', activity: 'Innovation Awards' },
      { time: '04:30 PM', activity: 'Future Scientists Recognition' }
    ]
  },
  {
    id: '3',
    title: 'Sinhala & Tamil New Year Festival - Aluth Avurthu 2024',
    description: 'Celebrate our rich cultural heritage with traditional Avurru games, cultural performances, authentic Sri Lankan cuisine, and inter-ethnic harmony activities. Features traditional games like Kanaama, Polmal, and Olinda Keliya.',
    shortDescription: 'Traditional Sri Lankan New Year celebration',
    category: 'Cultural',
    date: '2024-12-22',
    time: '09:00 AM - 08:00 PM',
    location: 'School Grounds & Cultural Center',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    registrationRequired: false,
    maxParticipants: 800,
    currentRegistrations: 456,
    organizer: 'Cultural Committee',
    contactEmail: 'culture@mcevents.edu',
    status: 'upcoming',
    featured: true,
    tags: ['culture', 'new-year', 'tradition', 'sri-lankan', 'heritage'],
    schedule: [
      { time: '09:00 AM', activity: 'Avurru Opening Ceremony' },
      { time: '10:00 AM', activity: 'Traditional Games Begin' },
      { time: '12:00 PM', activity: 'Cultural Dance Performances' },
      { time: '02:00 PM', activity: 'Traditional Food Festival' },
      { time: '04:00 PM', activity: 'Music & Drama' },
      { time: '06:00 PM', activity: 'Community Unity Event' },
      { time: '07:30 PM', activity: 'Grand Cultural Finale' }
    ]
  },
  {
    id: '4',
    title: 'Inter-School Debate Championship',
    description: 'Annual debating championship featuring both English and Sinhala debates. Topics include contemporary Sri Lankan issues, global affairs, and youth perspectives. Winners represent the school in national competitions.',
    shortDescription: 'Premier debating competition with national representation',
    category: 'Academic',
    date: '2024-12-18',
    time: '09:00 AM - 06:00 PM',
    location: 'Main Auditorium',
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    registrationRequired: true,
    registrationDeadline: '2024-12-14',
    maxParticipants: 64,
    currentRegistrations: 48,
    organizer: 'English & Sinhala Departments',
    contactEmail: 'debate@mcevents.edu',
    status: 'upcoming',
    featured: false,
    tags: ['debate', 'academics', 'public-speaking', 'competition'],
    schedule: [
      { time: '09:00 AM', activity: 'Registration & Briefing' },
      { time: '10:00 AM', activity: 'Preliminary Rounds' },
      { time: '01:00 PM', activity: 'Quarter Finals' },
      { time: '03:00 PM', activity: 'Semi Finals' },
      { time: '05:00 PM', activity: 'Final Debate & Awards' }
    ]
  },
  {
    id: '5',
    title: 'Traditional Arts & Crafts Exhibition',
    description: 'Showcase traditional Sri Lankan arts including wood carving, pottery, mask making, and batik. Students demonstrate ancient techniques passed down through generations. Interactive workshops for visitors.',
    shortDescription: 'Traditional Sri Lankan arts and crafts showcase',
    category: 'Cultural',
    date: '2024-12-19',
    time: '10:00 AM - 06:00 PM',
    location: 'Art Gallery & Cultural Workshops',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=2058&q=80',
    registrationRequired: false,
    maxParticipants: 300,
    currentRegistrations: 167,
    organizer: 'Art & Heritage Department',
    contactEmail: 'arts@mcevents.edu',
    status: 'upcoming',
    featured: false,
    tags: ['arts', 'crafts', 'heritage', 'traditional', 'sri-lankan'],
    schedule: [
      { time: '10:00 AM', activity: 'Exhibition Opens' },
      { time: '11:00 AM', activity: 'Live Demonstrations' },
      { time: '01:00 PM', activity: 'Interactive Workshops' },
      { time: '03:00 PM', activity: 'Master Craftsmen Sessions' },
      { time: '05:00 PM', activity: 'Closing & Recognition' }
    ]
  },
  {
    id: '6',
    title: 'Environment & Conservation Summit',
    description: 'Student-led environmental summit focusing on Sri Lanka\'s unique biodiversity, climate change impacts, and sustainable development. Features research presentations, community action plans, and eco-innovation projects.',
    shortDescription: 'Student environmental leadership and sustainability',
    category: 'Workshop',
    date: '2024-12-16',
    time: '08:30 AM - 05:00 PM',
    location: 'Environmental Studies Center',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    registrationRequired: true,
    registrationDeadline: '2024-12-12',
    maxParticipants: 120,
    currentRegistrations: 89,
    organizer: 'Environmental Club & Geography Department',
    contactEmail: 'environment@mcevents.edu',
    status: 'upcoming',
    featured: false,
    tags: ['environment', 'sustainability', 'climate', 'conservation', 'leadership'],
    schedule: [
      { time: '08:30 AM', activity: 'Registration & Green Pledge' },
      { time: '09:00 AM', activity: 'Opening Keynote' },
      { time: '10:30 AM', activity: 'Research Presentations' },
      { time: '01:00 PM', activity: 'Workshop Sessions' },
      { time: '03:30 PM', activity: 'Action Planning' },
      { time: '04:30 PM', activity: 'Green Awards Ceremony' }
    ]
  },
  {
    id: '7',
    title: 'Mathematics Olympiad & Problem Solving',
    description: 'Advanced mathematics competition featuring pure mathematics, applied mathematics, and mathematical modeling. Special emphasis on problem-solving techniques used in international mathematical competitions.',
    shortDescription: 'Advanced mathematics competition and problem solving',
    category: 'Academic',
    date: '2024-12-17',
    time: '09:00 AM - 04:00 PM',
    location: 'Mathematics Complex',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    registrationRequired: true,
    registrationDeadline: '2024-12-13',
    maxParticipants: 80,
    currentRegistrations: 62,
    organizer: 'Mathematics Department',
    contactEmail: 'math@mcevents.edu',
    status: 'upcoming',
    featured: false,
    tags: ['mathematics', 'olympiad', 'problem-solving', 'competition'],
    schedule: [
      { time: '09:00 AM', activity: 'Individual Competition' },
      { time: '11:30 AM', activity: 'Team Problem Solving' },
      { time: '01:00 PM', activity: 'Lunch Break' },
      { time: '02:00 PM', activity: 'Mathematical Modeling' },
      { time: '03:30 PM', activity: 'Awards & Recognition' }
    ]
  },
  {
    id: '8',
    title: 'Digital Innovation & Startup Fair',
    description: 'Student entrepreneurs showcase their digital solutions, mobile apps, and tech startups. Includes pitching sessions, investor networking, and mentorship from Sri Lankan tech industry leaders.',
    shortDescription: 'Student tech startups and digital innovation showcase',
    category: 'Workshop',
    date: '2024-12-21',
    time: '10:00 AM - 06:00 PM',
    location: 'Innovation Hub & Tech Labs',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    registrationRequired: true,
    registrationDeadline: '2024-12-16',
    maxParticipants: 100,
    currentRegistrations: 73,
    organizer: 'Computer Science & Business Studies',
    contactEmail: 'innovation@mcevents.edu',
    status: 'upcoming',
    featured: false,
    tags: ['startup', 'technology', 'innovation', 'entrepreneurship', 'digital'],
    schedule: [
      { time: '10:00 AM', activity: 'Startup Pitches Round 1' },
      { time: '12:00 PM', activity: 'Tech Demonstrations' },
      { time: '01:30 PM', activity: 'Mentor Networking' },
      { time: '03:00 PM', activity: 'Startup Pitches Round 2' },
      { time: '05:00 PM', activity: 'Investment Awards' }
    ]
  }
]

module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    const { category, status, search, featured } = req.query

    let filteredEvents = [...events]

    if (category && category !== 'All') {
      filteredEvents = filteredEvents.filter(event => event.category === category)
    }

    if (status) {
      filteredEvents = filteredEvents.filter(event => event.status === status)
    }

    if (featured === 'true') {
      filteredEvents = filteredEvents.filter(event => event.featured)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredEvents = filteredEvents.filter(event =>
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower)
      )
    }

    // Sort by date
    filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date))

    res.status(200).json({
      success: true,
      data: filteredEvents,
      total: filteredEvents.length
    })
  } catch (error) {
    console.error('Error fetching events:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}