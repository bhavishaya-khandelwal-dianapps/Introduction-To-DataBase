const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/aggregation")
.then(() => {
    console.log("Connected Successfully");
})
.catch((err) => {
    console.log(`Some error occur and the error is ${err}`);
});


//* Schema (We have already created)
const userSchema = new mongoose.Schema({
    index : Number, 
    name : String, 
    isActive : Boolean, 
    registered : {
        type : Date, 
        default : Date.now 
    }, 
    age : Number, 
    gender : String, 
    eyeColor : String, 
    favoriteFruit : String, 
    company : Object,
    tags : [String], 
});

//* Model or Collection (we have already created)
const User = new mongoose.model("User", userSchema);



async function someFunction() {
    // const result = await User.find({ name : "Kitty Snow" }).explain();
    console.log(result);
}

someFunction();