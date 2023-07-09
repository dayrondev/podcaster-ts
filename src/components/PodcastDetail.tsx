import { usePodcasts } from '../hooks/usePodcasts'
import { convertMsToTime } from '../lib/time'
import { usePodcastDetail } from '../hooks/usePodcastDetail'

interface PodcastDetailItemProp {
  id: string
}

export const PodcastDetail: React.FC<PodcastDetailItemProp> = ({ id }: PodcastDetailItemProp) => {
  const { getPodcastById } = usePodcasts('')
  const podcast = getPodcastById(id)
  const { details } = usePodcastDetail(id)

  if (podcast == null) return <h1>Podcast not found</h1>

  const { image, title, author, description } = podcast

  return (
    <section>
      <div className='my-5 flex flex-col p-4 gap-2 lg:flex-row lg:gap-5 xl:gap-16'>
        <aside className="flex flex-col p-4 shadow-lg lg:w-1/3 md:1/3 items-center">
          <div className="p-2 mt-2">
            <img src={image} alt={`Podcast ${title} by ${author}`} />
          </div>
          <div className="p-2">
          <hr className="border-b-[1px] my-3"/>
            <h3 className="font-bold mb-1 text-lg">
              {title}
            </h3>
            <p className="text-sm italic">
              {`by ${author}`}
            </p>
            <hr className="border-b-[1px] my-3"/>
            <h4 className="font-bold mb-1 text-sm">
              Description:
            </h4>
            <p className="text-sm italic">
              {description}
            </p>
          </div>
        </aside>

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
                    <tr key={item.id} className={`border-t-[2px] ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                      <td className='text-sky-700 p-3'>{item.name}</td>
                      <td className='text-center'>{new Date(item.date).toLocaleDateString()}</td>
                      <td className='text-center'>{convertMsToTime(item.time)}</td>
                    </tr>
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
