

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between flex-wrap bg-blue-300 p-6">
            <div className="flex gap-5 text-lg">
                <a href="">home</a>
                <a href="">other</a>
            </div>
            <div className="inline-block">
                <a href="">login</a>
            </div>
        </nav>
    )
}