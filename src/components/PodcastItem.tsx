import { type Podcast } from '../types'

interface PropPodcastItem {
  podcast: Podcast
}

export const PodcastItem: React.FC<PropPodcastItem> = ({ podcast }: PropPodcastItem) => {
  const { title, author, image } = podcast
  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4 mb-32">
      <div className="flex flex-col text-center items-center p-3 shadow-lg h-32">
         <div className="relative h-28 w-28">
          <img
            className="rounded-full absolute -top-20 h-auto w-auto"
            src={image} alt={`Podcast ${title} by ${author}`}
          />
        </div>
        <div className="p-2">
          <p className="font-bold mb-1 text-sm">
            {title.toUpperCase()}
          </p>
          <p className="text-gray-500 text-sm">
            {`Author: ${author}`}
          </p>
        </div>
      </div>
    </div>
  )
}
