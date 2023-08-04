const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogs_schema = new Schema({

    name:{
        type: String ,
        required: true 
    },

    mail:{
        type: String,
        required: true 
    },

    message:{
        type: String,
        required: true 
    }
}, { timestamps : true })

const Blogs = mongoose.model("blogs",blogs_schema);
module.exports=Blogs;