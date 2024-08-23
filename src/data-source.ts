import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./models/User"
import { Collection } from "./models/Collections";
import { Item } from "./models/Items";
import config from "./config";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: config.postgress.host,
    port: config.postgress.port,
    username: config.postgress.username,
    password: config.postgress.password, //will be ENV variable when deployed
    database: config.postgress.database,
    synchronize: true,
    logging: false,
    entities: [User, Collection, Item, ]
});
