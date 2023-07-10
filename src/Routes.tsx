import { Podcasts } from './components/Podcasts'
import { Route } from 'wouter'
import { Detail } from './components/Detail'
import { Episode } from './components/Episode'

export const Routes: React.FC = () => {
  return (
    <>
      <Route path="/" component={Podcasts}/>
      <Route path="/podcast/:podcastId">
        {({ podcastId }) => <Detail podcastId={podcastId}/>}
      </Route>
      <Route path="/podcast/:podcastId/episode/:episodeId">
        {({ podcastId, episodeId }) => <Episode podcastId={podcastId} episodeId={episodeId}/>}
      </Route>
    </>
  )
}
