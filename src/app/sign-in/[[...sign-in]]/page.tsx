import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <main className="grid min-h-screen place-content-center">
      <SignIn />
    </main>
  )
}
