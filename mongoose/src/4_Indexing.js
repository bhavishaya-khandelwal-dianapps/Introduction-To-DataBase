const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/teachersDatabase")
.then(() => {
    console.log("Connection successfully established with the mongoDB server");
})
.catch((error) => {
    console.log(`Some error occured and the error is ${error}`);
});


const teacherSchema = new mongoose.Schema({
    _id : Number, 
    name : String, 
    age : Number,
    gender : String
});


const Teacher = new mongoose.model("Teacher", teacherSchema);


const addSomeData = async () => {
    try {
        const result = await Teacher.insertMany([
            { "_id": 1, "name": "Alice", "age": 25, "gender": "Female" },
            { "_id": 2, "name": "Bob", "age": 30, "gender": "Male" },
            { "_id": 3, "name": "Charlie", "age": 22, "gender": "Male" },
            { "_id": 4, "name": "David", "age": 35, "gender": "Male" },
            { "_id": 5, "name": "Eve", "age": 28, "gender": "Female" },
            { "_id": 6, "name": "Frank", "age": 40, "gender": "Male" },
            { "_id": 7, "name": "Grace", "age": 27, "gender": "Female" },
            { "_id": 8, "name": "Harry", "age": 32, "gender": "Male" },
            { "_id": 9, "name": "Isabella", "age": 29, "gender": "Female" },
            { "_id": 10, "name": "Jack", "age": 38, "gender": "Male" },
            { "_id": 11, "name": "Kate", "age": 24, "gender": "Female" },
            { "_id": 12, "name": "Liam", "age": 33, "gender": "Male" },
            { "_id": 13, "name": "Mia", "age": 26, "gender": "Female" },
            { "_id": 14, "name": "Noah", "age": 36, "gender": "Male" },
            { "_id": 15, "name": "Olivia", "age": 31, "gender": "Female" },
            { "_id": 16, "name": "Penelope", "age": 23, "gender": "Female" },
            { "_id": 17, "name": "Quentin", "age": 34, "gender": "Male" },
            { "_id": 18, "name": "Rachel", "age": 21, "gender": "Female" },
            { "_id": 19, "name": "Samuel", "age": 37, "gender": "Male" },
            { "_id": 20, "name": "Sophia", "age": 39, "gender": "Female" }
          ]);
    }
    catch(error) {
        console.log(error);
    }
};

// addSomeData();




const findTeacher = async () => {
    const res = await Teacher.find({
        age : { $lt : 30 }
    }).explain();
    console.log(res);
}

// findTeacher();

const createIndex = async () => {
    const res = await Teacher.getIndexes();
    console.log(res);
};

createIndex();