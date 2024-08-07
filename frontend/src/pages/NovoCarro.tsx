import { SubmitHandler, useForm } from "react-hook-form";
import { CarType } from "../lib/types";
import api from "../lib/axios";
import { useNavigate } from "react-router-dom";

export default function NovoCarro() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<CarType, "id">>();
  const onSubmit: SubmitHandler<Omit<CarType, "id">> = (data) => {
    api.post("carro", data).then(
      () => {
        navigate("admin");
        alert("Carro adicionado.");
      },
      (response) => {
        console.error(response);
        alert("Falha ao adicionar o carro.");
      }
    );
  };
  return (
    <div className=" justify-center items-center flex  w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 px-16 py-4 mt-4  shadow-lg  [&>div]:flex [&>div]:flex-col [&>*]:my-3"
      >
        <div className="text-center my-6">
          <h2 className="text-3xl font-bold mb-4">Novo Carro</h2>
        </div>
        <div>
          <label htmlFor="nome" className="mb-2">Nome do veículo</label>
          <input id="nome" type="text" {...register("nome")} className="border-2 border-slate-100 rounded"/>
        </div>

        <div>
          <label htmlFor="modelo" className="mb-2">Modelo</label>
          <input id="modelo" type="text" {...register("modelo")} className="border-2 border-slate-100 rounded"/>
        </div>

        <div>
          <label htmlFor="marca" className="mb-2">Marca</label>
          <input id="marca" type="text" {...register("marca")} className="border-2 border-slate-100 rounded"/>
        </div>

        <div>
          <label htmlFor="valor" className="mb-2">Valor</label>
          <input id="valor" type="text" {...register("valor", )} className="border-2 border-slate-100 rounded"/>
        </div>

        <div>
          <label htmlFor="nome" className="mb-2">Link da foto</label>
          <input id="foto" type="text" {...register("foto")} className="border-2 border-slate-100 rounded"/>
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
  );
}
