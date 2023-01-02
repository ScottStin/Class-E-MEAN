const express = require("express");
// const { json } = require("stream/consumers");
const router = express.Router();
const examModel = require ('../models/exam-model.js');

// all routes prefixed by '/exams' in index.js file

router.get('/', async function (req, res) {
  await examModel.find()
    .then(exams => {res.json(exams)})
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/new', async function (req, res) {
    console.log("new exam test")
    console.log(req.body)
    const newExam = new examModel(req.body);
    // await examModel.insert(req.body)
    await newExam.save()
      .then(res=>{
          console.log(res)
      }).catch(err=>{
          console.log(err)
      })
  });

  module.exports = router;