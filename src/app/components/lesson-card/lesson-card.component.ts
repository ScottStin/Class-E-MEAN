import { Time } from '@angular/common';
import { Component, OnInit,Input } from '@angular/core';
// import {MatCardModule} from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GeneralDialogComponent } from '../general-dialog/general-dialog.component';
import { Router } from '@angular/router';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lesson-card',
  templateUrl: './lesson-card.component.html',
  styleUrls: ['./lesson-card.component.css']
})
export class LessonCardComponent implements OnInit {
  @Input() lesson: any | undefined;  
  @Input() currentUser: any | undefined;
  @Input() allUsers: any | undefined;

  urlAddress:string=""
  faEarthAmericas=faEarthAmericas
  faAt=faAt
  faStar=faStar

  constructor(public dialog: MatDialog, private router: Router) { 
  }

  ngOnInit(): void {
    this.urlAddress = this.router.url
    console.log(this.urlAddress)
    // console.log(this.student)
  }

  getImageSource(){
    return this.allUsers.find((obj: { name: string; })=>obj.name === this.lesson.teacher).profilePicture 
  }

  openRegisterDialog(){
    let dialogData
    if(this.currentUser?.userType==="Student" && this.currentUser.level){
      console.log("registered")      
      if(this.lesson.studentsEnrolled.includes(this.currentUser)){
        dialogData={
          header: 'Are you sure you want to cancel this class?',
          body: "Your place will no longer be reserved. If you're cancelling less than 24 hours before the class starts, you may still be charged a cancellation fee.",
          rightButton:'Leave class',
          leftButton: 'Stay in class',
          // routerLink:'/home'
        }
      }
    } else{    
      if(!this.currentUser){
        dialogData={
        header: 'Wait! You have to sign in first',
        body: 'You need to be signed in to join a class. Click below to login or regiser a new account',
        icon: "faRightToBracket",
        rightButton:'Login / Sign up',
        leftButton: 'Cancel',
        routerLink:'student/login-signup'
      }
      } if (this.currentUser.userType === "Student"&& !this.currentUser.level && !this.currentUser.eltComplete){
        dialogData={
          header: 'You need to take your free English Level Test first',
          body: 'Before you enrol in your first lesson, we need to assess your English level so we can put you in the right class. The test takes about 10 minutes and is compeletely free. Click below to take it.',
          rightButton:'Take my English Level Test',
          leftButton: 'Cancel',
          routerLink:'/exams'
        }
      } if (this.currentUser.userType === "Student"&& !this.currentUser.level && this.currentUser.eltComplete){
        dialogData={
          header: 'Your level test is being marked',
          body: "Your level test is being marked by one of our native English teachers. This usually takes 12-48 hours. Once your test is marked, you'll be recieve your results and be able to join the live classes.",
          rightButton:'Okay',
          // leftButton: 'Okay',
          // routerLink:'/home'
        }
      } 
    }
    if(dialogData){
      const dialogRef = this.dialog.open(GeneralDialogComponent,{
        width: '530px',
        data: dialogData,
      });
      
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }

  }

}
