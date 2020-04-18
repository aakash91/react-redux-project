import {defaultState} from './defaultState';
import { connectDB } from './connect-db';

async function initializeDB(){
    let db = await connectDB();
    for(let collectionName in defaultState){
        let collection = db.collection(collectionName);
        console.log("Trying to insert data");
        await collection.insertMany(defaultState[collectionName]);
    }
}

initializeDB();