import { useState, useEffect } from 'react'
import { getPopularPodcasts } from '../services/itunes'
import { type Podcast } from '../types'
import { usePodcasterStore } from './usePodcasterStore'

interface PodcasterCache {
  expiration: number
  podcasts: Podcast[]
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
    let data: PodcasterCache | null = null
    const cacheData = localStorage.getItem(PODCASTER_KEY)
    if (cacheData != null) data = JSON.parse(cacheData)

    if (data != null && new Date().getTime() < data.expiration) {
      setPodcasts(data.podcasts)
    } else {
      startLoader()
      getPopularPodcasts()
        .then(podcasts => {
          // Expires in 1 day
          const expiration = new Date().getTime() + 1000 * 60 * 60 * 24
          const data = { expiration, podcasts }
          window.localStorage.setItem(PODCASTER_KEY, JSON.stringify(data))
          setPodcasts(podcasts)
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
