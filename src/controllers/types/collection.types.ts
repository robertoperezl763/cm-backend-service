import { Collection } from "../../models/Collections";

export interface ICollectionsReply {
    collections: Partial<Collection>[];
}

export interface ICollectionReply {
    collection: Partial<Collection>;
}


export interface ICollectionBody {
    collection: {
        name: string,
        description: string,
        imageURL: string,
        hasAuthor: boolean,
        hasSeries: boolean,
        isPublic: boolean
    }
}