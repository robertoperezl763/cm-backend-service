import { Item } from "../../models/Items";

export interface IItemsReply {
    items: Partial<Item>[];
}

export interface ICollectionItemId {
    collectionID: number,
    id: number;
};

export interface IItemReply {
    item: Partial<Item>;
}

export interface IItemBody {
    item: {
        name: string,
        description: string,
        imageURL: string,
        author: string,
        series: string
    }
}