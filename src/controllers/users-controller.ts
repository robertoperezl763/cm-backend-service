import { FastifyPluginCallback } from 'fastify'
import { User } from '../models/User';
import { IIdParams, ISuccessfulReply } from './types/generic.types';
import { IUserBody, IUserReply, ITokenReply } from './types/user.types';
import { idParamsSchema,successfulResponseSchema  } from './schemas/generic.schemas';
import { userBodySchema, userResponseSchema, tokenResponseSchema} from './schemas/user.schemas';
import { auth } from '../helper/authenticated';
import { getIsSuccessfulDelete, getIsSuccessfulUpdate } from '../helper/validation-messages';



export const usersController: FastifyPluginCallback = (server, undefined, done) => {
    //get method for users
    server.get<{
        Params: IIdParams,
        Reply: IUserReply
      }>('/:id',{ 
        schema: {...idParamsSchema, ...userResponseSchema },
        ...auth(server) 
      }, async (req, reply) => {
        const user = await User.findOneBy({id: req.params.id});
        if (!user) throw new Error('User not found');
        reply.code(200).send({ user});
      });

      server.post<{
        Body: IUserBody,
        Reply: IUserReply
      }>('/',{ schema: { ...userBodySchema, ...userResponseSchema } }, async (req, reply) => {
        const user = User.create<User>(req.body.user);
        const newUser = await user.save();
        reply.code(200).send({ user: newUser });
      });

      server.post<{
        Body: IUserBody,
        Reply: ITokenReply
      }>('/login',{ schema: { ...userBodySchema, ...tokenResponseSchema } }, async (req, reply) => {
        const invalidCredentialsError = 'The provided user details are invalid'
        
        const user = await User.findOneBy({ email: req.body.user.email });
        if (!user) throw new Error(invalidCredentialsError);
        
        const isPasswordValid = user.isPasswordValid(req.body.user.password);
        if (!isPasswordValid) throw new Error(invalidCredentialsError);
     
        const token = server.jwt.sign({ ...user });

        reply.code(200).send({ token });
      });


      server.put<{
        Body: IUserBody,
        Reply: ISuccessfulReply
      }>('/',{ schema: { ...userBodySchema, ...successfulResponseSchema } }, async (req, reply) => {
        await User.update(req.body.user.id, req.body.user);
        reply.code(200).send({ message: getIsSuccessfulUpdate('User')});
      });

      server.delete<{
        Params: IIdParams,
        Reply: ISuccessfulReply
      }>('/:id',{ schema: { ...idParamsSchema, ...successfulResponseSchema } }, async (req, reply) => {
        await User.delete(req.params.id);
        reply.code(200).send({ message: getIsSuccessfulDelete('User') });
      });


    done();
  };