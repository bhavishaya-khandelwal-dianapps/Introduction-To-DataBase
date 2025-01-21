//todo Step 1 : First of all we will going to import our MongoClient from mongodb
//? 1. Importing the MongoClient from mongodb  
import { MongoClient } from "mongodb";


//todo Step 2 : Now, the second step is that we create an instance of this MongoClient
//? 2. Creating the instance of MongoClient
const client = new MongoClient("mongodb://localhost:27017");



//todo Step 3 : With the help of this client instance we'll connect to our mongo-db server 
//* It will return a promise, so we use top-level await
//? 3. Connect to the mongoDB server 
await client.connect();



//todo Step 4 : Now, we are going to create a dataBase 
//* And using this client instance, we are going to create our database 
//? 4. Creating the dataBase  
const db = client.db("myFirstDataBase");



//todo Step 5 : Now, we are going to create collection in this dataBase 
//? 5. Creating the collection in our dataBase 
const userCollection = db.collection("users");




//todo Step 6 : Now, we are going to add some data in our collection 
//? 6. Simply add some data to the newly created collection 
//* To insert only single data 
// userCollection.insertOne({
//     name : "Rayan", 
//     age : 22
// });

//* To insert more than one data
// userCollection.insertMany(
//     [
//         {
//             name : "Bhavishaya Khandelwal",
//             role : "Software Engineer Trainee", 
//             age : 22, 
//         }, 
//         {
//             name : "Karan Basandani", 
//             role : "Graphic Designer",
//             age : 23,  
//         }, 
//         {
//             name : "Aditi Pawar", 
//             role : "UI / UX Designer",
//             age : 21,
//         }
//     ]
// );






//todo Step 7 : Now, we are goin to READ data from our dataBase
//* Here we are getting data in the form of "CURSOR", basically it is also an object which returns us data 
//? Now, Simply we are READING data 
const usersCursor = userCollection.find();
// console.log(usersCursor);

//! Method 1 : Iterating through for of loop 
//* We can iterate through this "usersCursor" using, but make sure to use "top-level await" as it is returning us a promise  
// for await (const user of usersCursor) {
//     console.log(user);
// }


//! Method 2 : Convert our "usersCursor" into an array so that we can directly access their values 
const userCursor = await userCollection.find().toArray();
console.log(userCursor);






//todo Step 8 : If we want to find a specific user then we can use findOne() method  
//? Specific user can be find using findOne() method  
const user = await userCollection.findOne({
    name : "Bhavishaya"
});
console.log();
console.log(user);