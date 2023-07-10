import { useState, useEffect } from 'react'
import { getPopularPodcasts } from '../services/itunes'
import { type Podcast } from '../types'
import { usePodcasterStore } from './usePodcasterStore'
import { readFromCache, saveToCache } from '../lib/cache'

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

  const startLoader = usePodcasterStore((state) => state.startLoader)
  const finishLoader = usePodcasterStore((state) => state.finishLoader)

  useEffect(() => {
    const data = readFromCache(PODCASTER_KEY) as PodcasterCache

    if (data != null && new Date().getTime() < data.expiration) {
      setPodcasts(data.value)
    } else {
      startLoader()
      getPopularPodcasts()
        .then(podcasts => {
          setPodcasts(podcasts)
          saveToCache(PODCASTER_KEY, podcasts)
        })
        .catch(error => { console.error(error) })
        .finally(finishLoader)
    }
  }, [])

  const getFilteredPodcast = (): Podcast[] =>
    search.length > 0
      ? podcasts.filter(item =>
        item.author.toLowerCase().includes(search.toLowerCase()) ||
        item.title.toLowerCase().includes(search.toLowerCase()))
      : podcasts

  const getPodcastById = (id: string): Podcast | undefined => podcasts.find(item => item.id === id)

  return {
    podcasts: getFilteredPodcast(),
    getPodcastById
  }
}
