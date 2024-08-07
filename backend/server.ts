import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fjwt, {FastifyJWT} from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import { userSchemas } from "./schema.js";
import { routes } from "./routes.js";

//variaveis
const { FJWT_SECRET, FCOOKIE_SECRET } = process.env

const app = Fastify({
    logger: true
})

//adicionando schemas
for (let schema of [...userSchemas]) {
    app.addSchema(schema)
}

//registrando rotas
app.register(routes, {prefix: 'api/'})


//registrando jwt
app.register(fjwt, {secret: FJWT_SECRET})


//decorador de autenticacao
app.decorate('authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
        const token = request.cookies.access_token

        if (!token) {
            return reply.status(401).send({message: 'Autenticacao requerida.'})
        }

        const decoded = request.jwt.verify<FastifyJWT['user']>(token)
        request.user = decoded
    }
)

app.addHook('preHandler', (request, reply, next) => {
    request.jwt = app.jwt
    return next()
})


//cors
app.register(fastifyCors, {
    credentials: true,
    origin: "http://localhost:5173"
    
})

//registrando cookie
app.register(fastifyCookie, {
    secret: FCOOKIE_SECRET,
    hook: 'preHandler'
})


app.listen({port: 3000}, function(err, address) {
    if (err) {
        app.log.error(err)
        process.exit(1)
    }
})