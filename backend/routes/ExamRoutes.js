const express = require("express");
// const { json } = require("stream/consumers");
const router = express.Router();
const examModel = require ('../models/exam-model.js');
const userModel = require ('../models/user-models.js');

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
    if(req.body.defaultWelcomeExam){
        console.log("default welcome exam true");
        const currentDefaul = await examModel.find({defaultWelcomeExam: true});
        console.log(currentDefaul)
        for(exam of currentDefaul){
            exam.defaultWelcomeExam = false
            await exam.save()
        }
        console.log(currentDefaul)
    }
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
        // console.log(exam[0].Questions)
        console.log(req.body.studentResponses)
        for(let i in req.body.studentResponses){
            // console.log(i)
            // console.log(exam[0].Questions.find(obj=>{return obj.id===i}))
            // exam[0].Questions.find(obj=>{return obj.id=i}).questionAnswer.push[{studentName: req.body.studentResponses[i].studentName,studentResponse: req.body.studentResponses[i].studentResponse, studentEmail: req.body.studentResponses[i].studentEmail}]
            exam[0].Questions.find(obj=>{return obj.id===i}).questionAnswer = [...exam[0].Questions.find(obj=>{return obj.id===i}).questionAnswer,{studentName: req.body.studentResponses[i].studentName,studentResponse: req.body.studentResponses[i].studentResponse, studentEmail: req.body.studentResponses[i].studentEmail}]
            // console.log(exam[0].Questions.find(obj=>{return obj.id=i}))
        }
        const dateCompleted = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()
        const newComplete = {
            studentEmail:Object.values(req.body.studentResponses)[0].studentEmail,
            studentName:Object.values(req.body.studentResponses)[0].studentName,
            dateCompleted:dateCompleted,
        }
        // console.log(Object.values(req.body.studentResponses)[0].studentEmail)
        exam[0].studentCompleted = [...exam[0].studentCompleted,newComplete] ; 
        await exam[0].save();
        console.log(exam[0]);
        const user = await userModel.find({email:Object.values(req.body.studentResponses)[0].studentEmail})
        console.log(user[0]);
        // if(exam[0].defaultELT){
            // await user[0].update({eltComplete: true})
            user[0].eltComplete= true;
            user[0].save();
            // console.log(user[0])
            res.status(200).send(user[0]);
        //}
    }catch(e){
        console.log(e)        
    }
  });

router.post('/new/TeacherFeedback', async function (req, res) {
    try{
        const exam = await examModel.find({_id:req.body.parentExamRef})
        console.log(req.body)
        console.log(exam)
        for(let i in req.body.teacherFeedback){         
            // exam[0].Questions.find(obj=>{return obj.id===i}).questionAnswer = [...exam[0].Questions.find(obj=>{return obj.id===i}).questionAnswer,{teacherResponse: req.body.teacherFeedback[i].teacherResponse}]
            exam[0].Questions.find(obj=>{return obj.id===i}).questionAnswer.find(obj=>{return obj.studentEmail===req.body.userEmail}).teacherResponse= req.body.teacherFeedback[i].teacherResponse
            // console.log(exam[0].Questions.find(obj=>{return obj.id===i}).questionAnswer)
            // console.log(exam[0].Questions.find(obj=>{return obj.id===i}).questionAnswer)
        }
        exam[0].studentCompleted.find(obj=>{return obj.studentEmail === req.body.userEmail }).score = req.body.score
        exam[0].studentCompleted.find(obj=>{return obj.studentEmail === req.body.userEmail }).finalComments = req.body.finalComments
        await exam[0].save()
        console.log(exam[0])
    }catch(e){
        console.log(e)        
    }
  });

router.post('/enrollStudent', async function (req, res) {
    try{
        // console.log(req.body)
        const exam = await examModel.find({_id:req.body.exam._id})
        exam[0].studentEnrolled = [...exam[0].studentEnrolled,{studentEmail:req.body.student.email,studentName:req.body.student.name}]  
        await exam[0].save()
        console.log(exam[0])
    }catch(e){
        console.log(e)        
    }
  });

  module.exports = router;