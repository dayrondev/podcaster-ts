import { create } from 'zustand'

interface PodcasterState {
  isLoadingPodcasts: boolean
  startPodcastsLoader: () => void
  finishPodcastsLoader: () => void

  isLoadingDetails: boolean
  startDetailsLoader: () => void
  finishDetailsLoader: () => void
}

export const useStore = create<PodcasterState>()((set) => ({
  isLoadingPodcasts: false,
  startPodcastsLoader: () => { set({ isLoadingPodcasts: true }) },
  finishPodcastsLoader: () => { set({ isLoadingPodcasts: false }) },

  isLoadingDetails: false,
  startDetailsLoader: () => { set({ isLoadingDetails: true }) },
  finishDetailsLoader: () => { set({ isLoadingDetails: false }) }
}))
