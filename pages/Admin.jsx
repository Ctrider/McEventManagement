import React, { useState } from 'react'
import { Plus, Edit, Trash2, Users, Calendar, BarChart3, Settings, Eye } from 'lucide-react'
import { events, announcements } from '../data/events'

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showAddEvent, setShowAddEvent] = useState(false)

  const stats = {
    totalEvents: events.length,
    upcomingEvents: events.filter(e => e.status === 'upcoming').length,
    totalRegistrations: events.reduce((acc, e) => acc + e.currentRegistrations, 0),
    totalCapacity: events.reduce((acc, e) => acc + e.maxParticipants, 0),
    totalAnnouncements: announcements.length
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="card-body text-center">
            <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stats.totalEvents}</div>
            <div className="text-sm text-gray-600">Total Events</div>
          </div>
        </div>
        <div className="card">
          <div className="card-body text-center">
            <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stats.upcomingEvents}</div>
            <div className="text-sm text-gray-600">Upcoming Events</div>
          </div>
        </div>
        <div className="card">
          <div className="card-body text-center">
            <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stats.totalRegistrations}</div>
            <div className="text-sm text-gray-600">Total Registrations</div>
          </div>
        </div>
        <div className="card">
          <div className="card-body text-center">
            <BarChart3 className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {Math.round((stats.totalRegistrations / stats.totalCapacity) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Capacity Utilization</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
        </div>
        <div className="card-body">
          <div className="space-y-4">
            {events.slice(0, 5).map((event, index) => (
              <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">{event.title}</p>
                    <p className="text-sm text-gray-600">{event.currentRegistrations} new registrations</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderEvents = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Event Management</h2>
        <button
          onClick={() => setShowAddEvent(true)}
          className="btn btn-primary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Event
        </button>
      </div>

      <div className="card">
        <div className="card-body p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">Event</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">Date</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">Registrations</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {events.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-gray-900">{event.title}</div>
                        <div className="text-sm text-gray-600">{event.category}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-900">{event.date}</td>
                    <td className="py-4 px-6">
                      <div className="text-sm">
                        <div className="font-medium">{event.currentRegistrations}/{event.maxParticipants}</div>
                        <div className="text-gray-600">
                          {Math.round((event.currentRegistrations / event.maxParticipants) * 100)}%
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        event.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                        event.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-800">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAnnouncements = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Announcement Management</h2>
        <button className="btn btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          New Announcement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="card">
            <div className="card-body">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
                <div className="flex space-x-1">
                  <button className="text-green-600 hover:text-green-800">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-3">{announcement.content.substring(0, 100)}...</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{announcement.author}</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  announcement.priority === 'high' ? 'bg-red-100 text-red-800' :
                  announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {announcement.priority}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>

      {/* Event Category Distribution */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold">Event Category Distribution</h3>
        </div>
        <div className="card-body">
          <div className="space-y-4">
            {['Academic', 'Sports', 'Cultural', 'Workshop', 'Exhibition'].map((category) => {
              const categoryEvents = events.filter(e => e.category === category)
              const count = categoryEvents.length
              const percentage = (count / events.length) * 100
              return (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-gray-700">{category}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{count}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Registration Trends */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold">Registration Performance</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.slice(0, 4).map((event) => {
              const percentage = (event.currentRegistrations / event.maxParticipants) * 100
              return (
                <div key={event.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{event.title.substring(0, 30)}...</span>
                    <span className="text-gray-600">{Math.round(percentage)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">
            Manage events, registrations, and announcements
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="flex space-x-8 px-6">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'events', label: 'Events', icon: Calendar },
              { id: 'announcements', label: 'Announcements', icon: Settings },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'events' && renderEvents()}
        {activeTab === 'announcements' && renderAnnouncements()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>
    </div>
  )
}

export default Admin