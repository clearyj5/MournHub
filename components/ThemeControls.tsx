'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export default function ThemeControls() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [fontSize, setFontSize] = useState(0)

  useEffect(() => {
    setMounted(true)
    const savedSize = localStorage.getItem('font-size') || '0'
    setFontSize(parseInt(savedSize))
    document.querySelector('main')?.style.setProperty('font-size', `${100 + parseInt(savedSize)}%`)
  }, [])

  const adjustFontSize = (adjustment: number) => {
    const newSize = fontSize + adjustment
    if (newSize >= -2 && newSize <= 2) {
      setFontSize(newSize)
      localStorage.setItem('font-size', newSize.toString())
      document.querySelector('main')?.style.setProperty('font-size', `${100 + (newSize * 10)}%`)
    }
  }

  if (!mounted) return null

  return (
    <div className="flex items-center space-x-2 text-base" style={{ fontSize: '16px' }}>
      <button
        onClick={() => adjustFontSize(-1)}
        className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        aria-label="Decrease font size"
        style={{ fontSize: '16px' }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>
      <button
        onClick={() => adjustFontSize(1)}
        className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        aria-label="Increase font size"
        style={{ fontSize: '16px' }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        aria-label="Toggle dark mode"
        style={{ fontSize: '16px' }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {theme === 'dark' ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          )}
        </svg>
      </button>
    </div>
  )
} 