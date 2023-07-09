import React from 'react'
import { Podcasts } from './components/Podcasts'
import { Route } from 'wouter'
import { Detail } from './components/Detail'
import { Episode } from './components/Episode'

export const Routes: React.FC = () => {
  return (
    <>
      <Route path="/" component={Podcasts}/>
      <Route path="/podcast/:podcastId">
        {(params) => <Detail podcastId={params.podcastId}/>}
      </Route>
      <Route path="/podcast/:podcastId/episode/:episodeId">
        {(params) => <Episode podcastId={params.podcastId} episodeId={params.episodeId}/>}
      </Route>
    </>
  )
}
