import { auth } from '@clerk/nextjs'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { userId } = auth()
  console.log(userId)
  return NextResponse.json({ data: { id: 'satan' } })
}
