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
        <div className="absolute top-1/4 left-1/4 w-1/3 rounded border-4 border-blue-500">
            <div className="bg-blue-200 w-full py-16 justify-center flex">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full h-full text-center items-center">
                    <h2 className="text-lg font-semibold my-3">Administrador</h2>

                    <div className="flex flex-col items-center my-4 text-start gap-5">
                        <div className="grid w-72">
                            <label htmlFor="user">Usuário</label>
                            <input id="user" type="text" className="rounded p-2 hover:border-blue-400 border-2 transition" {...register("email")}/>
                        </div>

                        <div className="grid w-72">
                            <label htmlFor="password">Senha</label>
                            <input id="password" type="password" className="rounded p-2 hover:border-blue-400 border-2 transition" {...register("password")}/>
                        </div>
                    </div>

                    <button className="rounded bg-orange-300 border-orange-500 w-1/2 p-2 hover:bg-orange-500 transition hover:text-white">Entrar</button>
                </form>
            </div>
        </div>
    )
}