import { Header } from './components/Header'
import { useEffect, useState } from 'react'
import { type ITunesResponse, type Podcast } from './types'
import { PodcastItem } from './components/PodcastItem'

const App: React.FC = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([])
  useEffect(() => {
    fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
      .then(async res => await res.json())
      .then((data: ITunesResponse) => {
        const mappedPodcasts = data.feed.entry.map(item => {
          const id = item.id.attributes['im:id']
          const images = item['im:image']
          const image = images.length > 0 ? images[images.length - 1].label : ''
          const title = item['im:name'].label
          const author = item['im:artist'].label
          return { id, image, title, author }
        })
        setPodcasts(mappedPodcasts)
      })
      .catch(error => { console.log(error.message) })
  }, [])

  return (
    <div className='max-w-7xl mx-auto'>
      <Header/>
      <main className='container mx-auto my-32 '>
        <div className='flex flex-wrap'>
          {podcasts.map(podcast => (
            <PodcastItem key={podcast.id} podcast={podcast}/>
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
