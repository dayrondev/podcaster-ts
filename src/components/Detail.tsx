import { usePodcasts } from '../hooks/usePodcasts'
import { AsideInfo } from './AsideInfo'
import { Table } from './Table'

interface DetailProp {
  podcastId: string
}

export const Detail: React.FC<DetailProp> = ({ podcastId }: DetailProp) => {
  const { getPodcastById } = usePodcasts('')
  const podcast = getPodcastById(podcastId)

  if (podcast == null) return null

  return (
    <section className='my-5 flex flex-col p-4 gap-2 lg:flex-row lg:gap-5 xl:gap-16'>
      <AsideInfo podcast={podcast}/>
      <main className="flex flex-col w-full items-center">
        <Table podcastId={podcastId}/>
      </main>
    </section>
  )
}
