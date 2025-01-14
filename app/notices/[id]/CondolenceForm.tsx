'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function CondolenceForm({ noticeId }: { noticeId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      message: formData.get('message'),
      author: formData.get('author'),
      noticeId
    }

    try {
      const response = await fetch('/api/condolences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to post condolence')
      }
      
      formRef.current?.reset()
      router.refresh()
    } catch (error) {
      console.error('Error:', error)
      alert(error instanceof Error ? error.message : 'Failed to post condolence')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg mb-6">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Your Message</label>
        <textarea
          name="message"
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="Share your condolences..."
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Your Name</label>
        <input
          type="text"
          name="author"
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your name"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black dark:bg-white text-white dark:text-black py-2 px-4 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50"
      >
        {loading ? 'Posting...' : 'Post Condolence'}
      </button>
    </form>
  )
} 