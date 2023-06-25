function createURL(path: string) {
  return window.location.origin + path
}

export async function createNewEntry() {
  const res = await fetch(
    new Request(createURL('/api/journal'), { method: 'POST' })
  )

  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}
