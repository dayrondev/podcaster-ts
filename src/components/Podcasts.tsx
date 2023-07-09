import { PodcastItem } from './PodcastItem'
import { usePodcasts } from '../hooks/usePodcasts'
import { useSearch } from '../hooks/useSearch'

export const Podcasts: React.FC = () => {
  const { search, updateSearch } = useSearch()
  const { podcasts } = usePodcasts(search)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    updateSearch(event.target.value)
  }

  return (
    <section>
      <div className="w-full mb-14">
        <div className="w-full flex justify-end px-4 pt-6 pb-8">
          <div className="mb-4 flex w-full sm:w-1/2 lg:w-1/3">
            <span className="font-bold text-xl mr-2 px-2.5 py-1 rounded bg-sky-700 text-white">
              {podcasts.length}
            </span>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Filter podcasts..."
              value={search}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className='flex flex-wrap'>
        {podcasts.map(podcast => (
          <PodcastItem key={podcast.id} podcast={podcast}/>
        ))}
      </div>
    </section>
  )
}
