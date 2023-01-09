const express = require("express");
const router = express.Router();
const userModel = require ('../models/user-models');
const multer = require('multer')
const {cloudinary, storage}  = require('../cloudinary')
const upload = multer({storage})
const bcrypt = require("bcrypt")

// all routes prefixed by '/users' in index.js file

router.get('/', async function (req, res) {
    await userModel.find()
      .then(lessons => {res.json(lessons)})
      .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/new', upload.single('profilePic'), async function (req, res) {
  // console.log(req.body.email)
  //   const existingUser = await userModel.findOne({email:req.body.email})
  //   .then(res=>{
  //     console.log(res)
  //   }).catch(err=>{
  //       console.log(err)
  //   })
    // console.log(req.body)
    // console.log(req.file) // multer middleware not working right now.
    const image = cloudinary.uploader.upload(req.body.profilePicture, {folder:'Class E'}, async (err, result)=>{
        if (err) return console.log(err);        
        // if (result) return console.log(result);        
        const newUser = new userModel(req.body);
        newUser.profilePicture = {url:result.url, filename:result.public_id};
        newUser.hashedPassword =  await bcrypt.hash(newUser.hashedPassword, 12);
        console.log(newUser);
        await newUser.save();
        console.log("New User: " + newUser);      
        res.status(200).send(newUser); 
        // .then(res => console.log(res));          
        // .catch(err => console.log(err));        
    })
  });

  router.delete ('/delete/:id', (async function(req,res){
    //res.send("IT WORKED")
    const { id } = req.params;
    // const user = await userModel.findById(id);
    // if(user.profilePicture){
        // for(i of user.profilePicture){
            // await cloudinary.uploader.destroy(i.filename) // deleting from cloudinary
            // await cloudinary.uploader.destroy(userModel.profilePicture.filename) // deleting from cloudinary
        // }
    // }
    await userModel.findByIdAndDelete(req.params.id); 
    // req.flash('remove','Bathroom deleted')
    // res.redirect("/bathrooms")
}));

module.exports = router;