// Vercel serverless function for statistics API

let events = [
  // Same event data as in events.js
]

let announcements = [
  // Same announcement data as in announcements.js
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
    const stats = {
      totalEvents: events.length,
      upcomingEvents: events.filter(e => e.status === 'upcoming').length,
      totalRegistrations: events.reduce((acc, e) => acc + e.currentRegistrations, 0),
      totalCapacity: events.reduce((acc, e) => acc + e.maxParticipants, 0),
      totalAnnouncements: announcements.length,
      eventsByCategory: events.reduce((acc, event) => {
        acc[event.category] = (acc[event.category] || 0) + 1
        return acc
      }, {}),
      registrationRate: events.length > 0 ?
        Math.round((events.reduce((acc, e) => acc + e.currentRegistrations, 0) /
        events.reduce((acc, e) => acc + e.maxParticipants, 0)) * 100) : 0
    }

    res.status(200).json({
      success: true,
      data: stats
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}