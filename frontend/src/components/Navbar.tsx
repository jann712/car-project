import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between flex-wrap bg-blue-300 p-6">
            <div className="flex gap-5 text-lg">
                <Link to={"/carros"}>carros</Link>
            </div>
            <div className="inline-block">
                <Link to={"/login"}>login</Link>
            </div>
        </nav>
    )
}