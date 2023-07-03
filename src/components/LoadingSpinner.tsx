import { Loader2 } from 'lucide-react'

export default function LoadingSpinner() {
  return (
    <div className="absolute bottom-4 right-4 animate-spin text-emerald-400/75">
      <Loader2 />
    </div>
  )
}
