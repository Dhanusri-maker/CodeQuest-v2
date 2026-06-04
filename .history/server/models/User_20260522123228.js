const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name:{ type:String,required:true },
    email:{ type:Number,required:true,unique:true },
    password:{ type:String,required:true },
    coins:{ type:Number,default:0},
    xp:{ type:Number,default:0},
    streak:{ type:Number,default:0},
    role:{ type:String,default:"student"},
    createdAt:{ type:DataTransfer,default:D}
})