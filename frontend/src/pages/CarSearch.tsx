import CarCard from "../components/carros/CarCard";
import api from "../lib/axios";
import { useEffect, useState } from "react";
import { CarType } from "../lib/types";
import banner from "../image/banner.jpg"


export default function CarSearch() {
    const [carros, setCarros] = useState<CarType[]>([])

    useEffect(() => {
      api.get("carros").then(response => setCarros(response.data))
    }, [])

    return (
        <div className='m-4 text-center'>
          <h2 className="text-5xl mt-6 font-semibold">Listagem de Carros</h2>
        <div className='flex justify-center'>
        </div>
        <div className='flex justify-center items-center'>
          <div className='grid grid-cols-1 gap-4 mt-20 md:grid-cols-2 xl:grid-cols-4'>
 
            {carros.map((carro) => {
              return (
                <CarCard key={carro.id} {...carro}/>
              )
            })}

          </div>
        </div>
      </div>
    )
}