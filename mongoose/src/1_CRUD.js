//todo Step 1 : First of all, we have to import "mongoose" 
const mongoose = require("mongoose");



//todo Step 2 : Now, we are going to connect to our mongodb server and at the same time we are going to create our database by adding the name of the database in the same link  
mongoose.connect("mongodb://localhost:27017/playlistDatabase", {
    useNewUrlParser : true,
    useUnifiedTopology : true, 
})
.then(() => {
    console.log("Connection successful.....");
})
.catch((err) => {
    console.log(`Some error occured : ${err}`);
});




//todo Step 3 : Creating schema 
//? Schema : A mongoose schema is a document data structure (or shape of the document) that is enforced via the application layer. 
//! Basically it defines the structure of the document
//* It also helps us to get default values, validators, etc.
const playlistSchema = new mongoose.Schema({
    name : {
        type : String, 
        required : true
    }, 
    courseType : String, 
    videos : Number, 
    author : String,
    active : Boolean, 
    date : {
        type : Date, 
        default : Date.now
    }
});






//todo Step 4 : Create model 
//* As we have created our schema, now based on that we are going to create our model
//? Now we are going to create a class

//! Here we are creating our collection  
//todo NOTE : We have to give names of collection in SINGULAR form it will automatically convert into PLURAL form in our data base  
const Playlist = new mongoose.model("Playlist", playlistSchema);





//todo Step 5 : Now, we are going to create our document  
const createDocument = async () => {
    try {
        const reactPlaylist = new Playlist({
            name : "React JS", 
            courseType : "Front End", 
            videos : 80, 
            author : "Thapa Technical",
            active : true, 
            //* If we don't give value to date filed then it is OK, because we have already setted a default value to it, and if we don't add this filed then it will automatically takes that default value
        });

        const nodePlaylist = new Playlist({
            name : "Node JS", 
            courseType : "Back End", 
            videos : 50, 
            author : "Thapa Technical",
            active : true, 
        });

        const jsPlaylist = new Playlist({
            name : "JavaScript", 
            courseType : "Front End", 
            videos : 150, 
            author : "Thapa Technical", 
            active : true
        });

        const mongoPlaylist = new Playlist({
            name : "Mongo DB", 
            courseType : "Data Base", 
            videos : 30, 
            author : "Thapa Technical", 
            active : true
        });

        const mongoosePlaylist = new Playlist({
            name : "Mongoose", 
            courseType : "Data Base", 
            videos : 20, 
            author : "Thapa Technical", 
            active : true
        });

        const expressPlaylist = new Playlist({
            name : "Express JS", 
            courseType : "Back End", 
            videos : 80, 
            author : "Thapa Technical",
            active : true, 
        });
    

        //! Method 1 : To insert a single document 
        // const result = await reactPlaylist.save(); 
        // console.log(result);
        // await jsPlaylist.save();
        // await mongoPlaylist.save();
        // await mongoosePlaylist.save();



        //! Method 2 : To insert all the documents together  
        const result = await Playlist.insertMany([reactPlaylist, jsPlaylist, nodePlaylist, expressPlaylist, mongoPlaylist, mongoosePlaylist]);
        console.log(result);
    } 
    catch(error) {
        console.log(`Some error occured while creating a document and the error is ${err}`);
    }
};


// createDocument();  






//todo Step 6 : Now, we are going to perform READ oparation in Mongoose 
const getDocument = async () => {
    try {
        
        //! Getting all the documents using find() method  
        // const result = await Playlist.find();
        // console.log(result);

        //! Getting only single document  
        // const resultReactPlaylist = await Playlist.findOne({ name : "React JS" });
        // console.log(resultReactPlaylist);

        //! Getting only courseName whose courseType is "Front End" 
        const result = await Playlist.find({ courseType : "Front End" }).select({ name : 1 });
        console.log(result);
    }
    catch(err) {
        console.log(`Some error occured while reading the data from the mongoDB server and the error is ${err}`);
    }
};

// getDocument();







