import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, List } from 'lucide-react'
import { events } from '../data/events'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns'
import { Link } from 'react-router-dom'

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState('month') // 'month' or 'list'

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Get events for a specific date
  const getEventsForDate = (date) => {
    return events.filter(event => isSameDay(new Date(event.date), date))
  }

  const navigateMonth = (direction) => {
    setCurrentDate(direction === 'next' ? addMonths(currentDate, 1) : subMonths(currentDate, 1))
  }

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 10)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Event Calendar</h1>
              <p className="text-gray-600">
                View all school events in a calendar format
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('month')}
                className={`btn ${viewMode === 'month' ? 'btn-primary' : 'btn-secondary'}`}
              >
                <CalendarIcon className="h-4 w-4 mr-2" />
                Month View
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-secondary'}`}
              >
                <List className="h-4 w-4 mr-2" />
                List View
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {viewMode === 'month' ? (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            {/* Calendar Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="btn btn-secondary p-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="btn btn-secondary px-4"
                >
                  Today
                </button>
                <button
                  onClick={() => navigateMonth('next')}
                  className="btn btn-secondary p-2"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="p-6">
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {monthDays.map((date, index) => {
                  const dayEvents = getEventsForDate(date)
                  const isToday = isSameDay(date, new Date())

                  return (
                    <div
                      key={index}
                      className={`min-h-[100px] p-2 border border-gray-200 ${
                        !isSameMonth(date, currentDate) ? 'bg-gray-50 text-gray-400' : 'bg-white'
                      }`}
                    >
                      <div className={`text-sm font-medium mb-1 ${
                        isToday ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''
                      }`}>
                        {format(date, 'd')}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map((event, eventIndex) => (
                          <Link
                            key={eventIndex}
                            to={`/events/${event.id}`}
                            className={`block text-xs p-1 rounded text-white truncate ${
                              event.category === 'Academic' ? 'bg-blue-500' :
                              event.category === 'Sports' ? 'bg-green-500' :
                              event.category === 'Cultural' ? 'bg-purple-500' :
                              event.category === 'Workshop' ? 'bg-orange-500' :
                              'bg-gray-500'
                            }`}
                            title={event.title}
                          >
                            {event.title}
                          </Link>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="card-header">
              <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
              <p className="text-gray-600">Next 10 upcoming events</p>
            </div>
            <div className="card-body p-0">
              {upcomingEvents.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {upcomingEvents.map((event, index) => (
                    <Link
                      key={event.id}
                      to={`/events/${event.id}`}
                      className="block p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              event.category === 'Academic' ? 'bg-blue-100 text-blue-800' :
                              event.category === 'Sports' ? 'bg-green-100 text-green-800' :
                              event.category === 'Cultural' ? 'bg-purple-100 text-purple-800' :
                              event.category === 'Workshop' ? 'bg-orange-100 text-orange-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {event.category}
                            </span>
                            <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                          </div>
                          <p className="text-gray-600 mb-2">{format(new Date(event.date), 'EEEE, MMMM do, yyyy')} at {event.time}</p>
                          <p className="text-sm text-gray-500">{event.location}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500 mb-1">
                            {event.currentRegistrations}/{event.maxParticipants}
                          </div>
                          <div className="text-xs text-gray-400">registered</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center text-gray-500">
                  No upcoming events found.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-700">Academic</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-700">Sports</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span className="text-sm text-gray-700">Cultural</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span className="text-sm text-gray-700">Workshop</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-500 rounded"></div>
              <span className="text-sm text-gray-700">Exhibition</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar