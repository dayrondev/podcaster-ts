import { useState, useEffect } from 'react'
import { getPodcastDetail } from '../services/itunes'
import { type PodcastDetailItem } from '../types'
import { usePodcasterStore } from './usePodcasterStore'

interface PodcasterDetailCache {
  expiration: number
  details: PodcastDetailItem[]
}

const PODCASTER_DETAIL_KEY = 'podcaster-datails'

export const useDetail = (id: string): { details: PodcastDetailItem[] } => {
  const [details, setDetails] = useState<PodcastDetailItem[]>([])

  const startLoader = usePodcasterStore((state) => state.startLoader)
  const finishLoader = usePodcasterStore((state) => state.finishLoader)

  useEffect(() => {
    let data: PodcasterDetailCache | null = null
    const cacheData = localStorage.getItem(`${PODCASTER_DETAIL_KEY}-${id}`)
    if (cacheData != null) data = JSON.parse(cacheData)

    if (data != null && new Date().getTime() < data.expiration) {
      setDetails(data.details)
    } else {
      startLoader()
      getPodcastDetail(id)
        .then(details => {
          // Expires in 1 day
          const expiration = new Date().getTime() + 1000 * 60 * 60 * 24
          const data = { expiration, details }
          localStorage.setItem(`${PODCASTER_DETAIL_KEY}-${id}`, JSON.stringify(data))
          setDetails(details)
        })
        .catch(error => { console.error(error) })
        .finally(finishLoader)
    }
  }, [])

  return { details }
}
