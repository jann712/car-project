import { useParams } from "react-router-dom"

export default function VendaCarro() {
    const { id } = useParams()

    return (
        <div className="m-5">
            <div className="m-6 ">
                <h1 className="text-5xl">Honda Captain</h1>
            </div>
            <div className="flex flex-grow gap-5 flex-1">
                <div className="w-3/5 h-96 bg-orange-200 text-center">
                    <p>foto</p>
                </div>
                <div className="bg-slate-300 h-96 w-2/5 flex flex-col gap-5 p-5 items-center justify-center">
                    <div className="bg-slate-500 h-12 w-full" />
                    <div className="bg-slate-500 h-12 w-full" />
                    <div className="bg-slate-500 h-12 w-full" />
                    <div className="bg-slate-500 h-12 w-full" />
                    <div className="bg-slate-500 h-12 w-full" />
                </div>
            </div>
        </div>
    )
}