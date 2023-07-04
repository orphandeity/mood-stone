'use client'

import { useState, useEffect } from 'react'

export default function CurrentDate() {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    let timer = setInterval(() => setDate(new Date()), 1000 * 60)
    return () => clearInterval(timer)
  })

  return (
    <p className="text-lg font-thin">
      {date.toLocaleDateString('en-us', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        // hour: 'numeric',
        // minute: 'numeric',
      })}
    </p>
  )
}
