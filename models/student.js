const mongoose = require("mongoose")


const student = mongoose.Schema({
    name :{
        type : String,
        require : true
    },
    rollno : {
        type : String,
        require : true
    },
    dob : {
        type : Date,
        require : true
    },
    score : {
        type : Number,
        require : true
    }
});

module.exports = mongoose.model("students",student);