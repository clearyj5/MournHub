'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const COUNTIES = [
  'Antrim', 'Armagh', 'Carlow', 'Cavan', 'Clare', 'Cork', 'Derry', 'Donegal', 
  'Down', 'Dublin', 'Fermanagh', 'Galway', 'Kerry', 'Kildare', 'Kilkenny', 
  'Laois', 'Leitrim', 'Limerick', 'Longford', 'Louth', 'Mayo', 'Meath', 
  'Monaghan', 'Offaly', 'Roscommon', 'Sligo', 'Tipperary', 'Tyrone', 
  'Waterford', 'Westmeath', 'Wexford', 'Wicklow'
]

export default function NewNotice() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      maidenName: formData.get('maidenName'),
      age: formData.get('age') ? Number(formData.get('age')) : null,
      address1: formData.get('address1'),
      address2: formData.get('address2'),
      town: formData.get('town'),
      county: formData.get('county'),
      deathDate: formData.get('deathDate'),
      reposing: formData.get('reposing'),
      removal: formData.get('removal'),
      funeral: formData.get('funeral'),
      burial: formData.get('burial')
    }

    try {
      const response = await fetch('/api/notices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to create notice')

      router.push('/')
    } catch (error) {
      console.error('Error:', error)
      setError('Failed to create notice. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Post a Death Notice</h1>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">First Name *</label>
            <input
              type="text"
              name="firstName"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Last Name *</label>
            <input
              type="text"
              name="lastName"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Maiden Name (if applicable)</label>
            <input
              type="text"
              name="maidenName"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Age</label>
            <input
              type="number"
              name="age"
              min="0"
              max="150"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Address</h3>
          <div>
            <label className="block text-sm font-medium mb-2">Address Line 1 *</label>
            <input
              type="text"
              name="address1"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Address Line 2</label>
            <input
              type="text"
              name="address2"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Town *</label>
              <input
                type="text"
                name="town"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">County *</label>
              <select
                name="county"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a county</option>
                {COUNTIES.map(county => (
                  <option key={county} value={county}>{county}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Date of Death *</label>
          <input
            type="date"
            name="deathDate"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Funeral Arrangements</h3>
          
          <div>
            <label className="block text-sm font-medium mb-2">Reposing Details</label>
            <textarea
              name="reposing"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="e.g., Reposing at Smith's Funeral Home on Monday from 4pm to 7pm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Removal Details</label>
            <textarea
              name="removal"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="e.g., Removal on Tuesday morning to St. Mary's Church"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Funeral Details *</label>
            <textarea
              name="funeral"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="e.g., Funeral Mass on Tuesday at 11am followed by burial"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Burial Details</label>
            <textarea
              name="burial"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="e.g., Burial afterwards in St. Mary's Cemetery"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black dark:bg-white text-white dark:text-black py-3 px-4 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Death Notice'}
        </button>
      </form>
    </div>
  )
} 