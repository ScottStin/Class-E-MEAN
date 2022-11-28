import { Time } from '@angular/common';
import { Component, OnInit,Input } from '@angular/core';
// import {MatCardModule} from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GeneralDialogComponent } from '../general-dialog/general-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lesson-card',
  templateUrl: './lesson-card.component.html',
  styleUrls: ['./lesson-card.component.css']
})
export class LessonCardComponent implements OnInit {
  @Input() teacher: string | undefined;
  @Input() lessonType: string | undefined;
  @Input() lessonLevel: any | undefined;
  @Input() description: string | undefined;
  @Input() lessonDate: String | undefined;
  @Input() startTime: String | undefined;
  @Input() currentUser: any | undefined;
  @Input() allUsers: any | undefined;
  @Input() student: any | undefined;
  @Input() level: any | undefined;
  @Input() nationality: any | undefined;
  @Input() email: any | undefined;

  urlAddress:string=""

  constructor(public dialog: MatDialog, private router: Router) { 
  }

  ngOnInit(): void {
    this.urlAddress = this.router.url
    console.log(this.urlAddress)
    console.log(this.student)
  }

  getImageSource(){
  if(this.student){
    return this.allUsers.find((obj: { name: string; })=>obj.name === this.student).profilePicture
  } if (this.teacher){
    return this.allUsers.find((obj: { name: string; })=>obj.name === this.teacher).profilePicture
  }
   
  }

  openRegisterDialog(){
    if(this.currentUser?.userType==="Student" && this.currentUser.level){
      console.log("registered")
    } else{    
      let dialogData
      if(!this.currentUser){
        dialogData={
        header: 'Wait! You have to sign in first',
        body: 'You need to be signed in to join a class. Click below to login or regiser a new account',
        icon: "faRightToBracket",
        rightButton:'Login / Sign up',
        leftButton: 'Cancel',
        routerLink:'student/login-signup'
      }
      } if (this.currentUser.userType === "Student"&& !this.currentUser.level){
        dialogData={
          header: 'You need to take your free English Level Test first',
          body: 'Before you enrol in your first lesson, we need to assess your English level so we can put you in the right class. The test takes about 10 minutes and is compeletely free. Click below to take it.',
          rightButton:'Take my English Level Test',
          leftButton: 'Cancel',
          routerLink:''
        }
      }
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
