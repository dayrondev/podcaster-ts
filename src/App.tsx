import { Header } from './components/Header'
import { Routes } from './Routes'

const App: React.FC = () => {
  return (
    <div className='max-w-7xl mx-auto'>
      <Header/>
      <main className='container mx-auto'>
        <Routes/>
      </main>
    </div>
  )
}

export default App
