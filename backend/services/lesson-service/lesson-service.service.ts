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
    console.log("test backend")
    return this.http.get('http://localhost:3000/lessons')         
    
    // return this.http.get('/lessons/')
    // return this.http.get("/test2")
    // console.log("test")
    // router.get('/lessons/', async function (req: any, res: { json: (arg0: any) => any; status: (arg0: number) => { (): any; new(): any; json: { (arg0: string): any; new(): any; }; }; }) {
    //     await LessonModel.find()
    //       .then((lessons: any) => res.json(lessons))
    //       .catch((err: string) => res.status(400).json('Error: ' + err));
    // });
}
}
