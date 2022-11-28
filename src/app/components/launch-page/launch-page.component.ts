import { Component, OnInit } from '@angular/core';
// import {School} from '../../../assets/School.png';

@Component({
  selector: 'app-launch-page',
  templateUrl: './launch-page.component.html',
  styleUrls: ['./launch-page.component.css']
})
export class LaunchPageComponent implements OnInit {
  teacherImage:any = "../../../assets/School.png";
  studentImage:any = "../../../assets/Student.png";
  schoolImage:any = "../../../assets/Teacher.png";
  constructor() { 
    // schoolImage: School
  }

  ngOnInit(): void {
    // console.log(this.schoolImage)
  }

}
