export function readFromCache (key: string): any {
  const storedData = window.localStorage.getItem(key)
  if (storedData != null) return JSON.parse(storedData)
  return null
}

function expirationTime (): number {
  // Expires in 1 day by default
  return new Date().getTime() + 1000 * 60 * 60 * 24
}

export function saveToCache (key: string, value: any, expiration: number = expirationTime()): void {
  const data = { expiration, value }
  window.localStorage.setItem(key, JSON.stringify(data))
}
