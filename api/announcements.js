// Vercel serverless function for announcements API

let announcements = [
  {
    id: '1',
    title: '🔥 Battle of the Golds 2024 - Registration Now Open!',
    content: 'The most anticipated event of the year is here! Registration for Battle of the Golds 2024 is now open. This is our signature inter-house competition featuring athletics, swimming, and team sports. Houses will compete for the coveted Gold Trophy. Early bird registration benefits available until December 10th!',
    type: 'important',
    date: '2024-11-15',
    author: 'Sports Committee & Student Council',
    priority: 'high'
  },
  {
    id: '2',
    title: '🏆 Annual Science & Technology Fair - Showcase Your Innovation',
    content: 'Showcase groundbreaking scientific innovations and technological projects. Special categories include Robotics, AI, Environmental Science, and Traditional Sri Lankan Engineering. Focus on sustainable solutions for our island nation. Project proposals due by December 10th.',
    type: 'academic',
    date: '2024-11-14',
    author: 'Science & Technology Department',
    priority: 'high'
  },
  {
    id: '3',
    title: '🎊 Sinhala & Tamil New Year Festival - Aluth Avurthu 2024',
    content: 'Celebrate our rich cultural heritage with traditional Avurru games, cultural performances, and authentic Sri Lankan cuisine. Features traditional games like Kanaama, Polmal, and Olinda Keliya. All students and families are welcome to participate in this beautiful celebration of unity.',
    type: 'cultural',
    date: '2024-11-13',
    author: 'Cultural Committee',
    priority: 'medium'
  },
  {
    id: '4',
    title: '🌱 Environment & Conservation Summit - Student Leadership',
    content: 'Join our student-led environmental summit focusing on Sri Lanka\'s unique biodiversity and climate change impacts. Research presentations, community action plans, and eco-innovation projects welcome. Registration closes December 12th.',
    type: 'workshop',
    date: '2024-11-12',
    author: 'Environmental Club & Geography Department',
    priority: 'medium'
  },
  {
    id: '5',
    title: '💻 Digital Innovation & Startup Fair - Young Entrepreneurs',
    content: 'Student entrepreneurs showcase digital solutions, mobile apps, and tech startups. Includes pitching sessions, investor networking, and mentorship from Sri Lankan tech industry leaders. Perfect opportunity for budding innovators!',
    type: 'workshop',
    date: '2024-11-11',
    author: 'Computer Science & Business Studies',
    priority: 'medium'
  },
  {
    id: '6',
    title: '🎭 Traditional Arts & Crafts Exhibition - Heritage Showcase',
    content: 'Experience traditional Sri Lankan arts including wood carving, pottery, mask making, and batik. Students demonstrate ancient techniques passed down through generations. Interactive workshops available for all visitors.',
    type: 'cultural',
    date: '2024-11-10',
    author: 'Art & Heritage Department',
    priority: 'low'
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
    const { priority, type } = req.query

    let filteredAnnouncements = [...announcements]

    if (priority) {
      filteredAnnouncements = filteredAnnouncements.filter(ann => ann.priority === priority)
    }

    if (type) {
      filteredAnnouncements = filteredAnnouncements.filter(ann => ann.type === type)
    }

    // Sort by date, newest first
    filteredAnnouncements.sort((a, b) => new Date(b.date) - new Date(a.date))

    res.status(200).json({
      success: true,
      data: filteredAnnouncements,
      total: filteredAnnouncements.length
    })
  } catch (error) {
    console.error('Error fetching announcements:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}