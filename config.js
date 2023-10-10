const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/cloud').then(res=>console.log("mongodb connected Successfully"))
.catch(err=>console.log(err));