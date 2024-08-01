

type CarType = {
    name: String,
    desc: String,
    price: number,
    totalKm: number

}

export default function CarCard(props: CarType) {
    return (
        <div className="rounded border-4 border-orange-300 p-5 bg-orange-100 w-auto h-38">
            <h2 className="text-lg text-center font-bold antialiased">{props.name}</h2>
            <h4 className="text-md font-semibold text-center">R${props.price}</h4>

            <div className="p-3">
                <p className="text-sm">{props.desc}</p>
                <p>Total KM: {props.totalKm}km</p>
            </div>
        </div>
    )
}