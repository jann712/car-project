import { useEffect, useState } from "react";
import api from "../lib/axios";
import { CarType } from "../lib/types";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

export default function AdminPanel() {
  const [carros, setCarros] = useState<CarType[]>([]);
  const navigate = useNavigate();
  const isAuthenticatedCookie = Cookies.get("is_authenticated")
  let isAuthenticated = false;

  if (isAuthenticatedCookie) {
      isAuthenticated = true;
  } else {
    navigate("carros", {replace: true})
  }

  useEffect(() => {
    api.get("admincarros").then((response) => setCarros(response.data), () => {
        navigate("carros", {replace: true})
    });
  }, []);
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center m-3">
        <button
          type="button"
          className="p-3 bg-blue-500 rounded text-white font-bold antialiased"
          onClick={() => {
            navigate("/carro/novo");
          }}
        >
          Adicionar novo carro
        </button>
      </div>
      {carros.map((carro) => {
        return (
          <div
            key={carro.id}
            className="m-3 rounded-lg border-2 border-gray-100 shadow-md  flex flex-col justify-center md:w-3/4 lg:w-1/2 xl:w-1/4 pb-16"
          >
            <div className="flex justify-center">
              <img
                src={carro.foto}
                alt=""
                className="w-fit rounded-t-lg max-h-64 "
              />
            </div>
            <div className="grid grid-cols-2 m-4 p-8 border-2 rounded border-slate-50">
              <div className="text-md antialiased font-bold text-blue-700">
                <p>ID</p>
                <hr />
                <p>VEÍCULO</p>
                <hr />
                <p>MODELO</p>
                <hr />
                <p>MARCA</p>
                <hr />
                <p>VALOR</p>
              </div>
              <div className="text-blue-900">
                <p>{carro.id}</p>
                <hr />
                <p>{carro.nome}</p>
                <hr />
                <p>{carro.modelo}</p>
                <hr />
                <p>{carro.marca}</p>
                <hr />
                <p>R${carro.valor}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 items-center text-center gap-5 m-4">
              <button
                onClick={() => {
                  api.delete(`/carro/${carro.id}`);
                  window.location.reload();
                  alert("Carro deletado.");
                }}
                className="p-2 border-red-500 border-2 rounded text-red-950 hover:bg-red-500 hover:text-white  font-bold antialiased transition"
              >
                Deletar
              </button>
              <Link
                to={`/carro/edit/${carro.id}`}
                className="p-2 border-blue-500 border-2 rounded  font-bold antialiased"
              >
                Editar
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
