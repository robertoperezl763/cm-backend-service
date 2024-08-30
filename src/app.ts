import { AppDataSource } from "./data-source"
import { User } from "./models/User"
import { Collection } from "./models/Collections";
import { Item } from "./models/Items";

function createCollection(): void {
    const collection = new Collection();
    

    //collection.user = user;
    collection.name = 'test collection1';
    collection.description = 'test description 1';
    collection.imageURL = './imageURL/Example.jpg';
    collection.hasAuthor = true;
    collection.hasSeries = false;
    collection.isPublic = true;
} 

class ApplicationCol {
    async main() {
        await AppDataSource.initialize();

        // const user = new User();

        // user.email = 'johndoe123@gmail.com';
        // user.password = 'IlovemyGF123';
        // user.firstName = 'Roberto';
        // user.lastName = 'Perez';

       
        const user = await User.findOneBy({id: 1});
        console.log(`User ${user.firstName} found and selected`);

        const collection = new Collection();
        
        collection.name = 'testCollection';
        collection.description = 'testCollection Description is this box';
        collection.imageURL = './example/Image.jpg';

        try {
            await collection.save();
            console.log(`${collection.name} saved successfully`);
        } catch (err) {
            console.log(err)
        }
        
        //const collection = await Collection.findOneBy({id: 1});
        // console.log(`User ${collection.name} found and selected`);

        // const item = new Item();

        // item.collection = collection; //FK
        // item.name = 'test item 1';
        // item.description = 'test item description';
        // item.imageURL = './testItemURL.jpg';
        // item.author = 'Gege Akatumi';


        
        // try {
        //     await item.save();
        //     console.log(`New Item Named ${item.name} created successful`);
        // } catch (error) {
        //     console.log(error);
        // }


        // const freshCollection = await Collection.findOneBy({id: 1});
        
        // const item = new Item();

        // item.collection = freshCollection;
        // item.name = 'item test';
        // item.description = 'item test description';
        // item.imageURL = './ImageURL/ex.jpg';

        // try {
        //     await item.save();
        //     console.log('item created successful');
        // } catch (error) {
        //     console.log(error);
        // }

        

        // const isPasswordValid = await user.isPasswordValid('IlovemyGF123') 
        // console.log('isPasswordValid', isPasswordValid)

        
        
        
    }
}

export default ApplicationCol;