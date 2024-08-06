import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fjwt, {FastifyJWT} from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import { userSchemas } from "./schema.js";
import { routes } from "./routes.js";

// type User = {
//     id: Number,
//     email: String,
//     hashPassword: String

// }

// type Car = {
//     id: Number,
//     nome: String,
//     marca: String,
//     modelo: String,
//     valor: Number,
//     foto: String
// }



const app = Fastify({
    logger: true
})

for (let schema of [...userSchemas]) {
    app.addSchema(schema)
}

app.register(routes, {prefix: 'api/'})

app.register(fjwt, {secret: 'supersecret'})

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

app.register(fastifyCors, {
    credentials: true,
    
})

app.register(fastifyCookie, {
    secret: 'supersecretkey',
    hook: 'preHandler'
})


app.listen({port: 3000}, function(err, address) {
    if (err) {
        app.log.error(err)
        process.exit(1)
    }
})