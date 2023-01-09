import { Time } from '@angular/common';
import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
// import {MatCardModule} from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GeneralDialogComponent } from '../general-dialog/general-dialog.component';
import { Router } from '@angular/router';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Subscription, timer } from 'rxjs';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import { LessonServiceService } from 'backend/services/lesson-service/lesson-service.service';

@Component({
  selector: 'app-lesson-card',
  templateUrl: './lesson-card.component.html',
  styleUrls: ['./lesson-card.component.css']
})
export class LessonCardComponent implements OnInit {
  @Input() lesson: any | undefined;  
  @Input() currentUser: any | undefined;
  @Input() allUsers: any | undefined;
  @Output() refreshData = new EventEmitter<{ update: boolean }>();

  ms:number =0;
  days:number =0; 
  hours:number =0;   
  min:number=6;
  sec: number = 0

  subscription: Subscription = new Subscription;

  urlAddress:string=""
  faEarthAmericas=faEarthAmericas
  faAt=faAt
  faStar=faStar

  constructor(public dialog: MatDialog, private router: Router,private _snackBar: MatSnackBar,    private lessonService: LessonServiceService,) { 
  }

  ngOnInit(): void {
    this.urlAddress = this.router.url
    console.log(this.urlAddress)
    // this.startTimer()
    // console.log(this.student)
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getImageSource(){
    return this.allUsers.find((obj: { name: string; })=>obj.name === this.lesson.teacher).profilePicture.url
  }

  async openRegisterDialog(lesson:any){
    let dialogData
    if(this.currentUser?.userType==="Student" && this.currentUser.level){
      console.log(lesson) 
      if(!this.lesson.studentsEnrolled.includes(this.currentUser.email)){
        await this.lessonService.registerLesson(lesson._id,this.currentUser).subscribe((res: any)=>{     
          console.log(res) 
          if(res){
            this.refreshData.emit({update:true})
            this._snackBar.open(`A seat has been saved for your in this lesson.`,'close');   
          } else{
            this._snackBar.open(`Woops, something went wrong.`,'close'); 
          }            
        })     
      } 

      if(this.lesson.studentsEnrolled.includes(this.currentUser.email)){
        dialogData={
          header: 'Are you sure you want to cancel this class?',
          body: "Your place will no longer be reserved. If you're cancelling less than 24 hours before the class starts, you may still be charged a cancellation fee.",
          rightButton:'Leave class',
          leftButton: 'Stay in class',
          result:'leaveClass'
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
      
      dialogRef.afterClosed().subscribe(async result => {
        console.log(`Dialog result: ${result}`);
        if(result === 'leaveClass'){
          await this.lessonService.unRegisterLesson(lesson._id,this.currentUser).subscribe((res: any)=>{     
            console.log(res) 
            if(res){
              this.refreshData.emit({update:true})
              this._snackBar.open(`Your have been removed from this lesson`,'close');   
            } else{
              this._snackBar.open(`Woops, something went wrong.`,'close'); 
            }            
          })
        }
      });
    }
  }

  openJoinClassDialog(){
    const dialogRef = this.dialog.open(GeneralDialogComponent,{
      width: '530px',
      data: {
        header: 'Join The Live Class Now',
        body: 'Before you join, you should make sure your camera and microphone are working. Please join using a computer or laptop (NOT a phone or tablet). Also, please ensure you join from a QUIET place with a stable internet connection.',
        rightButton:'Join class',
        leftButton: 'Return',
        // routerLink:'/exams'
      },
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // startTimer(){
  //   const source = timer(1000, 2000);
  //   this.subscription = source.subscribe(val => {
  //      console.log('timer')
  //   })
  // }

  // stopTimer(){
  //   this.subscription.unsubscribe();
  // }

  calculateTime(startDate: any, startTime:any){
    var today = new Date();    
    this.ms = (new Date(startDate+", "+startTime).getTime())-today.getTime();
    this.days =  Math.floor(this.ms/1000/60/60/24);
    this.hours = Math.floor((this.ms % 86400000) / 3600000);
    this.min = Math.round(((this.ms % 86400000) % 3600000) / 60000);     
    // this.sec = ((((this.ms % 86400000) % 3600000) / 60000)/100*60);     
    // this.sec = ((((this.ms % 86400000) % 3600000) % 60000) / 6000);
  }

  lessonStartCountdown(startDate: any, startTime:any,length:any,teacher:any){
    this.calculateTime(startDate, startTime)
    const source = timer(60000, 60000);
    this.subscription = source.subscribe(val => {
      this.calculateTime(startDate,startTime)
    })    
    // console.log(this.min,this.days,this.hours,this.ms)
    var minDisplay, daysDisplay, hoursDisplay
    // console.log(startDate, startTime, this.days, this.hours, this.min, length)
    if (this.min>=10){minDisplay = this.min} else{minDisplay = "0"+this.min}
    if (this.hours>=10){hoursDisplay = this.hours} else{hoursDisplay = "0"+this.hours}
    if (this.days>=10){daysDisplay = this.days} else{daysDisplay = "0"+this.days}
    if(new Date(new Date(`${startDate} ${startTime}:00`).setHours(new Date(`${startDate} ${startTime}:00`).getHours() + length)) >= new Date() &&  this.min <=5){//if(this.days <=0 && this.hours <=0 && this.hours >= (length*-1) && this.min <=5){
      // this._snackBar.open(`Hey! Your ${startTime} class with ${teacher} is starting now. Open the 'My Classes' tab to join.`,'close');
      return 'Join class!!'    
    } if (new Date(new Date(`${startDate} ${startTime}:00`).setHours(new Date(`${startDate} ${startTime}:00`).getHours() + length)) < new Date()){// } if ((this.days <0 || this.hours <0 || this.min < 0) && this.hours< (length*-1)){
      return 'View Class'
    } else {
      return `${daysDisplay} : ${hoursDisplay} : ${minDisplay}`
    }    
  }

  deleteLesson(lesson:any){
    console.log(lesson._id)
    const dialogRef = this.dialog.open(GeneralDialogComponent,{
      width: '530px',
      data: {
        header: 'Are you sure you want to delete this lesson?',
        body: 'All students currently enrolled will be notified via email and refunded.',
        rightButton:'Delete class',
        leftButton: 'Return',
        // routerLink:'/exams'
      },
    });
    
    dialogRef.afterClosed().subscribe(async result => {
      console.log(`Dialog result: ${result}`);
      if(result){
        await this.lessonService.deleteLesson(lesson._id).subscribe((res: any)=>{     
          console.log(res) 
          if(res){
            this.refreshData.emit({update:true})
            this._snackBar.open(`Lesson deleted`,'close');   
          } else{
            this._snackBar.open(`Woops, something went wrong.`,'close'); 
          }            
        })
      }
    });   
  }

}
