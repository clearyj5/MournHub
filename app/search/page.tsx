'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { NoticeWithCount } from '@/types'
import { formatDistanceToNow } from 'date-fns'

export default function Search() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '')
  const [results, setResults] = useState<NoticeWithCount[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const searchQuery = searchParams.get('q')
    if (searchQuery) {
      performSearch(searchQuery)
    }
  }, [searchParams])

  async function performSearch(query: string) {
    setLoading(true)
    try {
      const response = await fetch(`/api/notices?q=${encodeURIComponent(query)}`)
      const data = await response.json()
      setResults(data.notices)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Search Death Notices</h1>
        
        <form onSubmit={handleSearch} className="mb-12">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or location..."
              className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            />
            <svg
              className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          
          <div className="mt-4 flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('')
                setResults([])
                router.push('/search')
              }}
              className="flex-1 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-full text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Clear
            </button>
          </div>
        </form>

        {loading ? (
          <div className="text-center text-gray-600 dark:text-gray-400">
            Searching...
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-6">
            {results.map((notice) => (
              <Link
                key={notice.id}
                href={`/notices/${notice.id}`}
                className="block bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {notice.firstName} {notice.lastName}
                    </h2>
                    {notice.maidenName && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        née {notice.maidenName}
                      </p>
                    )}
                  </div>
                  <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-2 py-1 text-xs text-blue-600 dark:text-blue-400">
                    {notice._count.condolences} condolences
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {[notice.address1, notice.address2, notice.town, notice.county].filter(Boolean).join(', ')}
                </p>
                
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {formatDistanceToNow(new Date(notice.createdAt), { addSuffix: true })}
                </div>
              </Link>
            ))}
          </div>
        ) : searchParams.get('q') ? (
          <div className="text-center text-gray-600 dark:text-gray-400">
            No results found for "{searchParams.get('q')}"
          </div>
        ) : null}
      </div>
    </div>
  )
} 