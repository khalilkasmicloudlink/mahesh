const mongoose = require("mongoose");
const { Schema, model } = require('mongoose')
const { ObjectId } = mongoose.Schema;

const videoSchema = new mongoose.Schema({
    videoUrl : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true,
        trim : true
    },
    description :{
        type : String,
        required : true,
        trim : true
    },
    course :{
        type :mongoose.Types.ObjectId,
        ref : 'Course',
        required : true
    },
    uploadedBy :{
        type :mongoose.Types.ObjectId,
        ref : 'User',
        
    }
}, { timestamps: true })

// const Videos = model('videos', videoSchema)

// module.exports = Videos
module.exports = mongoose.model('Video', videoSchema);
