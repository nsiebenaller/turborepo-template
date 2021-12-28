import fastify, { FastifyRequest } from "fastify";
import { config } from "dotenv";
import { green } from "chalk";
import { PrismaClient as DBMain } from "db-main";

config();

const PORT = process.env.PORT || "1234";
const HOST = "0.0.0.0";

export async function startServer() {
  const client = new DBMain();
  const server = fastify();

  server.get("/", function (_request, reply) {
    reply.send({ hello: "world 3" });
  });

  server.get("/api/users", async (_request, reply) => {
    const users = await client.user.findMany();
    reply.send(users);
  });

  server.get(
    "/api/users/:id",
    async (req: FastifyRequest<{ Params: { id: string } }>, reply) => {
      const id = parseInt(req.params.id);
      const user = await client.user.findUnique({
        where: { id },
      });
      reply.send(user);
    }
  );

  try {
    await server.ready();
    console.log(`Server listening on... ${green(`${HOST}:${PORT}`)} 🚀`);
    await server.listen(PORT, HOST);
  } catch (err) {
    cleanup(err);
  }

  process.on("unhandledRejection", cleanup);

  function cleanup(err: unknown) {
    console.error(err);
    process.exit(1);
  }
}

startServer();
