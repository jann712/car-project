import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { CreateCarInput, CreateSingleCarInput, CreateUserInput, DeleteCarInput, LoginUserInput, UpdateCarInput, UpdateUserInput, UpdateUserParam } from "./schema.js";
import bcrypt from "bcrypt"
import prisma from "./prisma.js";

const SALT_ROUNDS=10

//criacao de novo usuario
export async function createUser(
    req: FastifyRequest<{
        Body: CreateUserInput
    }>,
    reply: FastifyReply
) {
    const { password, email } = req.body
    
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        }
    })
    if (user) {
        return reply.code(401).send({
            message: 'Um usuario ja existe com esse e-mail.'
        })
    }

    try {
        const hash = await bcrypt.hash(password, SALT_ROUNDS)
        const user = await prisma.user.create({
            data: {
                hashPassword: hash,
                email
            }
        })

        return reply.code(201).send(user)
    } catch (err) {
        return reply.code(500).send(err)
    }
}

export async function updateUser(request:FastifyRequest<{Params: UpdateUserParam, Body: UpdateUserInput }>, reply:FastifyReply) {
    const { email, role } = request.body
    const { id } = request.params

    const user = await prisma.user.findUnique({where: {id: parseInt(id)}})

    if (!user) {
        return reply.code(401).send({
            message: "O usuario com esse ID não existe."
        })
    }

    try {
        const user = await prisma.user.update({where: {id: parseInt(id)}, data: {
            email,
            role
        }})

        return reply.code(201).send(user)
    } catch (err) {
        return reply.code(401).send(err)
    }
    
}

//login com conta existente
export async function login(
    request: FastifyRequest<{
        Body: LoginUserInput
    }>,
    reply: FastifyReply,
) {
    const { email, password } = request.body 

    const user = await prisma.user.findUnique({where: {email: email}})

    const isMatch = user && (await bcrypt.compare(password, user.hashPassword))

    if (!user || !isMatch) {
        return reply.code(401).send({
            message: 'E-mail ou senha invalidos.'
        })
    }

    const payload = {
        id: user.id,
        email: user.email
    }

    const token = request.jwt.sign(payload)

    reply.setCookie('access_token', token, {
        path: "/",
        httpOnly: true,
        secure: true
    })

    return {accessToken: token}
}

//logout
export async function logout(request: FastifyRequest, reply: FastifyReply) {
    reply.clearCookie('access_token')
    reply.clearCookie('is_authenticated')

    return reply.send({message: 'Logout feito com sucesso.'})
}

//obter todos os usuarios
export async function getUsers(request: FastifyRequest, reply: FastifyReply) {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            role: true
        }
    })

    return reply.code(200).send(users)
}

//obter um carro
export async function getCar(request:FastifyRequest<{Params: CreateSingleCarInput}>, reply: FastifyReply) {
    const { id } = request.params

    const carro = await prisma.car.findUnique({where: {id: parseInt(id)}})

    if (!carro) {
        return reply.code(401).send({
            message: 'Esse carro nao esta registrado.'
        })
    }

    return reply.code(201).send(carro)

}


//obter todos os carros
export async function getCarsValor(request: FastifyRequest, reply: FastifyReply) {
    
    const carros = await prisma.car.findMany({
        select: {
            id: true,
            nome: true,
            marca: true,
            modelo: true,
            valor: true,
            foto: true
        },
        orderBy: {
            valor: "desc"
        }
    }, )

    return reply.code(200).send(carros)
}

export async function getCars(request: FastifyRequest, reply: FastifyReply) {
    
    const carros = await prisma.car.findMany({
        select: {
            id: true,
            nome: true,
            marca: true,
            modelo: true,
            valor: true,
            foto: true
        }
    }, )

    return reply.code(200).send(carros)
}

//criacao de um novo carro
export async function createCar(request: FastifyRequest<{Body: CreateCarInput}>, reply: FastifyReply) {
    const { nome, marca, modelo, valor, foto } = request.body

    const carro = await prisma.car.findUnique({
        where: {
            nome: nome,
        }
    })
    if (carro) {
        return reply.code(401).send({
            message: 'Um carro ja existe com esse nome.'
        })
    }

    try {
        const carro = await prisma.car.create({
            data: {
                nome,
                marca,
                modelo,
                valor: parseFloat(valor),
                foto
            }
        })

        return reply.code(201).send(carro)
    } catch (err) {
        return reply.code(500).send(err)
    }
}

//atualizar um carro
export async function updateCar(request: FastifyRequest<{Body: UpdateCarInput, Params: CreateSingleCarInput}>, reply: FastifyReply) {
    const { nome, marca, modelo, valor, foto } = request.body
    const { id } = request.params


    const carro = await prisma.car.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    if (!carro) {
        return reply.code(401).send({
            message: 'Esse carro nao esta registrado.'
        })
    }

    try {
        const carro = await prisma.car.update({where: {
            id: parseInt(id)
        }, data: {
            nome,
            marca,
            modelo,
            valor: parseFloat(valor),
            foto
        }}, )

        return reply.code(201).send(carro)
    } catch (err) {
        return reply.code(500).send(err)
    }
}

export async function deleteCar(request: FastifyRequest<{Params: DeleteCarInput}>, reply: FastifyReply) {
    const { id } = request.params

    const carro = await prisma.car.findUnique({where: {id: parseInt(id)}})

    if (!carro) {
        return reply.code(401).send({
            message: 'Esse carro nao esta registrado.'
        })
    }

    try {
        await prisma.car.delete({where: {id : parseInt(id)}})

        return reply.code(201).send("Carro deletado.")
    } catch (err) {
        return reply.code(500).send(err)
    }
}