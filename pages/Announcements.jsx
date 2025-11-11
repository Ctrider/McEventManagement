import React, { useState } from 'react'
import { Search, Filter, Bell, Calendar, User, AlertCircle } from 'lucide-react'
import { announcements } from '../data/events'
import AnnouncementCard from '../components/AnnouncementCard'

const Announcements = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPriority, setSelectedPriority] = useState('all')
  const [selectedType, setSelectedType] = useState('all')

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.author.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPriority = selectedPriority === 'all' || announcement.priority === selectedPriority
    const matchesType = selectedType === 'all' || announcement.type === selectedType

    return matchesSearch && matchesPriority && matchesType
  })

  const priorityStats = {
    high: announcements.filter(a => a.priority === 'high').length,
    medium: announcements.filter(a => a.priority === 'medium').length,
    low: announcements.filter(a => a.priority === 'low').length
  }

  const typeStats = {
    important: announcements.filter(a => a.type === 'important').length,
    academic: announcements.filter(a => a.type === 'academic').length,
    sports: announcements.filter(a => a.type === 'sports').length,
    cultural: announcements.filter(a => a.type === 'cultural').length,
    workshop: announcements.filter(a => a.type === 'workshop').length
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Announcements</h1>
              <p className="text-gray-600">
                Stay updated with the latest news and important information
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-gray-600">
              <Bell className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Priority Banner */}
        {priorityStats.high > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <span className="text-red-800 font-medium">
                {priorityStats.high} high priority announcement{priorityStats.high !== 1 ? 's' : ''} need your attention
              </span>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10"
              />
            </div>

            {/* Priority Filter */}
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="form-input"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="form-input"
            >
              <option value="all">All Types</option>
              <option value="important">Important</option>
              <option value="academic">Academic</option>
              <option value="sports">Sports</option>
              <option value="cultural">Cultural</option>
              <option value="workshop">Workshop</option>
            </select>
          </div>

          {/* Active Filters Display */}
          <div className="mt-4 flex flex-wrap gap-2">
            {searchTerm && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                Search: "{searchTerm}"
                <button
                  onClick={() => setSearchTerm('')}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            )}
            {selectedPriority !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-800">
                Priority: {selectedPriority}
                <button
                  onClick={() => setSelectedPriority('all')}
                  className="ml-2 text-red-600 hover:text-red-800"
                >
                  ×
                </button>
              </span>
            )}
            {selectedType !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                Type: {selectedType}
                <button
                  onClick={() => setSelectedType('all')}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredAnnouncements.length}</span> of{' '}
            <span className="font-semibold">{announcements.length}</span> announcements
          </p>
        </div>

        {/* Announcements Grid */}
        {filteredAnnouncements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAnnouncements.map(announcement => (
              <AnnouncementCard key={announcement.id} announcement={announcement} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No announcements found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters to find announcements.
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedPriority('all')
                setSelectedType('all')
              }}
              className="btn btn-primary"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Statistics */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Announcement Statistics</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Priority Distribution */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">By Priority</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">High Priority</span>
                  <span className="font-semibold text-red-600">{priorityStats.high}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Medium Priority</span>
                  <span className="font-semibold text-yellow-600">{priorityStats.medium}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Low Priority</span>
                  <span className="font-semibold text-blue-600">{priorityStats.low}</span>
                </div>
              </div>
            </div>

            {/* Type Distribution */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">By Type</h4>
              <div className="space-y-2">
                {Object.entries(typeStats).map(([type, count]) => (
                  <div key={type} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 capitalize">{type}</span>
                    <span className="font-semibold text-gray-900">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Announcements