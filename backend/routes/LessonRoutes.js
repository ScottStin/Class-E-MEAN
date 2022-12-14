const express = require("express");
// const { json } = require("stream/consumers");
const router = express.Router();
const lessonModel = require ('../models/lesson-model.js');

// all routes prefixed by '/lessons' in index.js file

router.get('/', async function (req, res) {
    await lessonModel.find()
      .then(lessons => {res.json(lessons)})
      .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/new', async function (req, res) {
  await lessonModel.insertMany(req.body)
    .then(res=>{
        console.log(res)
    }).catch(err=>{
        console.log(err)
    })
});

router.route('/register/:id').post((req, res) => {
  console.log(req.params.id)
  console.log(req.body)
  lessonModel.findById(req.params.id)
  .then(lesson => {
    // lesson.studentsEnrolled.push({studentName:req.body.name, studentEmail:req.body.email,studentId:'placeHolder1234'})
    lesson.studentsEnrolled.push(req.body.email)
    lesson.save()
      .then(() => res.json('Student added to: '+lesson))          
      .catch(err => res.status(400).json('Error: ' + err));
  })
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/leave/:id').post((req, res) => {
  console.log(req.params.id)
  console.log(req.body)
  lessonModel.findById(req.params.id)
  .then(lesson => {
    // lesson.studentsEnrolled.push({studentName:req.body.name, studentEmail:req.body.email,studentId:'placeHolder1234'})
    lesson.studentsEnrolled.splice(lesson.studentsEnrolled.indexOf(req.body.email), 1);
    lesson.save()
      .then(() => res.json('Student added to: '+lesson))          
      .catch(err => res.status(400).json('Error: ' + err));
  })
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
  lessonModel.findByIdAndDelete(req.params.id)
    .then(() => res.json('Lesson deleted: '+req.params.id))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;