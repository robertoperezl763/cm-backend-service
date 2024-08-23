import { fastifyPlugin } from 'fastify-plugin';
import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify';
import fastifyJwt from '@fastify/jwt'
import config from '../config';

declare module 'fastify' {
    export interface FastifyInstance {
        authenticate: Function;
    }
};

declare module '@fastify/jwt' {
    interface FastifyJWT {
      user: {
        id: number
        }; // user type is return type of `request.user` object
    }
  };

// declare module '@fastify/jwt' {
//      interface FastifyJwt {
//         user: {
//             id: number
//         };
//     }
// };



const authPlugin: FastifyPluginCallback = (server, undefined, done) => {
    server.register(fastifyJwt, { secret: config.jwt.secret });
    
    server.decorate('authenticate', async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
        try { 
            await req.jwtVerify();
        } catch (err) {
            reply.send(err);
        }
    })

    done();
};

export default fastifyPlugin(authPlugin);
