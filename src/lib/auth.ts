import { auth } from '@clerk/nextjs'
import { prisma } from './db'

export async function getUserByClerkID() {
  const { userId } = await auth()
  if (userId) {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        clerkId: userId,
      },
    })

    return user
  } else {
    throw new Error('Something went wrong.')
  }
}
