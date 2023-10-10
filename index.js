const express=require('express');
const app=express();
const cors=require('cors');
require('./config');
const multer=require('multer');
const Product=require('./Schema');
app.use(express.json());
app.use('/public/uploads', express.static(__dirname+ '/public/uploads'));
app.use(cors());
const upload=multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){cb(null,'public/uploads/')},
        filename:function(req,file,cd){
            let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
            cd(null,file.fieldname+"-"+Date.now()+ext);
        }
    })
}).single('image');

app.post('/upload',upload,async(req,res)=>{
    const file = req.file;
    if (!file) return res.status(400).send('No image in the request');

    const fileName = file.filename;
    // const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    let data=new Product({image: `${basePath}${fileName}`});
    data=await data.save();
    console.log("data of uploading in the database",data);
})
app.get('/display',async(req,res)=>{
    try {
    Product.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    res.json({ status: error });
  }
})
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});