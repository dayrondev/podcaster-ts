import { Link } from 'wouter'
import { Spinner } from './Spinner'
import { useStore } from '../hooks/useStore'

export const Header: React.FC = () => {
  const isLoadingDetails = useStore((state) => state.isLoadingDetails)
  const isLoadingPodcasts = useStore((state) => state.isLoadingPodcasts)

  return (
    <header>
      <div className="container mx-auto py-5 px-3 xl:px-0">
        <div className='flex justify-between'>
          <Link href='/'>
            <h2 className="text-sky-700 text-3xl font-bold cursor-pointer">Podcaster</h2>
          </Link>
          { (isLoadingDetails || isLoadingPodcasts) && <Spinner/> }
        </div>
      </div>
      <hr className="border-b-[1px]"/>
    </header>
  )
}
