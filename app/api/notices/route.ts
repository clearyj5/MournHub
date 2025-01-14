import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    const notice = await prisma.deathNotice.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        maidenName: data.maidenName || null,
        age: data.age ? Number(data.age) : null,
        address1: data.address1,
        address2: data.address2 || null,
        town: data.town,
        county: data.county,
        deathDate: new Date(data.deathDate),
        reposing: data.reposing || null,
        removal: data.removal || null,
        funeral: data.funeral,
        burial: data.burial || null,
      }
    })

    return NextResponse.json(notice)
  } catch (error) {
    console.error('Failed to create notice:', error)
    return NextResponse.json(
      { error: 'Failed to create notice' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('q')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')

  const where = search ? {
    OR: [
      { firstName: { contains: search, mode: 'insensitive' } },
      { lastName: { contains: search, mode: 'insensitive' } },
      { address1: { contains: search, mode: 'insensitive' } },
      { address2: { contains: search, mode: 'insensitive' } },
      { town: { contains: search, mode: 'insensitive' } },
      { county: { contains: search, mode: 'insensitive' } },
    ],
  } : {}

  try {
    const [notices, total] = await Promise.all([
      prisma.deathNotice.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { condolences: true }
          }
        }
      }),
      prisma.deathNotice.count({ where })
    ])

    return NextResponse.json({
      notices,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        current: page
      }
    })
  } catch (error) {
    console.error('Failed to fetch notices:', error)
    return NextResponse.json(
      { error: 'Failed to fetch notices' },
      { status: 500 }
    )
  }
} 