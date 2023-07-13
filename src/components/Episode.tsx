import { usePodcasts } from '../hooks/usePodcasts'
import { useDetail } from '../hooks/useDetail'
import { AsideInfo } from './AsideInfo'

interface EpisodeProp {
  podcastId: string
  episodeId: string
}

export const Episode: React.FC<EpisodeProp> = ({ podcastId, episodeId }: EpisodeProp) => {
  const { getPodcastById } = usePodcasts('')
  const podcast = getPodcastById(podcastId)
  const { details } = useDetail(podcastId)
  const episode = details.find(item => item.id.toString() === episodeId)

  if (podcast == null || episode == null) return null

  const { name, description, audio } = episode

  return (
    <section>
      <div className='my-5 flex flex-col p-4 gap-2 lg:flex-row lg:gap-5 xl:gap-16'>
        <AsideInfo podcast={podcast}/>
        <main className="flex flex-col w-full items-center">
          <div className="shadow-lg w-full p-8 mb-4">
            <h3 className='text-2xl font-bold '>{name}</h3>
            {description != null && (
              <div
                className="text-base italic mt-4"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
            {audio != null && (
              <>
                <hr className="border-b-[1px] my-6"/>
                <audio controls className='w-full'>
                  <source src={audio} type="audio/mp3" />
                </audio>
              </>
            )}
          </div>
        </main>
      </div>
    </section>
  )
}
