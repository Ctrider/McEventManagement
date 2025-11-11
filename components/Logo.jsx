import React from 'react'
import { Calendar, Star, Trophy, Sparkles } from 'lucide-react'

const Logo = ({ size = 'md', showText = true, animated = true }) => {
  const sizes = {
    sm: { icon: 'h-6 w-6', text: 'text-lg' },
    md: { icon: 'h-8 w-8', text: 'text-xl' },
    lg: { icon: 'h-12 w-12', text: 'text-2xl' }
  }

  const currentSize = sizes[size] || sizes.md

  return (
    <div className="flex items-center space-x-2">
      <div className="relative group">
        <div className={`${currentSize.icon} bg-gradient-to-r from-emerald-500 via-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
          <Calendar className="h-5 w-5 text-white" />
          {animated && (
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          )}
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce"></div>
        {animated && (
          <>
            <div className="absolute -top-0.5 -left-0.5 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
            <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
          </>
        )}
      </div>
      {showText && (
        <div className="relative">
          <div className="flex items-center">
            <span className={`${currentSize.text} font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse`}>
              McEvent
            </span>
            <span className={`${currentSize.text} font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent`}>
              Management
            </span>
          </div>
          {animated && (
            <div className="absolute -top-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          )}
        </div>
      )}
    </div>
  )
}

export default Logo