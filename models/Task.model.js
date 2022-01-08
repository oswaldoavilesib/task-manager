const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
    id: {
        type: Number
    },
    name:{
        type: String,
        required: [true,"You must provide a name for this task"]
    },
    _user: {
        type:Schema.Types.ObjectId, ref:"User"
    },
},
{
    timestamps: true,

})

module.exports = model('Task',taskSchema)