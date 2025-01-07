import { FastifyPluginCallback } from "fastify";


export const imageUploadController: FastifyPluginCallback = (server, undefined, done) => {
    server.get<{}>('/', {}, async (req, reply) => {

      })

    done();
}