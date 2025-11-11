import React from 'react'
import { Calendar, User, AlertCircle, Info, CheckCircle } from 'lucide-react'
import { format } from 'date-fns'

const AnnouncementCard = ({ announcement }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'important':
        return AlertCircle
      case 'sports':
      case 'workshop':
      case 'academic':
        return CheckCircle
      default:
        return Info
    }
  }

  const getColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low':
        return 'text-blue-600 bg-blue-50 border-blue-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const Icon = getIcon(announcement.type)

  return (
    <div className="card h-full">
      <div className="card-body">
        <div className="flex items-start space-x-3 mb-4">
          <div className={`p-2 rounded-lg ${getColor(announcement.priority)}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-lg leading-tight">
              {announcement.title}
            </h3>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{format(new Date(announcement.date), 'MMM do, yyyy')}</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>{announcement.author}</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed">
          {announcement.content}
        </p>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            announcement.priority === 'high' ? 'bg-red-100 text-red-800' :
            announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)} Priority
          </span>
        </div>
      </div>
    </div>
  )
}

export default AnnouncementCard