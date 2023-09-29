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
    },
    password:{
        type: String,
        required: true,
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    isVerified:{
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', userSchema);

export default User;
