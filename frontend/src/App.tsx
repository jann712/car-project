import { useState } from 'react'
import Navbar from './components/Navbar'
import CarCard from './components/carSearch/CarCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <div className='m-4'>
        <div className='flex justify-center'>
          <div className='rounded text-center items-center flex justify-center border-4 w-full h-96 mb-12 bg-green-200 border-green-400'>
            <h1 className='text-green-800'>banner</h1>
          </div>
        </div>
        <div className='flex flex-auto'>
          <div className='w-full'>wow</div>
          <div className='w-full flex flex-wrap flex-auto justify-evenly gap-y-4'>
          <CarCard name={"Honda Crusader"} desc={"this is a car"} price={300.99} totalKm={200} />
          <CarCard name={"Honda Crusader"} desc={"this is a car"} price={300.99} totalKm={200} />
          <CarCard name={"Honda Crusader"} desc={"this is a car"} price={300.99} totalKm={200} />
          <CarCard name={"Honda Crusader"} desc={"this is a car"} price={300.99} totalKm={200} />

          </div>
        </div>
      </div>


    </>
  )
}

export default App
