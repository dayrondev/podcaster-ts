import { useState, useEffect } from 'react'
import { getPodcastDetail } from '../services/itunes'
import { type PodcastDetailItem } from '../types'
import { useStore } from './useStore'
import { readFromCache, saveToCache } from '../libs/cache'

interface PodcasterDetailCache {
  expiration: number
  value: PodcastDetailItem[]
}

const PODCASTER_DETAIL_KEY = 'podcaster-datails'

export const useDetail = (id: string): { details: PodcastDetailItem[] } => {
  const [details, setDetails] = useState<PodcastDetailItem[]>([])

  const startLoader = useStore((state) => state.startDetailsLoader)
  const finishLoader = useStore((state) => state.finishDetailsLoader)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const cacheData = readFromCache(`${PODCASTER_DETAIL_KEY}-${id}`) as PodcasterDetailCache
      startLoader()

      if (cacheData != null && new Date().getTime() < cacheData.expiration) {
        setDetails(cacheData.value)
      } else {
        const podcastDetails = await getPodcastDetail(id)
        setDetails(podcastDetails)
        saveToCache(`${PODCASTER_DETAIL_KEY}-${id}`, podcastDetails)
      }

      finishLoader()
    }

    void fetchData()
  }, [])

  return { details }
}
