import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(
    private http: HttpClient
  ) { }

  readExams(){
    return this.http.get('http://localhost:3000/exams')         
  }

  createExam(exam:any){
    return this.http.post('http://localhost:3000/exams/new',exam)         
  }

  submitStudentResponses(exam:any){
    return this.http.post('http://localhost:3000/exams/new/StudentResponse',exam)         
  }

  submitTeacherFeedback(exam:any){
    return this.http.post('http://localhost:3000/exams/new/TeacherFeedback',exam)         
  }

  enrolStudent(exam:any){
    return this.http.post('http://localhost:3000/exams/enrollStudent',exam)
  }

  deleteExams(id:any){
    return this.http.delete('http://localhost:3000/exams/delete/'+id)         
  }

}
