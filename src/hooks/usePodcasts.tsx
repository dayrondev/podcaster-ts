import { useState, useEffect } from 'react'
import { getPopularPodcasts } from '../services/itunes'
import { type Podcast } from '../types'

interface PodcasterCache {
  expiration: number
  podcasts: Podcast[]
}

const PODCASTER_KEY = 'podcaster'

export const usePodcasts = (search: string): { podcasts: Podcast[] } => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([])

  useEffect(() => {
    let data: PodcasterCache | null = null
    const cacheData = localStorage.getItem(PODCASTER_KEY)
    if (cacheData != null) data = JSON.parse(cacheData)

    if (data != null && new Date().getTime() < data.expiration) {
      setPodcasts(data.podcasts)
    } else {
      getPopularPodcasts()
        .then(podcasts => {
          // Expires in 1 day
          const expiration = new Date().getTime() + 1000 * 60 * 60 * 24
          const data = { expiration, podcasts }
          localStorage.setItem(PODCASTER_KEY, JSON.stringify(data))
          setPodcasts(podcasts)
        })
        .catch(error => { console.log(error) })
    }
  }, [])

  return {
    podcasts: search.length > 0
      ? podcasts.filter(item =>
        item.author.toLowerCase().includes(search.toLowerCase()) ||
        item.title.toLowerCase().includes(search.toLowerCase()))
      : podcasts
  }
}
