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
    // console.log(exam)
    return this.http.post('http://localhost:3000/exams/new/StudentResponse',exam)         
  }

}
