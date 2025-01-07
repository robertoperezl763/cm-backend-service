import { User } from "./models/User";
import { createCollection, createItem } from "./helper/seeding-shortcuts";

const consolePrefix = 'DATA SEEDING: ';

export const seedData = async () => {
    console.log(consolePrefix, 'Creating Users');
    const userObj = User.create<User>({
        email: 'testuser@gmail.com',
        password: '123password',
        lastName: 'Perez',
        firstName: 'Rob'
    });

    let user;

    try {
        user = await userObj.save();
        console.log('-----------Created new TestUser!');
    } catch(error) {
        console.log(consolePrefix, "Data is already seeded, skip seeding process");
        return;
    }

    console.log(consolePrefix, 'Creating collections');
    
    const libraryCollection = await createCollection(user.id, 'Library Collection', "This is a library!", "", true, true, true);
    const cardCollection = await createCollection(user.id, 'Poker Card Collection', "", "", false, false, false);
    const cdCollection = await createCollection(user.id, 'CD Collection', "CDs", "", true, false, true);
    
    console.log(consolePrefix, 'Creating Items');
    await createItem('Naruto Volumne 1', libraryCollection, 'This is the first Naruto volume', '', 'Kishimoto', 'Naruto');
    await createItem('Wisdom of Winners', libraryCollection, 'Quotes Book', '', 'Jim Stovall', null);
    await createItem('Jujutsu Kaise', libraryCollection, 'I like JJK', '', 'Gege Akatumi', 'Jujutsu Kaise');

    await createItem('Hawaii Cards', cardCollection, "", "", null, null);
    await createItem('Nissan Cards', cardCollection, "From the fair!", "", null, null);
    await createItem('Las Vegas Cards', cardCollection, "Cool and Purple", "", null, null);

    await createItem('Dawn FM', cdCollection, 'You are now listening to Dawn FM', '', 'The Weeknd', null);
    await createItem('After Hours', cdCollection, '', '', 'The Weeknd', null);
    await createItem('Starboy', cdCollection, 'mf starboy', '', 'The Weeknd', null);

    console.log(consolePrefix, 'Data Seeding Completed');

    
}