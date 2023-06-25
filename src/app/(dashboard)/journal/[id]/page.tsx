export default function EntryPage({ params }: { params: { id: string } }) {
  return (
    <main>
      <span className="text-xs italic text-red-600">
        journal entry page {`{ id: ${params.id} }`}
      </span>
    </main>
  )
}
