const { Schema, model } = require("mongoose");

const modelSchema = new Schema({
    id: {
        type: Number
    },
    name:{
        type: String,
    },
    _user: {
        type:Schema.Types.ObjectId, ref:"User"
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

module.exports = model('Model',modelSchema)