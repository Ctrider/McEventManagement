import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { User, Mail, Phone, Users, CheckCircle, AlertCircle, Calendar } from 'lucide-react'
import { events } from '../data/events'
import { format } from 'date-fns'

const Registration = () => {
  const { eventId } = useParams()
  const event = events.find(e => e.id === eventId)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    grade: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    specialRequirements: '',
    agreeToTerms: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event not found</h1>
          <Link to="/events" className="btn btn-primary">
            Back to Events
          </Link>
        </div>
      </div>
    )
  }

  const isRegistrationOpen = new Date(event.registrationDeadline) > new Date()
  const spotsLeft = event.maxParticipants - event.currentRegistrations

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.grade.trim()) newErrors.grade = 'Grade is required'
    if (!formData.parentName.trim()) newErrors.parentName = 'Parent/Guardian name is required'
    if (!formData.parentEmail.trim()) newErrors.parentEmail = 'Parent/Guardian email is required'
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms'

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (formData.parentEmail && !emailRegex.test(formData.parentEmail)) {
      newErrors.parentEmail = 'Please enter a valid email address'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsSubmitted(true)
    } catch (error) {
      console.error('Registration failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  if (!isRegistrationOpen) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="card">
            <div className="card-body">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Registration Closed</h1>
              <p className="text-gray-600 mb-6">
                Registration for this event closed on {format(new Date(event.registrationDeadline), 'MMMM do, yyyy')}.
              </p>
              <Link to={`/events/${event.id}`} className="btn btn-primary">
                View Event Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="card">
            <div className="card-body">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Registration Successful!</h1>
              <p className="text-gray-600 mb-6">
                Thank you for registering for <strong>{event.title}</strong>. You will receive a confirmation email shortly.
              </p>
              <div className="space-y-3">
                <Link to={`/events/${event.id}`} className="btn btn-primary w-full">
                  View Event Details
                </Link>
                <Link to="/events" className="btn btn-secondary w-full">
                  Browse More Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-8">
          <Link to={`/events/${event.id}`} className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Event Details
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Event Registration</h1>
          <p className="text-gray-600">{event.title}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Registration Form */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="card-header">
                <h2 className="text-2xl font-bold text-gray-900">Registration Form</h2>
                <p className="text-gray-600">Please fill out all required fields</p>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Student Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Student Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label className="form-label">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`form-input ${errors.firstName ? 'border-red-500' : ''}`}
                        />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                      </div>
                      <div className="form-group">
                        <label className="form-label">Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`form-input ${errors.lastName ? 'border-red-500' : ''}`}
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label className="form-label">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Grade/Class *</label>
                      <select
                        name="grade"
                        value={formData.grade}
                        onChange={handleInputChange}
                        className={`form-input ${errors.grade ? 'border-red-500' : ''}`}
                      >
                        <option value="">Select Grade</option>
                        <option value="6">Grade 6</option>
                        <option value="7">Grade 7</option>
                        <option value="8">Grade 8</option>
                        <option value="9">Grade 9</option>
                        <option value="10">Grade 10</option>
                        <option value="11">Grade 11</option>
                        <option value="12">Grade 12</option>
                      </select>
                      {errors.grade && <p className="text-red-500 text-sm mt-1">{errors.grade}</p>}
                    </div>
                  </div>

                  {/* Parent/Guardian Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      Parent/Guardian Information
                    </h3>
                    <div className="form-group">
                      <label className="form-label">Parent/Guardian Name *</label>
                      <input
                        type="text"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleInputChange}
                        className={`form-input ${errors.parentName ? 'border-red-500' : ''}`}
                      />
                      {errors.parentName && <p className="text-red-500 text-sm mt-1">{errors.parentName}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label className="form-label">Parent/Guardian Email *</label>
                        <input
                          type="email"
                          name="parentEmail"
                          value={formData.parentEmail}
                          onChange={handleInputChange}
                          className={`form-input ${errors.parentEmail ? 'border-red-500' : ''}`}
                        />
                        {errors.parentEmail && <p className="text-red-500 text-sm mt-1">{errors.parentEmail}</p>}
                      </div>
                      <div className="form-group">
                        <label className="form-label">Parent/Guardian Phone</label>
                        <input
                          type="tel"
                          name="parentPhone"
                          value={formData.parentPhone}
                          onChange={handleInputChange}
                          className="form-input"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                    <div className="form-group">
                      <label className="form-label">Special Requirements or Allergies</label>
                      <textarea
                        name="specialRequirements"
                        value={formData.specialRequirements}
                        onChange={handleInputChange}
                        rows="3"
                        className="form-input"
                        placeholder="Please list any allergies, dietary restrictions, or special accommodations needed..."
                      />
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="form-group">
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        className={`mt-1 ${errors.agreeToTerms ? 'border-red-500' : ''}`}
                      />
                      <span className="text-sm text-gray-700">
                        I agree to the <a href="#" className="text-blue-600 hover:text-blue-800">terms and conditions</a> and{' '}
                        <a href="#" className="text-blue-600 hover:text-blue-800">privacy policy</a>. I consent to receive
                        event-related communications via email and SMS. *
                      </span>
                    </label>
                    {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full"
                  >
                    {isSubmitting ? 'Submitting...' : 'Complete Registration'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Event Summary Sidebar */}
          <div>
            <div className="card sticky top-8">
              <div className="card-header">
                <h3 className="text-lg font-semibold">Event Summary</h3>
              </div>
              <div className="card-body space-y-4">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-32 object-cover rounded"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{event.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{event.category}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{format(new Date(event.date), 'MMM do, yyyy')}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Time:</strong> {event.time}
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Location:</strong> {event.location}
                  </div>
                </div>

                {/* Spots Remaining */}
                {spotsLeft <= 10 && (
                  <div className="bg-red-50 border border-red-200 rounded p-3">
                    <div className="flex items-center text-red-800">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      <span className="font-medium">Only {spotsLeft} spots left!</span>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600">
                    Registration deadline: {format(new Date(event.registrationDeadline), 'MMM do, yyyy')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registration