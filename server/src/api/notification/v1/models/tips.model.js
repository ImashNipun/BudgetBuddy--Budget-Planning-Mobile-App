const mongoose=require('mongoose');

const tipsSchema=new mongoose.Schema({
    mainTitle:{
        type:String,
        required:true
    },
    subTitle:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    shown:{
        type:Boolean,
        required:true,
        default:false
    },
    shownDate:{
        type:Date,
        default:""
    },
    helpful:{
        type:String,
        default:"",
    },
    addedDate: { type: Date, default: Date.now },
});
module.exports=mongoose.model('tips',tipsSchema);