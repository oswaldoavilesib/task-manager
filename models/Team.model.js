const { Schema, model } = require("mongoose");

const teamSchema = new Schema({
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

module.exports = model('Team',teamSchema)