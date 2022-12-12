import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

const express = require("express");
const { json } = require("stream/consumers");
const router = express.Router();
const LessonModel = require ('../models/lessons-model.js');

@Injectable({providedIn:"root"}) // note:this is similar to providing a service in the app.module.ts file, in that in makes the service availableuniversally accross our app

export class LessonService{
    constructor(
        private http: HttpClient
    ){

    }

    // createLesson(){
    // }
    readLesson(){
        console.log("test22")
        this.http.get('localhost:3000/test')          
        
        // return this.http.get('/lessons/')
        // return this.http.get("/test2")
        // console.log("test")
        // router.get('/lessons/', async function (req: any, res: { json: (arg0: any) => any; status: (arg0: number) => { (): any; new(): any; json: { (arg0: string): any; new(): any; }; }; }) {
        //     await LessonModel.find()
        //       .then((lessons: any) => res.json(lessons))
        //       .catch((err: string) => res.status(400).json('Error: ' + err));
        // });
    }
    // deleteLesson(){
    // }

    // deleteAllLessons(){
    // }

}