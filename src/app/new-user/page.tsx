import { currentUser } from '@clerk/nextjs'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'

async function createNewUser() {
  // checks if current user is represented in database and if not, creates a new user before redirecting to `journal` page
  const user = await currentUser()

  if (user) {
    const match = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    })

    if (!match) {
      // this is a new user
      await prisma.user.create({
        data: {
          clerkId: user.id,
          email: user.emailAddresses[0].emailAddress,
        },
      })
    }

    redirect('/journal')
  }
  // not signed in
  redirect('/sign-up')
}

export default async function NewUser() {
  await createNewUser()
  return null
}
