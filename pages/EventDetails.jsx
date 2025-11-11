import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, MapPin, Clock, Users, Mail, ArrowLeft, Share2, Heart, Star, CheckCircle } from 'lucide-react'
import { events } from '../data/events'
import { format } from 'date-fns'
import Countdown from '../components/Countdown'

const EventDetails = () => {
  const { id } = useParams()
  const event = events.find(e => e.id === id)

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event not found</h1>
          <Link to="/events" className="btn btn-primary">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Link>
        </div>
      </div>
    )
  }

  const isRegistrationOpen = new Date(event.registrationDeadline) > new Date()
  const spotsLeft = event.maxParticipants - event.currentRegistrations
  const registrationProgress = (event.currentRegistrations / event.maxParticipants) * 100

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Event link copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <div className="text-white">
              <div className="flex items-center mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium mr-4 ${
                  event.category === 'Academic' ? 'bg-blue-100 text-blue-800' :
                  event.category === 'Sports' ? 'bg-green-100 text-green-800' :
                  event.category === 'Cultural' ? 'bg-purple-100 text-purple-800' :
                  event.category === 'Workshop' ? 'bg-orange-100 text-orange-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {event.category}
                </span>
                {event.featured && (
                  <div className="flex items-center text-yellow-300">
                    <Star className="h-4 w-4 mr-1" />
                    <span className="text-sm">Featured Event</span>
                  </div>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.title}</h1>
              <p className="text-xl text-gray-200 max-w-3xl">{event.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/events"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Events
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Event Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="card">
                <div className="card-body text-center">
                  <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">Date & Time</h3>
                  <p className="text-gray-600">{format(new Date(event.date), 'EEEE, MMMM do, yyyy')}</p>
                  <p className="text-gray-600">{event.time}</p>
                </div>
              </div>
              <div className="card">
                <div className="card-body text-center">
                  <MapPin className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                  <p className="text-gray-600">{event.location}</p>
                </div>
              </div>
            </div>

            {/* Registration Progress */}
            {event.registrationRequired && (
              <div className="card mb-8">
                <div className="card-header">
                  <h3 className="text-lg font-semibold">Registration Status</h3>
                </div>
                <div className="card-body">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      {event.currentRegistrations} of {event.maxParticipants} registered
                    </span>
                    <span className="text-sm font-medium">
                      {Math.round(registrationProgress)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${registrationProgress}%` }}
                    ></div>
                  </div>
                  {isRegistrationOpen ? (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span>Registration open until {format(new Date(event.registrationDeadline), 'MMM do, yyyy')}</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      <span>Registration closed</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Schedule */}
            {event.schedule && (
              <div className="card mb-8">
                <div className="card-header">
                  <h3 className="text-lg font-semibold">Event Schedule</h3>
                </div>
                <div className="card-body">
                  <div className="space-y-4">
                    {event.schedule.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium min-w-[80px] text-center">
                          {item.time}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900">{item.activity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="card">
              <div className="card-body">
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Countdown */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold">Countdown to Event</h3>
              </div>
              <div className="card-body">
                <Countdown targetDate={event.date} />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {event.registrationRequired && isRegistrationOpen && (
                <Link
                  to={`/register/${event.id}`}
                  className="btn btn-success w-full text-center"
                >
                  Register for Event
                </Link>
              )}
              <button
                onClick={handleShare}
                className="btn btn-secondary w-full"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Event
              </button>
            </div>

            {/* Contact Info */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold">Contact Information</h3>
              </div>
              <div className="card-body space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900">Organizer</h4>
                  <p className="text-gray-600">{event.organizer}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Contact Email</h4>
                  <a
                    href={`mailto:${event.contactEmail}`}
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    {event.contactEmail}
                  </a>
                </div>
              </div>
            </div>

            {/* Spots Warning */}
            {isRegistrationOpen && spotsLeft <= 10 && (
              <div className="card border-l-4 border-l-red-500 bg-red-50">
                <div className="card-body">
                  <div className="flex items-center text-red-800">
                    <Users className="h-5 w-5 mr-2" />
                    <span className="font-medium">Only {spotsLeft} spots left!</span>
                  </div>
                  <p className="text-red-700 text-sm mt-1">
                    Register now to secure your spot.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetails