import { PrismaClient } from "@prisma/client";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";

type User = {
    id: Number,
    email: String,
    hashPassword: String

}

type Car = {
    id: Number,
    nome: String,
    marca: String,
    modelo: String,
    valor: Number,
    foto: String
}

const app = Fastify({
    logger: true
})

const prisma = new PrismaClient()

app.register(fastifyJwt, {
    cookie: {
        cookieName: 'token',
        signed: false,
        
    },
    secret: 'supersecret'
})

app.register(fastifyCors, {
    credentials: true
})

app.register(fastifyCookie)

app.decorate("authenticate", async function(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify()
    } catch (err){
        reply.send(err)
    }
})

app.get('/', async function (request, reply) {
    const token = await reply.jwtSign({
        name: 'foo',
        role: ['admin', 'spy']
    })

    reply.setCookie('token', token, {
        domain: 'your.domain',
        path: '/',
        secure: true,
        httpOnly: true,
        sameSite: true
    })
    .code(200)
    .send({hello: 'world'})
})

app.get("/login", async function (request: FastifyRequest<{Body: Omit<User, "id">}>, reply) {
    const { email, hashPassword }  = request.body

    const user = prisma

    const isMatch = user && (await bcrypt.compare(password, user.password))
    
})

app.get('/carros', async function (request, reply) {
    const carros = await prisma.car.findMany({
        orderBy: {valor: 'desc'}
    })

    reply.json(carros)
})

app.post('/carro', async (request, reply) => {
    const { data } = request.body

    const carro = await prisma.car.create({
        data: {
            data
        }
    })

    reply.code(201).send(carro)
})

app.get('/carro/:id', async (request, reply) => {
    const { id } = request.body

    const carro = prisma.car.findFirstOrThrow({
        where: { id }
    })

    reply.code(200).send(carro)
})



app.put('/carro/:id', async (request, reply) => {
    const { id } = request.body

    const carro = prisma.car.update({
        where: { id },
        data: { carro }
    })

    reply.send(carro)
})

app.delete('/carro/:id', async (request, reply) => {
    const { id } = request.body

    const carro = prisma.car.delete({
        where: { id }
    })

    reply.send(carro)
})




// app.addHook('onRequest', (request) => request.jwtVerify())

app.listen({port: 3000}, function(err, address) {
    if (err) {
        app.log.error(err)
        process.exit(1)
    }
})