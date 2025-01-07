import { Collection } from "../models/Collections";
import { Item } from "../models/Items";

export const createCollection = async (
    userId: number,
    name: string,
    description?: string, 
    imageURL?: string, 
    hasAuthor?: boolean, 
    hasSeries?: Boolean, 
    isPublic?: Boolean ) => {
        const collection = Collection.create<Collection>({
            name,
            description: description || "",
            imageURL: imageURL || "",
            imageUID: "",
            hasAuthor: hasAuthor || false,
            hasSeries: hasSeries || false,
            isPublic: isPublic || true,
            user: {
                id: userId
            }
            
        });

        try {
            await collection.save();
            console.log('-----------Created new Collection!');
        } catch (error) {
            console.log('error', error.toString());
        }

        return collection;
};

export const createItem = async (
    name: string,  
    collection: Collection, 
    description?: string, 
    imageURL?: string, 
    author?: string, 
    series?: string) => {
        
        const item = Item.create<Item>({
            name,
            collection,
            description: description || "",
            imageURL: imageURL || "",
            imageUID:"",
            author: author || null,
            series: series || null,
        });

        try {
            await item.save();
            console.log('-----------Created new Item!');
        } catch (error) {
            console.log('error', error.toString());
        }

        return item; 
    };