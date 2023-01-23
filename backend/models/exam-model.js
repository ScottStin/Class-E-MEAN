const mongoose = require('mongoose');

const examSchema = mongoose.Schema({
    examName:{
        type: String,
    },
    examType:{
        type: String,
    },
    examTime:{
        type: Number,
    },
    studentEnrolled:[
        {
            studentEmail:{type: String},
            studentName:{type: String},
        }
    ],
    studentCompleted:[
        {
            studentEmail:{type: String},
            studentName:{type: String},
            dateCompleted:{type: Date},
            score:{type: String},
            finalComments:{type: String},
        }
    ],
    defaultWelcomeExam:{
        type: Boolean,
    },
    assignedTeacher:{
        type: String,
    },
    examDescription:{
        type: String,
    },
    examTotalScore:{
        type: Number,
    },
    examCasualPrice:{
        type: Number,
    },
    Questions:[
       { 
            questionNumber:{
                type: Number,
            },
            questionName:{
                type: String,
            },
            questionType:{
                type: String,
            },
            questionLength:{
                type: Number,
            },
            questionTime:{
                type: Number,
            },
            questionPoints:{
                type: Number,
            },
            questionDescription:{
                type: String,
            },
            questionPrompt:{
                type: String,
            },
            questionMedia:{
                type: String,
            },
            questionAnswer:[
                {
                    studentName:{
                        type: String,
                    },
                    studentEmail:{
                        type: String,
                    },
                    studentResponse:{
                        type: String || Audio,
                    },
                    teacherResponse:{
                        type: String,
                    },
                    questionScore:{
                        type: Number,
                    },
                }
            ]
        }    
    ],
}, {
    timestamps: true
})

module.exports = mongoose.model('examModel', examSchema);
