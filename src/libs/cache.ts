export function readFromCache<T> (key: string): T | null {
  try {
    const storedData = window.localStorage.getItem(key)
    if (storedData != null) return JSON.parse(storedData) as T
  } catch (error) {
    console.error(`Error reading from cache: ${String(error)}`)
  }
  return null
}

function expirationTime (): number {
  // Expires in 1 day by default
  return new Date().getTime() + 1000 * 60 * 60 * 24
}

export function saveToCache<T> (key: string, value: T, expiration: number = expirationTime()): void {
  try {
    const data = { expiration, value }
    window.localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error(`Error saving to cache: ${String(error)}`)
  }
}
