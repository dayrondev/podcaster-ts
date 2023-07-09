import { Header } from './components/Header'
import { Podcasts } from './components/Podcasts'

const App: React.FC = () => {
  return (
    <div className='max-w-7xl mx-auto'>
      <Header/>
      <main className='container mx-auto'>
        <Podcasts/>
      </main>
    </div>
  )
}

export default App
