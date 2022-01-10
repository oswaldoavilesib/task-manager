const { Schema, model } = require("mongoose");

const spaceSchema = new Schema({
    id: {
        type: Number
    },
    name:{
        type: String,
    },
},
{
    timestamps: true,

})

module.exports = model('Space',spaceSchema)