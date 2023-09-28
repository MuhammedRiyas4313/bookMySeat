import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
        type : String,
        required: true,
    },
    phone:{
        type : Number,
        required: true,
    },
    email:{
        type : String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', userSchema);

export default User;
