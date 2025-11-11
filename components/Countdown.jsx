import React, { useState, useEffect } from 'react'

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const target = new Date(targetDate).getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = target - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <div className="flex justify-center space-x-4 md:space-x-8">
      <div className="text-center">
        <div className="bg-white rounded-lg p-3 shadow-sm min-w-[60px]">
          <div className="text-2xl md:text-3xl font-bold text-blue-600">{timeLeft.days}</div>
          <div className="text-xs text-gray-600 uppercase tracking-wide">Days</div>
        </div>
      </div>
      <div className="text-center">
        <div className="bg-white rounded-lg p-3 shadow-sm min-w-[60px]">
          <div className="text-2xl md:text-3xl font-bold text-blue-600">{timeLeft.hours}</div>
          <div className="text-xs text-gray-600 uppercase tracking-wide">Hours</div>
        </div>
      </div>
      <div className="text-center">
        <div className="bg-white rounded-lg p-3 shadow-sm min-w-[60px]">
          <div className="text-2xl md:text-3xl font-bold text-blue-600">{timeLeft.minutes}</div>
          <div className="text-xs text-gray-600 uppercase tracking-wide">Minutes</div>
        </div>
      </div>
      <div className="text-center">
        <div className="bg-white rounded-lg p-3 shadow-sm min-w-[60px]">
          <div className="text-2xl md:text-3xl font-bold text-blue-600">{timeLeft.seconds}</div>
          <div className="text-xs text-gray-600 uppercase tracking-wide">Seconds</div>
        </div>
      </div>
    </div>
  )
}

export default Countdown