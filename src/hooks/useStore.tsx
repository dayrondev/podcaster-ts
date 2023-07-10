import { create } from 'zustand'

interface PodcasterState {
  isLoading: boolean
  startLoader: () => void
  finishLoader: () => void
}

export const useStore = create<PodcasterState>()((set) => ({
  isLoading: false,
  startLoader: () => { set({ isLoading: true }) },
  finishLoader: () => { set({ isLoading: false }) }
}))
