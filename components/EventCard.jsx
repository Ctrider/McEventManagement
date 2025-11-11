import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Users, Clock, ArrowRight, Star } from 'lucide-react'
import { format } from 'date-fns'

const EventCard = ({ event, showFullDescription = false }) => {
  const isRegistrationOpen = new Date(event.registrationDeadline) > new Date()
  const spotsLeft = event.maxParticipants - event.currentRegistrations

  return (
    <div className="card group hover:shadow-lg transition-all duration-300">
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            event.category === 'Academic' ? 'bg-blue-100 text-blue-800' :
            event.category === 'Sports' ? 'bg-green-100 text-green-800' :
            event.category === 'Cultural' ? 'bg-purple-100 text-purple-800' :
            event.category === 'Workshop' ? 'bg-orange-100 text-orange-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {event.category}
          </span>
        </div>
        {event.featured && (
          <div className="absolute top-4 right-4">
            <div className="bg-yellow-400 text-yellow-900 p-1 rounded-full">
              <Star className="h-4 w-4" />
            </div>
          </div>
        )}
        {isRegistrationOpen && spotsLeft <= 10 && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
              Only {spotsLeft} spots left!
            </span>
          </div>
        )}
      </div>

      {/* Event Content */}
      <div className="card-body">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {event.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4">
          {showFullDescription ? event.description : event.shortDescription}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{format(new Date(event.date), 'EEEE, MMMM do, yyyy')}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-2" />
            <span>{event.currentRegistrations}/{event.maxParticipants} registered</span>
          </div>
        </div>

        {/* Registration Status */}
        {event.registrationRequired && (
          <div className="mb-4">
            {isRegistrationOpen ? (
              <div className="flex items-center text-green-600 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Registration open until {format(new Date(event.registrationDeadline), 'MMM do')}
              </div>
            ) : (
              <div className="flex items-center text-red-600 text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                Registration closed
              </div>
            )}
          </div>
        )}

        {/* Progress Bar for Registration */}
        {event.registrationRequired && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Registration Progress</span>
              <span>{Math.round((event.currentRegistrations / event.maxParticipants) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(event.currentRegistrations / event.maxParticipants) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {event.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            to={`/events/${event.id}`}
            className="flex-1 btn btn-primary text-center"
          >
            View Details
          </Link>
          {event.registrationRequired && isRegistrationOpen && (
            <Link
              to={`/register/${event.id}`}
              className="flex-1 btn btn-success text-center"
            >
              Register
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default EventCard