import CarCard from "../components/carros/CarCard";


export default function CarSearch() {
    return (
        <div className='m-4'>
        <div className='flex justify-center'>
          <div className='rounded text-center items-center flex justify-center border-4 w-full h-96 bg-green-200 border-green-400'>
            <h1 className='text-green-800'>banner</h1>
          </div>
        </div>
        <div className='bg-teal-100 flex justify-between h-16 my-4 text-center items-center px-5'>
          <h3>Search Vehicles</h3>
          <div className='rounded border-0 bg-white h-10 w-1/3 m-3'>
          <input type="text" className='w-full h-full' />
          </div>
        </div>
        <div className='flex flex-auto'>
          <div className='w-2/6 bg-slate-100'>
            <div className='w-auto m-4 bg-slate-200 h-16'/>
            <div className='w-auto m-4 bg-slate-200 h-16'/>
            <div className='w-auto m-4 bg-slate-200 h-16'/>
            <div className='w-auto m-4 bg-slate-200 h-16'/>
          </div>
          <div className='w-full flex flex-wrap flex-auto justify-evenly gap-y-4'>
            <CarCard id={1} name={"Honda Crusader"} desc={"this is a car"} price={300.99} totalKm={200} />
            <CarCard id={2} name={"Honda Crusader"} desc={"this is a car"} price={300.99} totalKm={200} />
            <CarCard id={3} name={"Honda Crusader"} desc={"this is a car"} price={300.99} totalKm={200} />
            <CarCard id={4} name={"Honda Crusader"} desc={"this is a car"} price={300.99} totalKm={200} />

          </div>
        </div>
      </div>
    )
}