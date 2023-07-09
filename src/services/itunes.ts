import {
  type Podcast,
  type ITunesResponse,
  type PodcastDetailResponse,
  type PodcastDetailResponseRaw,
  type PodcastResponseResult,
  type PodcastDetailItem
} from '../types'

const ITUNES_URL = 'https://itunes.apple.com'
const ALL_ORIGINS_URL = 'https://api.allorigins.win/get?url='

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
    const res = await fetch(`${ITUNES_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`)
    const data: ITunesResponse = await res.json()
    return getMappedPodcasts(data)
  } catch (error) {
    console.error(error)
    return []
  }
}

const getMappedPodcastDetail = (results: PodcastDetailResponse[]): PodcastDetailItem[] => {
  return results.map(item => {
    const { trackId: id, trackName: name, releaseDate: date, trackTimeMillis: time } = item
    return { id, name, date, time }
  })
}

export const getPodcastDetail = async (id: string): Promise<PodcastDetailItem[]> => {
  const podcastDetailUrl = `${ITUNES_URL}/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`
  const url = `${ALL_ORIGINS_URL}${encodeURIComponent(podcastDetailUrl)}`

  try {
    const res = await fetch(url)
    const data: PodcastDetailResponseRaw = await res.json()
    const responseResult: PodcastResponseResult = JSON.parse(data.contents)
    return getMappedPodcastDetail(responseResult.results)
  } catch (error) {
    console.error(error)
    return []
  }
}
