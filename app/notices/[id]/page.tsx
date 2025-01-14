import { prisma } from '@/lib/prisma'
import { format } from 'date-fns'
import { notFound } from 'next/navigation'
import { NoticeWithCount, Condolence } from '@/types'
import CondolenceForm from './CondolenceForm'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function NoticePage({ params }: PageProps) {
  const { id } = await params
  
  const notice = await prisma.deathNotice.findUnique({
    where: { id },
    include: {
      condolences: {
        orderBy: { createdAt: 'desc' }
      },
      _count: {
        select: { condolences: true }
      }
    }
  })

  if (!notice) {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm">
        <h1 className="text-3xl font-bold mb-2">
          {notice.firstName} {notice.lastName}
          {notice.maidenName && <span className="text-gray-500 dark:text-gray-400 text-xl"> (née {notice.maidenName})</span>}
        </h1>
        
        <div className="space-y-4 mt-6">
          <p className="text-gray-600 dark:text-gray-300">
            {[notice.address1, notice.address2, notice.town, notice.county].filter(Boolean).join(', ')}
          </p>
          
          <p className="text-gray-600 dark:text-gray-300">
            Passed away on {format(notice.deathDate, 'MMMM do, yyyy')}
            {notice.age && ` at the age of ${notice.age}`}
          </p>

          {notice.reposing && (
            <div>
              <h3 className="font-semibold mb-1">Reposing</h3>
              <p className="text-gray-600 dark:text-gray-300">{notice.reposing}</p>
            </div>
          )}

          {notice.removal && (
            <div>
              <h3 className="font-semibold mb-1">Removal</h3>
              <p className="text-gray-600 dark:text-gray-300">{notice.removal}</p>
            </div>
          )}

          {notice.funeral && (
            <div>
              <h3 className="font-semibold mb-1">Funeral</h3>
              <p className="text-gray-600 dark:text-gray-300">{notice.funeral}</p>
            </div>
          )}

          {notice.burial && (
            <div>
              <h3 className="font-semibold mb-1">Burial</h3>
              <p className="text-gray-600 dark:text-gray-300">{notice.burial}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Condolences</h2>
        <CondolenceForm noticeId={notice.id} />
        <div className="space-y-4">
          {notice.condolences.map((condolence: Condolence) => (
            <div key={condolence.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-600 dark:text-gray-300 mb-2">{condolence.message}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                - {condolence.author}, {format(condolence.createdAt, 'MMMM do, yyyy')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 