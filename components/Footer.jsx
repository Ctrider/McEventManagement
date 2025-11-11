import React from 'react'
import { Calendar, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">McEventManagement</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              The digital command center for all school events. Stay informed, engaged, and never miss an important school happening.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-sm">info@mcevents.edu</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/events" className="text-gray-300 hover:text-white transition-colors">Events</a></li>
              <li><a href="/calendar" className="text-gray-300 hover:text-white transition-colors">Calendar</a></li>
              <li><a href="/announcements" className="text-gray-300 hover:text-white transition-colors">Announcements</a></li>
              <li><a href="/admin" className="text-gray-300 hover:text-white transition-colors">Admin</a></li>
            </ul>
          </div>

          {/* Event Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-300">Academic Events</span></li>
              <li><span className="text-gray-300">Sports Meets</span></li>
              <li><span className="text-gray-300">Cultural Programs</span></li>
              <li><span className="text-gray-300">Workshops</span></li>
              <li><span className="text-gray-300">Exhibitions</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 McEventManagement. All rights reserved. Built with React & Vite.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer