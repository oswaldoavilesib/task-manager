const { Schema, model } = require("mongoose");

const spaceSchema = new Schema({
    id: {
        type: Number
    },
    name:{
        type: String,
    },
    _user: {
        type:Schema.Types.ObjectId, ref:"User"
    },
},
{
    timestamps: true,

})

module.exports = model('Space',spaceSchema)