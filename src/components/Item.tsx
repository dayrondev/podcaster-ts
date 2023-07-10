import { Link } from 'wouter'
import { type Podcast } from '../types'

interface ItemProp {
  podcast: Podcast
}

export const Item: React.FC<ItemProp> = ({ podcast }: ItemProp) => {
  const { id, title, author, image } = podcast
  return (
    <Link href={`/podcast/${id}`}>
      <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4 mb-32">
        <div className="flex flex-col text-center items-center p-3 shadow-lg hover:shadow-none hover:translate-x-1 hover:translate-y-1 hover:transition-transform h-40 cursor-pointer">
          <div className="relative h-28 w-28">
            <img
              className="rounded-full absolute -top-20 h-auto w-auto"
              src={image}
              alt={`Podcast ${title} by ${author}`}
            />
          </div>
          <div className="p-2">
            <p className="font-bold mb-1 text-base">
              {title.toUpperCase()}
            </p>
            <p className="text-gray-500 text-base">
              {`Author: ${author}`}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
