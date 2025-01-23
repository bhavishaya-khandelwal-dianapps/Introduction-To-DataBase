//* Import mongoose 
const mongoose = require("mongoose");
const validator = require("validator");


//* Connect to mongo db server 
mongoose.connect("mongodb://localhost:27017/youtubeDatabase")
.then(() => {
    console.log(`Connection successful....`);
})
.catch((error) => {
    console.log(error);
})



//* Create schema  
const youtubeSchema = new mongoose.Schema({
    name : {
        type : String, 
        required : true, 
        unique : true, 
        lowercase : true, 
        trim : true, 
        minlength : [3, "Minimum length of characters is 3 "],
        maxlength : 30
    }, 
    courseType : {
        type : String, 
        required : true,
        lowercase : true, 
        enum : ["frontend", "backend", "database", "classical music", "data structures"]
    }, 
    videos : {
        type : Number, 
        
        //! Method 1 : For validation  
        validate(value) {
            if(value < 0) {
                throw new Error("Videos count can't be negetive");
            } 
        }

        //! Method 2 : For validation  
        // validate : {
        //     validator : function(value) {
        //         return (value < 0);
        //     },
        //     message : "Videos count can't be negetive"
        // }
    },
    author : String, 
    email : {
        type : String,
        required : true, 
        unique : true, 
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Email is not valid");
            }
        }
    }, 
    active : Boolean, 
    date : {
        type : Date, 
        default : Date.now 
    } 
});



//* Create a model or simple colle(ction 
const Youtube = new mongoose.model("Youtube", youtubeSchema);




//* Now, add some document in our collection 
const addSomeData = async () => {
    try {
        const reactPlaylist = new Youtube({
            name : "react js", 
            courseType : "frontend", 
            videos : 80, 
            author : "thapa technical", 
            active : true, 
        });

        const nodePlaylist = new Youtube({
            name : "Node Js", 
            courseType : "backend", 
            videos : 60, 
            author : "thapa technical", 
            active : true, 
        });

        const mongodbPlaylist = new Youtube({
            name : "mongo db", 
            courseType : "database", 
            videos : 70, 
            author : "thapa technical", 
            active : true, 
        });

        const raagYamanPlaylist = new Youtube({
            name : "Raag Yaman", 
            courseType : "Classical Music", 
            videos : 15, 
            author : "Sanskriti Khandelwal", 
            active : true
        });


        const arrayPlaylist = new Youtube({
            name : "Arrays in C++", 
            courseType : "data structures", 
            videos : 40, 
            author : "Striver", 
            active : false 
        });


        const stackPlaylist = new Youtube({
            name : "Stack in C++", 
            courseType : "data structures", 
            videos : 30, 
            author : "Bhavishaya Khandelwal", 
            email : "bhavishaya.khandelwal@dianapps.com", 
            active : true, 
        });


        const result = await Youtube.insertMany([stackPlaylist]);
        console.log(result);
    }
    catch(error) {
        console.log(`Some error occured and the error is ${error}`);
    }
};

addSomeData();