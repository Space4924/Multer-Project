const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    image:String
})
module.exports=mongoose.model('podcast',productSchema)