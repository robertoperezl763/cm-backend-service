import { FastifyPluginCallback } from 'fastify'
import { Item } from '../models/Items';
import { auth } from '../helper/authenticated';
import { IItemsReply, IItemBody, IItemReply, ICollectionItemId } from './types/item.type';
import { IIdParams, ISuccessfulReply } from './types/generic.types';
import { getIsNotFound, getIsSuccessfulDelete, getIsSuccessfulUpdate, getNotYours } from '../helper/validation-messages';
import { Collection } from '../models/Collections';



export const itemsController: FastifyPluginCallback = (server, undefined, done) => {
  //get items from public collection
  server.get<{
    Params: IIdParams  
    Reply: IItemsReply
    }>('/public/:id', { 
      // ...auth(server) 
    }, async (req, reply) => {

     const items = await Item.find({
      where: {
        collection: { 
          id: req.params.id,
         }
      }
     });
     //no error codes thrown
     //FIND
     //if (items == []) 
     
     reply.code(200).send({ items });
    });

    //get single item from public collection
    server.get<{
      Params: ICollectionItemId  
      Reply: IItemReply
      }>('/public/:collectionID/:id', { 
        ...auth(server) 
      }, async (req, reply) => {
  
        const item = await Item.findOne({
        where: {
          id: req.params.id,
          collection: {
            id: req.params.collectionID,
            isPublic: true
          }
        }
        });
        //no error codes thrown
        //FIND
        reply.code(200).send({ item });
      });
    
  
  
  //Get items by user collection
  server.get<{
      Params: IIdParams  
      Reply: IItemsReply
      }>('/:id', { 
        ...auth(server) 
      }, async (req, reply) => {

       const items = await Item.find({
        where: {
          collection: {
            id: req.params.id,
            user: { id: req.user.id}

           }
        }//,
//        relations: ['Collection']
       });
       //no error codes thrown
       //FIND
       reply.code(200).send({ items });
      });
    
  //get individual item by user collection
  server.get<{
    Params: ICollectionItemId  
    Reply: IItemReply
    }>('/:collectionID/:id', { 
      ...auth(server) 
    }, async (req, reply) => {

      const item = await Item.findOne({
      where: {
        id: req.params.id,
        collection : {
          id: req.params.collectionID,
          user: { id: req.user.id }
        }
      }
      });
      reply.code(200).send({ item });
    });
    
    //create new item endpoint
    server.post<{
      Params: IIdParams
      Body: IItemBody
      Reply: IItemReply
    }>('/:id', { 
      ...auth(server) 
    }, async (req, reply) => {
      
      const coll = await Collection.findOne({
        where: {
          id: req.params.id,
          user: { id: req.user.id }
        }
      });
      if (!coll) throw new Error(getNotYours("Collection"));

      const item = Item.create({
        name: req.body.item.name,
        description: req.body.item.description,
        imageURL: req.body.item.imageURL,
        imageUID: req.body.item.imageUID,
        author: req.body.item.author,
        series: req.body.item.series,
        collection: { 
          id: req.params.id
        }
      });

      const newItem = await item.save();
      
      reply.code(200).send({ item: newItem });
    });

    //Edit existing item ownded by me
    server.put<{
      Body: IItemReply,
      Reply: ISuccessfulReply
    }>('/', { 
      ...auth(server) 
      }, async (req, reply) => {

        //maybe this can be pulled into a custom function for easy updating purposes...
        const authCheck = await Item.findOne({
          where: {
            id: req.body.item.id,
            collection: {
              user: { id: req.user.id }
            }
          }//,
//          relations: ['Collection']
        });

        if (!authCheck) throw new Error(getNotYours("Item"));
        //######################
        await Item.update(req.body.item.id, req.body.item);
        reply.code(200).send({ message: getIsSuccessfulUpdate('Item')});
    });

    server.delete<{
      Params: IIdParams
      Reply: ISuccessfulReply
    }>('/:id', { 
      ...auth(server) 
    }, async (req, reply) => {

      //maybe this can be pulled into a custom function for easy updating purposes...
      const authCheck = await Item.findOne({
        where: {
          id: req.params.id,
          collection: {
            user: { id: req.user.id }
          }
        }//,
//        relations: ['Collection']
      });

      if (!authCheck) throw new Error(getNotYours('Item'));


      const item = Item.delete({id: req.params.id});

      reply.code(200).send({ message: getIsSuccessfulDelete('Item') });
    });

  done();
};