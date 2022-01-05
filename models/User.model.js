const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "You must provide a username"]
      // unique: true -> Ideally, should be unique, but its up to you
    },
    password:{
      type: String,
      required: [true, "You must provide a password"]
    },
    email:{
      type: String,
      required: [true, "you must provide an email"]
    },
    profile_pic: {
      type: String,
      default: "/images/defaultprofile.png"
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