//todo Step 7 : Mongoose Comparison Operator 
const getComparisonQueries = async () => {
    try {
        //! Getting all the documents where videos = 50 
        // const result = await Playlist.find({ videos : 80 });
        // console.log(result);


        //! Getting all the documents where videos are greater than 80 
        // const result = await Playlist.find({ videos : {$gt : 50} });
        // console.log(result);


        //! Getting all the documents whose courseType is either "Back End" or "Data Base" 
        // const result = await Playlist.find({ courseType : { $in : [ "Back End", "Data Base" ] } });
        // console.log(result);


        //! Getting all the documents whose courseType is not either "Back End" or "Data Base" 
        // const result = await Playlist.find({ courseType : { $nin : [ "Back End", "Data Base" ] } }).select({ name : 1, courseType : 1 });
        // console.log(result); 


        //! Getting all the documents whose courseType is not equal to "Data Base"
        const result = await Playlist.find({ courseType : { $ne : "Data Base" } }).select({ name  : 1, courseType : 1 });
        console.log(result);
    }
    catch(error) {
        console.log(error); 
    }
};


// getComparisonQueries();






//todo Step 8 : Mongoose Logical Operator  
const getLogicalQueriesOutput = async () => {
    try {
        //! Getting all the documents whose courseType is "Back End" or author is "Thapa Technical" 
        // const result = await Playlist.find({
        //     $or : [ { courseType : "Back End" }, { author : "Thapa Technical" } ]
        // });
        // console.log(result);


        //! Getting all the documents whose courseType is "Back End" and author is "Thapa Technical" 
        // const result = await Playlist.find({
        //     $and : [ { courseType : "Back End" }, { author : "Thapa Technical" } ]
        // });
        // console.log(result);


        //! Getting all the documents whose courseType is not "Back End", "Front End" 
        // const result = await Playlist.find({
        //     $nor : [ { courseType : "Back End" }, { courseType : "Front End" } ]
        // });
        // console.log(result);


        //! Getting all the documents whose courseType is not "Back End", "Front End" 
        const result = await Playlist.find({
            courseType : { $nin : ["Front End", "Back End"] }
        });
        console.log(result);
    }
    catch(error) {
        console.log(error);
    }
};


// getLogicalQueriesOutput();







//todo Step 9 : Mongoose Query Sorting and Counting 
const getSortingAndCountingQueries = async () => {
    //! Count all the documents whose courseType is "Front End" and author is "Thapa Technical" 
    // const result = await Playlist.find({ author : "Thapa Technical" }).countDocuments();
    // console.log(result);


    //! Sort all the documents
    const result = await Playlist.find({ author : "Thapa Technical" }).select({ name : 1 }).sort({ name : -1 });
    console.log(result);
};  


// getSortingAndCountingQueries();








//todo Step 10 Mongoose CRUD UPDATE Query  :- 
const updateDocument = async (id) => {
    try {
        //! It I want to update video number where name is "Node JS"
        // const result = await Playlist.updateOne({ _id : id }, { $set : { videos : 500 } });
        // console.log(result);

        //! If we want to know that which document we have updated and what are the fields whose values are updated then we have to use 'findByIdAndUpdate()' method instead of 'updateOne()' method 
        const result = await Playlist.findByIdAndUpdate(
            { _id : id }, 
            { $set : { videos : "123", name : "Node JS" } },
            { new : true, useFindAndModify : false }
        );
        console.log(result);
    }
    catch(error) {
        console.log(error);
    } 
}; 

// updateDocument("6790bb9ebe4d119ab55581f1");






//todo Step 11 : Mongoose CRUD Delete Query 
const deleteDocument = async (id) => {
    try {
        //! Delete the document with the given id 
        // const result = await Playlist.deleteOne({ _id : id });
        // console.log(result);
        
        //! Delete the document with the given id and see which docoment you have deleted  
        const result = await Playlist.findByIdAndDelete({ _id : id });
        console.log(result);
    }
    catch(error) {
        console.log(error);
    }
}


// deleteDocument("6790bb9ebe4d119ab55581f3");