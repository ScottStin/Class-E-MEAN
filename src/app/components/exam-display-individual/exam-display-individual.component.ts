import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-exam-display-individual',
  templateUrl: './exam-display-individual.component.html',
  styleUrls: ['./exam-display-individual.component.css']
})
export class ExamDisplayIndividualComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  findStudentResponse(question:any){
    if(question.questionAnswer.filter((obj:any)=>{return obj.studentName === this.data.user.name})[0]?.studentResponse){
      return question.questionAnswer.filter((obj:any)=>{return obj.studentName === this.data.user.name})[0]?.studentResponse
    } else{
      return false
    }    
  }

  findTeacherFeedback(question:any){
    if(question.questionAnswer.filter((obj:any)=>{return obj.studentName === this.data.user.name})[0]?.teacherResponse){
      return question.questionAnswer.filter((obj:any)=>{return obj.studentName === this.data.user.name})[0]?.teacherResponse
    } else{
      return false
    }  
  }

  findResponseScore(question:any){
    if(question.questionAnswer.filter((obj:any)=>{return obj.studentName === this.data.user.name})[0]?.questionScore){
      return question.questionAnswer.filter((obj:any)=>{return obj.studentName === this.data.user.name})[0]?.questionScore
    } else{
      return false
    }  
  }

}
