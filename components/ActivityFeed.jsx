import React, { useState, useEffect } from 'react'
import { Users, Calendar, Trophy, Clock, TrendingUp, Sparkles } from 'lucide-react'

const ActivityFeed = () => {
  const [currentActivity, setCurrentActivity] = useState(0)

  const activities = [
    {
      id: 1,
      type: 'registration',
      icon: Users,
      message: 'New registration for Battle of the Golds',
      time: '2 minutes ago',
      color: 'from-emerald-500 to-blue-600',
      emoji: '🏆'
    },
    {
      id: 2,
      type: 'event',
      icon: Calendar,
      message: 'Science Fair proposals deadline approaching',
      time: '15 minutes ago',
      color: 'from-blue-500 to-purple-600',
      emoji: '🔬'
    },
    {
      id: 3,
      type: 'announcement',
      icon: Trophy,
      message: 'New cultural event announced',
      time: '1 hour ago',
      color: 'from-purple-500 to-pink-600',
      emoji: '🎭'
    },
    {
      id: 4,
      type: 'milestone',
      icon: TrendingUp,
      message: '500+ registrations reached this month!',
      time: '2 hours ago',
      color: 'from-orange-500 to-red-600',
      emoji: '🎉'
    },
    {
      id: 5,
      type: 'upcoming',
      icon: Clock,
      message: 'Aluth Avurthu festival starts in 2 days',
      time: '3 hours ago',
      color: 'from-yellow-500 to-orange-600',
      emoji: '🕯️'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % activities.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [activities.length])

  return (
    <div className="relative">
      {/* Activity Feed Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
          Live Activity Feed
        </h3>
        <div className="flex space-x-1">
          {activities.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentActivity(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentActivity
                  ? 'bg-emerald-500 w-6'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Animated Activity Display */}
      <div className="relative h-20 overflow-hidden">
        {activities.map((activity, index) => {
          const Icon = activity.icon
          return (
            <div
              key={activity.id}
              className={`absolute inset-0 flex items-center p-4 rounded-lg transition-all duration-500 ${
                index === currentActivity
                  ? 'transform translate-y-0 opacity-100'
                  : index < currentActivity
                  ? 'transform -translate-y-full opacity-0'
                  : 'transform translate-y-full opacity-0'
              }`}
            >
              <div className={`w-full bg-gradient-to-r ${activity.color} p-0.5 rounded-lg`}>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full bg-gradient-to-r ${activity.color}`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        <span className="mr-1">{activity.emoji}</span>
                        {activity.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Stats Row */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">1,247</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Active Users</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">8</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Live Events</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">98%</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Satisfaction</div>
        </div>
      </div>
    </div>
  )
}

export default ActivityFeed