import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <main className="grid min-h-screen place-content-center">
      <SignUp />
    </main>
  )
}
