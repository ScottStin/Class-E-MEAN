const mongoose = require('mongoose');

const lessonSchema = mongoose.Schema({
    // lessonName: {
    //     type: String,
    // },
    description:{
        type: String,
    },
    level: {
        type: Array,
        // enum: ['A1 Beginner','A2 Lower-Intermediate','B1 Intermediate','B2 Upper-Intermediate','C1 Advanced','C2 Native']
        // required: true,
    },
    classType: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    length: {
        type: Number,
        // required: true
    },
    teacher: {
        type: String,
        // required: true,
    },
    maxSize: {
        type: Number,
        // required: true,
    },
    startDate: {
        // type: Date,
        type: String,
        required: true
    },
    // lessonImage:{
    //     type:String
    // },
    lessontimeZone: {
        type: String,
        // required: true,        
    },
    studentsEnrolled: [
        {type: String, }
    ],
    lessonStudentsAttended: [
        {type: String,}
    ],
    lessonPrice:{
        type:Number
    },
    status:{
        type:String
    },
    restricted:{
        type:Boolean
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('lesson-model', lessonSchema);
