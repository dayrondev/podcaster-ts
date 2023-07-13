import { usePodcasts } from '../hooks/usePodcasts'
import { convertMsToTime } from '../lib/time'
import { useDetail } from '../hooks/useDetail'
import { AsideInfo } from './AsideInfo'
import { Link } from 'wouter'

interface DetailProp {
  podcastId: string
}

export const Detail: React.FC<DetailProp> = ({ podcastId }: DetailProp) => {
  const { getPodcastById } = usePodcasts('')
  const podcast = getPodcastById(podcastId)
  const { details } = useDetail(podcastId)

  if (podcast == null) return null

  return (
    <section>
      <div className='my-5 flex flex-col p-4 gap-2 lg:flex-row lg:gap-5 xl:gap-16'>
        <AsideInfo podcast={podcast}/>
        <main className="flex flex-col w-full items-center">
        {details.length > 0 && (
          <>
            <div className="shadow-lg w-full py-4 px-6 mb-4">
              <h3 className='text-2xl font-bold'>Episodes: {details.length}</h3>
            </div>
            <div className="shadow-lg w-full py-4 px-6">
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className='text-lg text-left p-3'>Title</th>
                    <th className='text-lg text-center'>Date</th>
                    <th className='text-lg text-center'>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {details.map((item, index) => (
                    <Link href={`/podcast/${podcast.id}/episode/${item.id}`} key={item.id}>
                      <tr className={`border-t-[2px] cursor-pointer hover:bg-gray-200 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                        <td className='text-sky-700 p-3'>{item.name}</td>
                        <td className='text-center'>{new Date(item.date).toLocaleDateString()}</td>
                        <td className='text-center'>{item.time != null ? convertMsToTime(item.time) : 'N/A'}</td>
                      </tr>
                    </Link>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        </main>
      </div>
    </section>
  )
}
