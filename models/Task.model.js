const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
    id: {
        type: String,
    },
    name:{
        type: String,
    },
    _user: {
        type:Schema.Types.ObjectId, ref:"User"
    },

    _list: {
        type:Schema.Types.ObjectId, ref:"List"
    },

    _folder: {
        type:Schema.Types.ObjectId, ref:"Folders"
    },

    _space: {
        type:Schema.Types.ObjectId, ref:"Space"
    },
    _team: {
        type:Schema.Types.ObjectId, ref:"Team"
    }
},
{
    timestamps: true,

})

module.exports = model('Task',taskSchema)