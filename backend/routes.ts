import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { $ref } from "./schema.js";
import { createCar, createUser, deleteCar, getCar, getCars, getCarsValor, getUsers, logout, updateCar, updateUser } from "./controller.js";
import { login } from "./controller.js";

export async function routes(app: FastifyInstance) {
  app.get("/", {
    preHandler: [app.authenticate]
  }, () => {});

  app.get("/users", {preHandler: [app.authenticate]}, 
    getUsers
  )

  //cadastro de usuario
  app.post('registro',
    {
      schema: {
        body: $ref('createUserSchema'),
        response: {
          201: $ref('createUserResponseSchema')
        }
      }
    },
    createUser
  )

  //att de usuario
  app.put("/user/:id", {preHandler: [app.authenticate]}, updateUser)

  //login
  app.post(
    "login",
    {
      schema: {
        body: $ref("loginSchema"),
        response: {
          201: $ref('loginResponseSchema'),
        },
      },
    },
    login,
  );

  app.delete('logout',{ preHandler: [app.authenticate] }, logout)
  app.get("/carros", getCarsValor);
  app.get("/admincarros",{preHandler: [app.authenticate]}, getCars);

  //crud carros
  app.get("/carro/:id", getCar);
  app.post("/carro",{preHandler: [app.authenticate]}, createCar);
  app.put("/carro/:id", { preHandler: [app.authenticate] }, updateCar);
  app.delete("/carro/:id",{ preHandler: [app.authenticate] }, deleteCar);
}
