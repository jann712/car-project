import {z} from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

//schema para criacao de usuarios

const createUserSchema = z.object({
  email: z.string(),
  password: z.string().min(6)
})

// transformando o schema em tipo para o request body
export type CreateUserInput = z.infer<typeof createUserSchema>

const updateUserSchema = z.object({
  email: z.string(),
  role: z.string()
})

export type UpdateUserInput = z.infer<typeof updateUserSchema>

//schema para registrar um usuario
const createUserResponseSchema = z.object({
  id: z.number(),
  email: z.string()
})

//schema para rota de login
const loginSchema = z.object({
  email: z.string({
    required_error: 'E-mail e necessario.',
    invalid_type_error: 'E-mail deve ser uma string.'
  }).email(),
  password: z.string().min(6)
})

// transformando o schema em tipo para a rota de login
export type LoginUserInput = z.infer<typeof loginSchema>

//schema para o token jwt
const loginResponseSchema = z.object({
  accessToken: z.string()
})

export const {schemas: userSchemas, $ref} = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
  loginSchema,
  loginResponseSchema
})


//schema para criacao de carros

const createCarSchema = z.object({
  nome: z.string(),
  marca: z.string(),
  modelo: z.string(),
  valor: z.number(),
  foto: z.string()
})

//transformando o schema em tipo para a criacao de novos carros
export type CreateCarInput = z.infer<typeof createCarSchema>

const updateCarSchema = z.object({
  nome: z.string(),
  marca: z.string(),
  modelo: z.string(),
  valor: z.number(),
  foto: z.string()
})

//transformando em schema
export type UpdateCarInput = z.infer<typeof updateCarSchema>

//schema para delecao de carros
const deleteCarSchema = z.object({
  id: z.number()
})

export type DeleteCarInput = z.infer<typeof deleteCarSchema>
export type CreateSingleCarInput = z.infer<typeof deleteCarSchema>
export type UpdateUserParam = z.infer<typeof deleteCarSchema>