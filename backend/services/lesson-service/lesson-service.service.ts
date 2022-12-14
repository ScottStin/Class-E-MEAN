import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root' // note:this is similar to providing a service in the app.module.ts file, in that in makes the service availableuniversally accross our app
})
export class LessonServiceService {

  constructor(
    private http: HttpClient
  ) { }

  readLesson(){
    return this.http.get('http://localhost:3000/lessons')         
  }

  createLesson(lessons:any){
    return this.http.post('http://localhost:3000/lessons/new',lessons)         
  }

  registerLesson(lessonId:any,student:any){
    return this.http.post('http://localhost:3000/lessons/register/'+lessonId,student)         
  }

  unRegisterLesson(lessonId:any,student:any){
    return this.http.post('http://localhost:3000/lessons/leave/'+lessonId,student)         
  }

  deleteLesson(id:any){
    return this.http.delete('http://localhost:3000/lessons/delete/'+id)         
  }

}
