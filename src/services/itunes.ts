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

const getMappedPodcasts = (data: ITunesResponse): Podcast[] =>
  data.feed.entry.map(item => ({
    id: item.id.attributes['im:id'],
    image: item['im:image'].slice(-1)[0].label,
    title: item['im:name'].label,
    author: item['im:artist'].label,
    description: item.summary.label
  }))

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

const getMappedPodcastDetail = (results: PodcastDetailResponse[]): PodcastDetailItem[] =>
  results.map(item => ({
    id: item.trackId,
    name: item.trackName,
    date: item.releaseDate,
    time: item.trackTimeMillis,
    description: item.description,
    audio: item.episodeUrl
  }))

export const getPodcastDetail = async (id: string): Promise<PodcastDetailItem[]> => {
  const podcastDetailUrl = `${ITUNES_URL}/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`
  const url = `${ALL_ORIGINS_URL}${encodeURIComponent(podcastDetailUrl)}`

  try {
    const res = await fetch(url)
    const data: PodcastDetailResponseRaw = await res.json()
    const responseResult: PodcastResponseResult = JSON.parse(data.contents)
    return getMappedPodcastDetail(responseResult.results.filter(i => i.trackId.toString() !== id))
  } catch (error) {
    console.error(error)
    return []
  }
}
