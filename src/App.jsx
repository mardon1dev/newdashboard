import './App.css'
import Navbar from './components/Navbar/Navbar'
import Routers from './routes/Routers'

function App() {
  return (
    <div className="py-6 px-8 flex items-start h-screen">
      <Navbar />
      <div className='px-[72px] w-full h-full'>
        <Routers />
      </div>
    </div>
  )
}

export default App
