import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { CarType } from "../lib/types";
import api from "../lib/axios";
import { useEffect, useState } from "react";


export default function EditCar() {
    const [carro, setCarro] = useState<Omit<CarType, "id">>({})
    const navigate = useNavigate();
    const {id} = useParams()
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Omit<CarType, "id">>();
    const onSubmit: SubmitHandler<Omit<CarType, "id">> = (data) => {
      api.put(`carro/${id}`, data).then(
        () => {
          navigate("admin");
          alert("Carro atualizado.");
        },
        (response) => {
          console.error(response);
          alert("Falha ao atualizar o carro.");
        }
      );
    };

    useEffect(() => {
        api.get(`carro/${id}`).then(response => setCarro(response.data))
      }, [])
    
    return (
      <>
      <div className=" justify-center items-center flex w-full ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 px-16 py-4 mt-4 md:w-3/4 lg:w-1/2 xl:w-1/4 pb-16 shadow-lg  [&>div]:flex [&>div]:flex-col [&>*]:my-3"
        >
          <div className="text-center my-6">
            <h2 className="text-3xl font-bold">Editar Carro</h2>
          </div>
          <div>
            <label htmlFor="nome" className="mb-2">Nome do veículo</label>
            <input id="nome" type="text" {...register("nome")} defaultValue={carro.nome} className="border-2 border-slate-100 rounded"/>
          </div>
  
          <div>
            <label htmlFor="modelo" className="mb-2">Modelo</label>
            <input id="modelo" type="text" {...register("modelo")} defaultValue={carro.modelo} className="border-2 border-slate-100 rounded"/>
          </div>
  
          <div>
            <label htmlFor="marca" className="mb-2">Marca</label>
            <input id="marca" type="text" {...register("marca")} defaultValue={carro.marca} className="border-2 border-slate-100 rounded"/>
          </div>
  
          <div>
            <label htmlFor="valor" className="mb-2">Valor</label>
            <input id="valor" type="text" {...register("valor", )} defaultValue={carro.valor} className="border-2 border-slate-100 rounded"/>
          </div>
  
          <div>
            <label htmlFor="nome" className="mb-2">Link da foto</label>
            <input id="foto" type="text" {...register("foto")} defaultValue={carro.foto} className="border-2 border-slate-100 rounded"/>
          </div>
  
          {errors.nome && errors.nome?.message}
          {errors.modelo && errors.modelo?.message}
          {errors.marca && errors.marca?.message}
          {errors.valor && errors.valor?.message}
          {errors.foto && errors.foto?.message}
          <div className=" flex items-center">
            <button className="antialiased rounded bg-blue-500 w-1/2 p-2  text-white font-semibold transition hover:bg-blue-700">
              Enviar
            </button>
          </div>
        </form>
      </div>
      </>
    );
}