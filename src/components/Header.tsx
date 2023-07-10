import { Link } from 'wouter'
import { Spinner } from './Spinner'
import { usePodcasterStore } from '../hooks/usePodcasterStore'

export const Header: React.FC = () => {
  const isLoading = usePodcasterStore((state) => state.isLoading)

  return (
    <header>
      <div className="container mx-auto py-5 px-3 xl:px-0">
        <div className='flex justify-between'>
          <Link href='/'>
            <h2 className="text-sky-700 text-3xl font-bold cursor-pointer">Podcaster</h2>
          </Link>
          { isLoading && <Spinner/>}
        </div>
      </div>
      <hr className="border-b-[1px]"/>
    </header>
  )
}
