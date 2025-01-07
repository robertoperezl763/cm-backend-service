import { FastifyPluginCallback } from 'fastify'
import { Collection } from '../models/Collections';
import { auth } from '../helper/authenticated';
import { ICollectionsReply, ICollectionReply, ICollectionBody, IQuerystring } from './types/collection.types';
import { IIdParams, ISuccessfulReply } from './types/generic.types';
import { getIsNotFound, getIsPrivate, getIsSuccessfulDelete, getIsSuccessfulUpdate, getNotYours } from '../helper/validation-messages';


export const collectionsController: FastifyPluginCallback = (server, undefined, done) => {
    //Single Collection Get - Public
    server.get<{
      Querystring: IQuerystring,
      Reply: ICollectionsReply
    }>('/public', { 
    }, async (req, reply) => {
      
    const userFilter: number = Number(req.query.user)
    if(userFilter){
      
      const collections = await Collection.find({
        where: {
          isPublic: true,
          user: { id: userFilter } 
        }
      });
      reply.code(200).send({ collections });
    }

    const collections = await Collection.find({
      where: {
        isPublic: true
        // user: { id: req.user.id }
      },
     });
     reply.code(200).send({ collections });
    });

    //Single Collection Get - Public
    server.get<{
      Params: IIdParams
      Reply: ICollectionReply
    }>('/public/:id', { 
    }, async (req, reply) => {

     const collection = await Collection.findOne({
      where: {
        id: req.params.id,
        // isPublic: true
        // user: { id: req.user.id }
      }
     });
     if (!collection) throw new Error(getIsPrivate('Collection'))
     reply.code(200).send({ collection });
    });

    //All Collections by User
    server.get<{
        Reply: ICollectionsReply
      }>('/', { 
        ...auth(server) 
      }, async (req, reply) => {

       const collections = await Collection.find({
        where: {
          user: { id: req.user.id }
        }
       });
       reply.code(200).send({ collections });
      });
      
      //Single Collection by User
      server.get<{
        Params: IIdParams,
        Reply: ICollectionReply
      }>('/:id', { 
        ...auth(server) 
      }, async (req, reply) => {
        const collection = await Collection.findOne({
            where: {
              user: { id: req.user.id },
              id: req.params.id
            }
        });

       if (!collection) throw new Error(getNotYours('Collection'))

       reply.code(200).send({ collection });
      });

      //Create new collection by user
      server.post<{
        Body: ICollectionBody
        Reply: ICollectionReply
      }>('/', { 
        ...auth(server) 
      }, async (req, reply) => {
        const collection = Collection.create({
          name: req.body.collection.name,
          description: req.body.collection.description,
          imageURL: req.body.collection.imageURL,
          imageUID: req.body.collection.imageUID,
          hasAuthor: req.body.collection.hasAuthor,
          hasSeries: req.body.collection.hasSeries,
          isPublic: req.body.collection.isPublic,
          user: {
            id: req.user.id
          }
        });

        const newCollection = await collection.save();
        reply.code(200).send({ collection: newCollection });
      });

      //Update collection by user
      server.put<{
        Body: ICollectionReply,
        Reply: ISuccessfulReply
      }>('/', { 
        ...auth(server) 
        }, async (req, reply) => {
          //maybe this can be pulled into a custom function for easy updating purposes...
          const authCheck = await Collection.findOne({
            where: {
              id: req.body.collection.id,
              user: { id: req.user.id }
            }//,
  //          relations: ['Collection']
          });
  
          if (!authCheck) throw new Error(getNotYours("Collection"));

          await Collection.update(req.body.collection.id, req.body.collection);
          //can maybe do auth check natively through this function not sure...
          reply.code(200).send({ message: getIsSuccessfulUpdate('Collection')});
      });

      //Delete User Collection
      server.delete<{
        Params: IIdParams
        Reply: ISuccessfulReply
      }>('/:id', { 
        ...auth(server) 
      }, async (req, reply) => {
        const collection = Collection.delete({
          id: req.params.id,
          user: {
            id: req.user.id,
          }
        })

        reply.code(200).send({ message: getIsSuccessfulDelete('Collection') });
      });

    done();
  };