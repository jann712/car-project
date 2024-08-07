import { useNavigate } from "react-router-dom";
import api from "../lib/axios";

export default function Logout() {
    const navigate = useNavigate()

  try {
    async () => await api.delete("/logout")
    .then((response) => {
        alert("Sessão encerrada com sucesso.")
        navigate("/carros")
    }, (response) => console.error(response.status));
  } catch (err) {
    console.error(err);
  }

  return (
    <div className="text-center my-12">
      <p className="font-semibold text-blue-800">Terminando a sessão...</p>
    </div>
  );
}
