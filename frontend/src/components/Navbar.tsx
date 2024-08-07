import { Link, useNavigate } from "react-router-dom"
import Cookies from 'js-cookie'
import api from "../lib/axios";

export default function Navbar() {
    const navigate = useNavigate()
    const isAuthenticatedCookie = Cookies.get("is_authenticated")
    let isAuthenticated = false;

    if (isAuthenticatedCookie) {
        isAuthenticated = true;
    }

    return (
        <nav className="flex items-center justify-between border-b-2 border-b-blue-800 p-4">
            <div className="flex gap-5 text-sm">
                <Link to={"/carros"}>Listagem de Carros</Link>
            </div>
            {isAuthenticated && <Link to={"/admin"} className="text-sm">Painel Admin</Link>}
            <div className="grid grid-cols-2">
                
                {!isAuthenticated && <Link to={"/login"} className="text-sm">Login</Link>}
                {isAuthenticated && <button onClick={async () => {
                    await api.delete("/logout")
                    navigate("/carros", {replace: true})
                    window.location.reload()
                    
                    }} className="text-sm">Logout</button>}
                
            </div>
        </nav>
    )
}