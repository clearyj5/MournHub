import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Validate that noticeId exists
    const notice = await prisma.deathNotice.findUnique({
      where: { id: data.noticeId }
    })

    if (!notice) {
      return NextResponse.json(
        { error: 'Death notice not found' },
        { status: 404 }
      )
    }

    const condolence = await prisma.condolence.create({
      data: {
        message: data.message,
        author: data.author,
        notice: {
          connect: { id: data.noticeId }
        }
      }
    })

    return NextResponse.json(condolence)
  } catch (error) {
    console.error('Failed to create condolence:', error)
    return NextResponse.json(
      { error: 'Failed to create condolence' },
      { status: 500 }
    )
  }
} 