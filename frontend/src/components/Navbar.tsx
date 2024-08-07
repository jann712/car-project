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
        <nav className="flex items-center justify-between border-b-2 border-b-blue-300 p-4 bg-gradient-to-br from-white to-blue-50">
            <div className="flex gap-5 text-sm lg:text-lg">
                <Link to={"/carros"}>Listagem de Carros</Link>
            </div>
            {isAuthenticated && <Link to={"/admin"} className="text-sm lg:text-lg">Painel Admin</Link>}
            <div className="grid grid-cols-2">
                
                {!isAuthenticated && <Link to={"/login"} className="text-sm lg:text-lg">Login</Link>}
                {isAuthenticated && <button onClick={async () => {
                    await api.delete("/logout")
                    navigate("/carros", {replace: true})
                    window.location.reload()
                    
                    }} className="text-sm lg:text-lg">Logout</button>}
                
            </div>
        </nav>
    )
}