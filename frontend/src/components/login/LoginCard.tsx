import { useForm, SubmitHandler } from "react-hook-form"
import api from "../../lib/axios"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

type Inputs = {
    email: string,
    password: string
}

export default function LoginCard() {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        api.post("login", data)
        .then((response) => {
            console.log(response.status)
            Cookies.set("is_authenticated", "true")
            navigate("carros")
        }, (response) => console.error(response))
    }

    return (
        <div className="flex items-center justify-center"> 
            <div className="shadow-lg w-full p-8 m-4 justify-center flex md:w-3/4 lg:w-1/2 xl:w-1/4 pb-16">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full h-full text-center items-center">
                    <h2 className="text-2xl font-semibold my-3">Login Administrador</h2>

                    <div className="flex flex-col items-center my-4 text-start gap-5">
                        <div className="grid w-72">
                            <label htmlFor="email">E-mail</label>
                            <input id="email" type="text" className="rounded p-2 hover:border-blue-400 border-2 transition" {...register("email")}/>
                        </div>

                        <div className="grid w-72">
                            <label htmlFor="password">Senha</label>
                            <input id="password" type="password" className="rounded p-2 hover:border-blue-400 border-2 transition" {...register("password")}/>
                        </div>
                    </div>

                    <button className="antialiased rounded bg-blue-500 w-1/2 p-2  text-white font-semibold transition hover:bg-blue-700">Entrar</button>
                </form>
            </div>
        </div>
    )
}