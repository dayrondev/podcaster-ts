import { Link } from 'wouter'

export const Header: React.FC = () => {
  return (
    <header>
      <div className="container mx-auto py-5 px-3 xl:px-0">
        <Link href='/'>
          <h2 className="text-sky-700 text-3xl font-bold cursor-pointer">Podcaster</h2>
        </Link>
      </div>
      <hr className="border-b-[1px]"/>
    </header>
  )
}
