import { Link } from 'wouter'
import { type Podcast } from '../types'

interface AsideInfoProp {
  podcast: Podcast
}

export const AsideInfo: React.FC<AsideInfoProp> = ({ podcast }: AsideInfoProp) => {
  const { id, image, title, author, description } = podcast
  return (
    <aside className="flex flex-col p-4 shadow-lg lg:w-1/3 md:1/3 items-center">
       <Link href={`/podcast/${id}`}>
        <div className="p-2 mt-2 cursor-pointer">
          <img src={image} alt={`Podcast ${title} by ${author}`} />
        </div>
      </Link>
      <div className="p-2">
      <hr className="border-b-[1px] my-3"/>
        <Link href={`/podcast/${id}`}>
          <h3 className="font-bold mb-1 text-xl">
            {title}
          </h3>
          <p className="text-base italic">
            {`by ${author}`}
          </p>
        </Link>
        <hr className="border-b-[1px] my-3"/>
        <h4 className="font-bold mb-1 text-base">
          Description:
        </h4>
        <p className="text-base italic">
          {description}
        </p>
      </div>
    </aside>
  )
}
