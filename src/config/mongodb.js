import {MongoClient} from 'mongodb';


let client;
export const connectTOMongoDb=()=>{
  
    MongoClient.connect(process.env.DB_URL).then((clientInstance)=>{
        client=clientInstance
        console.log("connected to mongodb");
        createCounter(client.db());
        createIndex(client.db());

    }).catch((err)=>{
        console.log(err);
    });

    
}

export  const  getDB=()=>{
    return client.db();

}

export const createCounter= async (db)=>{

    //checking for the existing counter
    
    const existingCounter= await  db.collection("counters").findOne({_id:"cartItemId"});
    //if there is no existing counter create it
    if(!existingCounter){

        await db.collection("counters").insertOne({_id:"cartItemId",value:0});

    }

}

export const getClient=()=>{
    return client;
}

const createIndex= async (db)=>{
    try{
        
        //single filed index
        await db.collection("products").createIndex({price:1});

        //compund indexes
        await db.collection("products").createIndex({name:1,category:-1});

        //text indexes
        await db.collection("products").createIndex({desc:"text"});

    }
    catch(err){
        console.log(err);
    }
    console.log("indexes created");
}
