import { Link } from "react-router-dom";

type CarType = {
  id: Number;
  nome: String;
  marca: String;
  modelo: String;
  valor: Number;
  foto: string;
};

export default function CarCard(props: CarType) {
  return (
    <div className="rounded shadow-lg  w-auto h-auto text-center">
      <img src={props.foto} alt="" className="w-full rounded-t-lg max-h-64 " />
      <div className="text-center text-4xl font-semibold m-4">
        <Link to={`/carro/${props.id}`}>{props.nome}</Link>
      </div>
      <div className="my-4">
        <h4 className="text-2xl font-semibold text-center">R${props.valor}</h4>

        <div className="p-3">
          <p className="text-sm">Modelo - {props.modelo}</p>
          <p className="text-sm">Marca - {props.marca}</p>
        </div>
      </div>
    </div>
  );
}
