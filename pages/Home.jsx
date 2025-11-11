import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Users, MapPin, Clock, ArrowRight, Star, Trophy, BookOpen } from 'lucide-react'
import { events, announcements } from '../data/events'
import EventCard from '../components/EventCard'
import Countdown from '../components/Countdown'
import AnnouncementCard from '../components/AnnouncementCard'
import Logo from '../components/Logo'
import ActivityFeed from '../components/ActivityFeed'

const Home = () => {
  const featuredEvents = events.filter(event => event.featured).slice(0, 3)
  const recentAnnouncements = announcements.slice(0, 3)
  const nextEvent = events.find(event => new Date(event.date) > new Date())

  const stats = [
    { label: 'Total Events', value: '25+', icon: Calendar, color: 'text-blue-600' },
    { label: 'Active Registrations', value: '1,200+', icon: Users, color: 'text-green-600' },
    { label: 'Student Participants', value: '800+', icon: Users, color: 'text-purple-600' },
    { label: 'Event Categories', value: '6', icon: BookOpen, color: 'text-orange-600' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-blue-700 to-purple-800">
          <div className="absolute inset-0 bg-black/20"></div>

          {/* Floating Elements */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

          {/* Animated Grid */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              animation: 'grid-move 20s linear infinite'
            }}></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center max-w-5xl mx-auto">
            <div className="mb-8 animate-bounce">
              <Logo size="lg" showText={false} animated={true} />
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="block text-white animate-pulse">Welcome to</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 animate-pulse delay-500">
                McEventManagement
              </span>
            </h1>

            <p className="text-xl md:text-2xl lg:text-3xl mb-12 text-emerald-100 max-w-4xl mx-auto leading-relaxed">
              Your digital command center for all school events. Stay informed, engaged, and never miss an important happening.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/events"
                className="group relative overflow-hidden bg-white text-emerald-600 hover:text-white px-10 py-5 text-xl font-bold rounded-full shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-3">
                  <span>Explore Events</span>
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </Link>

              <Link
                to="/calendar"
                className="group relative overflow-hidden bg-transparent border-3 border-white text-white hover:bg-white hover:text-emerald-600 px-10 py-5 text-xl font-bold rounded-full transform hover:scale-105 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-white/10 rounded-full"></div>
                <div className="relative flex items-center space-x-3">
                  <Calendar className="h-6 w-6" />
                  <span>View Calendar</span>
                </div>
              </Link>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Event Countdown */}
      {nextEvent && (
        <section className="relative py-16 bg-gradient-to-r from-emerald-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-b">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Next Event</h2>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 max-w-3xl mx-auto shadow-2xl border border-white/20">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-gradient-to-r from-emerald-500 to-blue-600 p-3 rounded-full">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{nextEvent.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 flex items-center justify-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {nextEvent.date} at {nextEvent.time}
                </p>
                <Countdown targetDate={nextEvent.date} />
                <div className="mt-6">
                  <Link
                    to={`/events/${nextEvent.id}`}
                    className="btn btn-primary inline-flex items-center"
                  >
                    View Event Details
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Interactive Activity Feed Section */}
      <section className="py-16 bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Activity Feed */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
              <ActivityFeed />
            </div>

            {/* Platform Statistics */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">Platform Statistics</h2>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <div key={index} className="group">
                      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                        <div className="relative">
                          <Icon className={`h-10 w-10 ${stat.color} mx-auto mb-4 group-hover:animate-bounce`} />
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-20 animate-pulse"></div>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Events</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the most exciting upcoming events and activities at our school
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/events" className="btn btn-primary">
              View All Events
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-sm border text-center hover:shadow-md transition-shadow">
              <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Event Calendar</h3>
              <p className="text-gray-600 mb-6">View all upcoming events in an interactive calendar format</p>
              <Link to="/calendar" className="btn btn-primary">Open Calendar</Link>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm border text-center hover:shadow-md transition-shadow">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Register for Events</h3>
              <p className="text-gray-600 mb-6">Secure your spot in upcoming events and activities</p>
              <Link to="/events" className="btn btn-success">Register Now</Link>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-sm border text-center hover:shadow-md transition-shadow">
              <Star className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Latest Updates</h3>
              <p className="text-gray-600 mb-6">Stay informed with the latest announcements and news</p>
              <Link to="/announcements" className="btn btn-secondary">View Updates</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Announcements */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Announcements</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Important updates and news from the school administration
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentAnnouncements.map(announcement => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/announcements" className="btn btn-primary">
              View All Announcements
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home