import { useState, useEffect } from 'react'
import { getPopularPodcasts } from '../services/itunes'
import { type Podcast } from '../types'
import { useStore } from './useStore'
import { readFromCache, saveToCache } from '../libs/cache'

interface PodcasterCache {
  expiration: number
  value: Podcast[]
}

const PODCASTER_KEY = 'podcaster'

export const usePodcasts = (search: string): {
  podcasts: Podcast[]
  getPodcastById: (id: string) => Podcast | undefined
} => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([])

  const startLoader = useStore((state) => state.startLoader)
  const finishLoader = useStore((state) => state.finishLoader)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const cacheData = readFromCache(PODCASTER_KEY) as PodcasterCache
      startLoader()

      if (cacheData != null && new Date().getTime() < cacheData.expiration) {
        setPodcasts(cacheData.value)
      } else {
        const popularPodcasts = await getPopularPodcasts()
        setPodcasts(popularPodcasts)
        saveToCache(PODCASTER_KEY, popularPodcasts)
      }

      finishLoader()
    }

    void fetchData()
  }, [])

  const getFilteredPodcast = (): Podcast[] => {
    const searchLower = search.toLowerCase()

    return searchLower.length > 0
      ? podcasts.filter(item =>
        item.author.toLowerCase().includes(searchLower) ||
        item.title.toLowerCase().includes(searchLower))
      : podcasts
  }

  const getPodcastById = (id: string): Podcast | undefined =>
    podcasts.find(item => item.id === id)

  return {
    podcasts: getFilteredPodcast(),
    getPodcastById
  }
}
