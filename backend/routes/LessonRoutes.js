const express = require("express");
// const { json } = require("stream/consumers");
const router = express.Router();
const lessonModel = require ('../models/lesson-model.js');

// all routes prefixed by '/lessons' in index.js file

router.get('/', async function (req, res) {
    console.log('/test333')
    console.log(lessonModel.find())
    await lessonModel.find()
      .then(lessons => {res.json(lessons)})
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;