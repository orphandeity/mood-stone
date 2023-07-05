import { auth } from '@clerk/nextjs'
import { prisma } from './db'

export async function getUserByClerkID() {
  const { userId } = await auth()
  if (userId) {
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    })
    if (user) return user
    else throw new Error('no user found')
  } else {
    throw new Error('something went wrong')
  }
}
