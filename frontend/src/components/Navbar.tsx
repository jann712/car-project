import { Link } from "react-router-dom"
import Cookies from 'js-cookie'

export default function Navbar() {
    const isAuthenticatedCookie = Cookies.get("is_authenticated")
    let isAuthenticated = false;

    if (isAuthenticatedCookie) {
        isAuthenticated = true;
    }

    return (
        <nav className="flex items-center justify-between flex-wrap bg-blue-300 p-6">
            <div className="flex gap-5 text-lg">
                <Link to={"/carros"}>carros</Link>
            </div>
            <div className="inline-block">
                {isAuthenticated && <Link to={"/admin"}>admin</Link>}
                <Link to={"/login"}>login</Link>
            </div>
        </nav>
    )
}