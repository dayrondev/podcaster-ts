import { usePodcasts } from '../hooks/usePodcasts'
import { useDetail } from '../hooks/useDetail'
import { AsideInfo } from './AsideInfo'

interface PodcastDetailItemProp {
  podcastId: string
  episodeId: string
}

export const Episode: React.FC<PodcastDetailItemProp> = ({ podcastId, episodeId }: PodcastDetailItemProp) => {
  const { getPodcastById } = usePodcasts('')
  const podcast = getPodcastById(podcastId)
  const { details } = useDetail(podcastId)
  const episode = details.find(item => item.id.toString() === episodeId)

  if (podcast == null || episode == null) return <h1>Episode not found</h1>

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
                {/* <audio className='w-full' src={audio} controls autoPlay loop/> */}
                <audio controls className='w-full'>
                  <source src={audio} type="audio/mp3" />
                  <p>Su navegador no es compatible con audio HTML5. Aquí hay un <a href="viper.mp3">enlace al audio</a> en su lugar.</p>
                </audio>
              </>
            )}
          </div>
        </main>
      </div>
    </section>
  )
}
