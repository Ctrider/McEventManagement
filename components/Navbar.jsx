import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Calendar, Menu, X, Bell, Users, Home, Sparkles } from 'lucide-react'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/', icon: Home, color: 'from-emerald-500 to-blue-600' },
    { name: 'Events', href: '/events', icon: Calendar, color: 'from-blue-500 to-purple-600' },
    { name: 'Calendar', href: '/calendar', icon: Calendar, color: 'from-purple-500 to-pink-600' },
    { name: 'Announcements', href: '/announcements', icon: Bell, color: 'from-orange-500 to-red-600' },
    { name: 'Admin', href: '/admin', icon: Users, color: 'from-gray-500 to-gray-700' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-xl border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Animated Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Logo size="md" showText={true} animated={true} />
            <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Sparkles className="h-4 w-4 text-yellow-500 animate-pulse" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group relative flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? 'text-white shadow-lg transform scale-105'
                      : 'text-gray-700 dark:text-gray-300 hover:text-white hover:shadow-md hover:scale-105'
                  }`}
                  style={{
                    background: isActive(item.href)
                      ? `linear-gradient(135deg, ${item.color.split(' ')[1]}, ${item.color.split(' ')[3]})`
                      : 'transparent'
                  }}
                >
                  {/* Animated background on hover */}
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                  <div className="relative flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span className="relative z-10">{item.name}</span>
                  </div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </Link>
              )
            })}

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
            >
              <div className="relative">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                <div className="absolute inset-0 rounded-full animate-ping bg-emerald-400 opacity-20"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200/50 dark:border-gray-700/50">
            {navigation.map((item, index) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`group relative flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-all duration-300 transform ${
                    isActive(item.href)
                      ? 'text-white shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:text-white hover:shadow-md'
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    background: isActive(item.href)
                      ? `linear-gradient(135deg, ${item.color.split(' ')[1]}, ${item.color.split(' ')[3]})`
                      : 'transparent'
                  }}
                >
                  {/* Animated background on hover */}
                  <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                  <div className="relative flex items-center space-x-3">
                    <Icon className="h-5 w-5" />
                    <span className="relative z-10">{item.name}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar