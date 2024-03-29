import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    email: { 
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
},{
    timestamps: true
})

userSchema.methods.matchPassword = async function(userEnteredPassword){
    return await bcrypt.compare(userEnteredPassword, this.password)
}

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

export const User = mongoose.model('User', userSchema);