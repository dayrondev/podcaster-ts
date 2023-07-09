import { type Podcast, type ITunesResponse } from '../types'

const PODCASTS_API = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'

const getMappedPodcasts = (data: ITunesResponse): Podcast[] => {
  return data.feed.entry.map(item => {
    const id = item.id.attributes['im:id']
    const images = item['im:image']
    const image = images[images.length - 1].label
    const title = item['im:name'].label
    const author = item['im:artist'].label
    const description = item.summary.label
    return { id, image, title, author, description }
  })
}

export const getPopularPodcasts = async (): Promise<Podcast[]> => {
  try {
    const res = await fetch(PODCASTS_API)
    const data: ITunesResponse = await res.json()
    return getMappedPodcasts(data)
  } catch (error) {
    console.log(error)
    return []
  }
}
