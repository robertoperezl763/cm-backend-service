//import Application from "./app";
//import ApplicationCol from './app';
import fastify, { FastifyInstance } from 'fastify';
import { AppDataSource } from './data-source';
import config from './config';
import auth from './plugins/auth';

import { usersController } from './controllers/users-controller';
import { collectionsController } from './controllers/collections-controller';
import { itemsController } from './controllers/items-controller';


class Application {
    
    server: FastifyInstance;

    constructor() {
        this.server = fastify();
    }

    async startHTTPServer() {
        try {
            const address = await this.server.listen({ port : config.port});
            
            console.log(`Server listening at ${address}`);
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    }

    registerPluggins() {
        this.server.register(auth)
    }

    registerControllers() {
        this.server.register(usersController, {prefix: `${config.apiPrefix}/users`});
        this.server.register(collectionsController, {prefix: `${config.apiPrefix}/collections`});
        this.server.register(itemsController, {prefix: `${config.apiPrefix}/items`});
        
    }


    async main() {
        await AppDataSource.initialize();
        this.registerPluggins();
        this.registerControllers();
        await this.startHTTPServer();

        
    }
}

const appInstance = new Application();
appInstance.main();


// const appInstance = new ApplicationCol();
// appInstance.main();