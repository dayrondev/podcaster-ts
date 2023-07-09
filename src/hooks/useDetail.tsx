import { useState, useEffect } from 'react'
import { getPodcastDetail } from '../services/itunes'
import { type PodcastDetailItem } from '../types'

interface PodcasterDetailCache {
  expiration: number
  details: PodcastDetailItem[]
}

const PODCASTER_DETAIL_KEY = 'podcaster-datails'

export const useDetail = (id: string): { details: PodcastDetailItem[] } => {
  const [details, setDetails] = useState<PodcastDetailItem[]>([])

  useEffect(() => {
    let data: PodcasterDetailCache | null = null
    const cacheData = localStorage.getItem(`${PODCASTER_DETAIL_KEY}-${id}`)
    if (cacheData != null) data = JSON.parse(cacheData)

    if (data != null && new Date().getTime() < data.expiration) {
      setDetails(data.details)
    } else {
      getPodcastDetail(id)
        .then(details => {
          // Expires in 1 day
          const expiration = new Date().getTime() + 1000 * 60 * 60 * 24
          const data = { expiration, details }
          localStorage.setItem(`${PODCASTER_DETAIL_KEY}-${id}`, JSON.stringify(data))
          setDetails(details)
        })
        .catch(error => { console.error(error) })
    }
  }, [])

  return { details }
}
