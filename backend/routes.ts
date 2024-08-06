import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { $ref } from "./schema.js";
import { createCar, createUser, deleteCar, getCar, getCars, getUsers, logout, updateCar } from "./controller.js";
import { login } from "./controller.js";

export async function routes(app: FastifyInstance) {
  app.get("/", {
    preHandler: [app.authenticate]
  }, (request: FastifyRequest, reply: FastifyReply) => {
    getUsers;
  });

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
  app.get("/carros", getCars);

  app.get("/carro/:id", getCar);
  app.post("/carro",{preHandler: [app.authenticate]}, createCar);
  app.put("/carro/:id", { preHandler: [app.authenticate] }, updateCar);
  app.delete("/carro/:id",{ preHandler: [app.authenticate] }, deleteCar);
}
