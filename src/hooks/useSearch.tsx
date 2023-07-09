import { useState } from 'react'

// Very simple hook but the goal is to separate state handling logic from components
export const useSearch = (): {
  search: string
  updateSearch: React.Dispatch<React.SetStateAction<string>>
} => {
  const [search, updateSearch] = useState<string>('')
  return { search, updateSearch }
}
