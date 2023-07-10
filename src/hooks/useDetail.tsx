import { useState, useEffect } from 'react'
import { getPodcastDetail } from '../services/itunes'
import { type PodcastDetailItem } from '../types'
import { usePodcasterStore } from './usePodcasterStore'
import { readFromCache, saveToCache } from '../lib/cache'

interface PodcasterDetailCache {
  expiration: number
  value: PodcastDetailItem[]
}

const PODCASTER_DETAIL_KEY = 'podcaster-datails'

export const useDetail = (id: string): { details: PodcastDetailItem[] } => {
  const [details, setDetails] = useState<PodcastDetailItem[]>([])

  const startLoader = usePodcasterStore((state) => state.startLoader)
  const finishLoader = usePodcasterStore((state) => state.finishLoader)

  useEffect(() => {
    const data = readFromCache(`${PODCASTER_DETAIL_KEY}-${id}`) as PodcasterDetailCache

    if (data != null && new Date().getTime() < data.expiration) {
      setDetails(data.value)
    } else {
      startLoader()
      getPodcastDetail(id)
        .then(details => {
          setDetails(details)
          saveToCache(`${PODCASTER_DETAIL_KEY}-${id}`, details)
        })
        .catch(error => { console.error(error) })
        .finally(finishLoader)
    }
  }, [])

  return { details }
}
