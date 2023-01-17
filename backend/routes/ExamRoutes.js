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

router.post('/new/StudentResponse', async function (req, res) {
    try{
        const exam = await examModel.find({_id:req.body.parentExamRef})
        for(let i in req.body.studentResponses){
            // exam[0].Questions.find(obj=>{return obj.id=i}).questionAnswer.push[{studentName: req.body.studentResponses[i].studentName,studentResponse: req.body.studentResponses[i].studentResponse, studentEmail: req.body.studentResponses[i].studentEmail}]
            exam[0].Questions.find(obj=>{return obj.id=i}).questionAnswer = [...exam[0].Questions.find(obj=>{return obj.id=i}).questionAnswer,{studentName: req.body.studentResponses[i].studentName,studentResponse: req.body.studentResponses[i].studentResponse, studentEmail: req.body.studentResponses[i].studentEmail}]
            console.log(exam[0].Questions.find(obj=>{return obj.id=i}))
        }
        // const dateCompleted = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()
        // const newComplete = {
        //     studentEmail:req.body.studentResponse[0].studentEmail,
        //     dateCompleted:dateCompleted,
        // }
        // exam[0].studentsCompleted = [...exam[0].studentCompleted,newComplete]  
        await exam[0].save()
    }catch(e){
        console.log(e)        
    }
  });

  module.exports = router;