import { Route } from 'wouter'
import { Header } from './components/Header'
import { Podcasts } from './components/Podcasts'
import { PodcastDetail } from './components/PodcastDetail'

const App: React.FC = () => {
  return (
    <div className='max-w-7xl mx-auto'>
      <Header/>
      <main className='container mx-auto'>
        <Route path="/" component={Podcasts}/>
        <Route path="/podcast/:podcastId">{(params) => <PodcastDetail id={params.podcastId}/>}</Route>
      </main>
    </div>
  )
}

export default App
