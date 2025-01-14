import { prisma } from '@/lib/prisma'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { NoticeWithCount } from '@/types'
import MapSection from './MapSection'

async function getRecentNotices() {
  return await prisma.deathNotice.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20,
    include: {
      _count: {
        select: { condolences: true }
      }
    }
  })
}

export default async function Home() {
  const notices = await getRecentNotices()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <section className="mb-12">
        <div className="text-center max-w-2xl mx-auto mb-12 relative z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm py-4 rounded-2xl">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Death Notices Ireland
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            A modern and respectful way to share and find death notices, since RIP.ie are charging...
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative z-0 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
            <MapSection />
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm relative z-10">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Notices</h2>
              <div className="grid gap-6">
                {notices.map((notice: NoticeWithCount) => (
                  <Link
                    key={notice.id}
                    href={`/notices/${notice.id}`}
                    className="group block bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
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
                      {formatDistanceToNow(notice.createdAt, { addSuffix: true })}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
