const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const courseSchema = new mongoose.Schema({
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
    category: {
        type: ObjectId,
        ref: "Category",
        required: true
    },
    price : {
        type : Number,
        required : true,
        trim : true
    },
    lectures: [{
        type :mongoose.Types.ObjectId,
        ref : "Video",
       
    }],
     photoUrl: {
        type: String,
    },
    createdBy: {
        type: ObjectId,
        ref: "User",
       
      },
    
},
 { timestamps: true }
)




module.exports = mongoose.model("Course", courseSchema);



