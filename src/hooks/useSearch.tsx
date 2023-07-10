import { useState, type Dispatch, type SetStateAction } from 'react'

// Very simple hook but the goal is to separate state handling logic from components
export const useSearch = (): {
  search: string
  updateSearch: Dispatch<SetStateAction<string>>
} => {
  const [search, updateSearch] = useState<string>('')
  return { search, updateSearch }
}
