import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ExamDisplayIndividualComponent } from '../exam-display-individual/exam-display-individual.component';
import { NewExamComponent } from '../new-exam/new-exam.component';
import { ExamService } from 'backend/services/exam-services/exam.service';
import { ExamUserDialogComponent } from './exam-user-dialog/exam-user-dialog.component';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import { GeneralDialogComponent } from '../general-dialog/general-dialog.component';

@Component({
  selector: 'app-exams-show',
  templateUrl: './exams-show.component.html',
  styleUrls: ['./exams-show.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ExamsShowComponent {
  @Input() currentUser: any | undefined;

  // const ELEMENT_DATA: PeriodicElement[] = [
  columnsToDisplayTeacher = ['Exam Name', 'Type', 'Time (min)', 'Default Welcome Exam?', 'Assigned Teacher','Price (AUD)', 'Students Enrolled','Students Completed','Actions'];
  columnsToDisplayStudent = ['Exam Name', 'Type', 'Time (min)', 'Price (AUD)', 'My Result','Actions'];
  tableData: Array<any> = [{},];
  tableDataFiltered: Array<any> = [{}];
  selectedTabIndex: number | undefined;

  getExams = async()=>{
    await this.examService.readExams().subscribe((res: any)=>{      
      this.tableData = res
      console.log(this.tableData)
      if(this.currentUser.userType === 'Student'){
        this.tableDataFiltered = this.tableData.filter(obj=>{ return obj.studentEnrolled.find((student: { studentEmail: string; })=>{return student.studentEmail=== this.currentUser.email})})
      } if(this.currentUser.userType ==='Teacher'){
        this.tableDataFiltered = this.tableData.filter(obj=>{ return obj.assignedTeacher === this.currentUser.email})
      }      
      console.log(this.tableDataFiltered)
    })
  }  

  constructor(
    public dialog: MatDialog,
    private examService: ExamService,
    private _snackBar: MatSnackBar,
    ) {}

  ngOnInit(): void{
    this.getExams()
    // this.getExamResult()
   }

  filterExams(searchExams: any, tab:string){
    console.log(searchExams)
    if(tab==='All Exams'){
      this.tableDataFiltered = this.tableData.filter(obj=>{
        return obj.examName.toLowerCase().includes(searchExams.toLowerCase())
      })
    }
    if(tab==='My Exams'&&this.currentUser.userType==='Student'){
      this.tableDataFiltered = this.tableData.filter(obj=>{ return obj.studentEnrolled.find((student: { studentEmail: string; })=>{return student.studentEmail=== this.currentUser.email})}).filter(obj=>{
        return obj.examName.toLowerCase().includes(searchExams.toLowerCase())
      })
    }
    if(tab==='My Exams'&&this.currentUser.userType==='Teacher'){
      this.tableDataFiltered = this.tableData.filter(obj=>{ return obj.assignedTeacher === this.currentUser.email}).filter(obj=>{
        return obj.examName.toLowerCase().includes(searchExams.toLowerCase())
      })
    }

  }

  // getTableDataFiltered(tab:string){
  //   console.log(this.tableData[0].studentEnrolled)
  //   console.log({studentEmail:this.currentUser.email,studentName:this.currentUser.name,_id:this.currentUser._id})
  //   if (tab==='All Exams'){
  //     this.tableDataFiltered = this.tableData.filter(obj=>{
  //       return !obj.studentEnrolled.includes({studentEmail:this.currentUser.email,studentName:this.currentUser.name,_id:this.currentUser._id})
  //     })
  //   } else if (tab==='My Exams'){
  //     this.tableDataFiltered = this.tableData.filter(obj=>{
  //       return obj.studentEnrolled.includes({studentEmail:this.currentUser.email,studentName:this.currentUser.name,_id:this.currentUser._id})
  //     })
  //   }
  //   return this.tableDataFiltered
  // }

  async enrollStudent(exam:any){
    const dialogRef = this.dialog.open(GeneralDialogComponent,{
      width: '530px',
      data: {
        header: `Enroll in ${exam.examName}?`,
        body: `Are you sure you want to enroll in this exam? ${exam.examCasualPrice && exam.examCasualPrice!==0 ? `Your account will automatically be changed the exam price of $${exam.examCasualPrice} AUD` : "The exam is free and you won't be charged."}`,
        icon: "faRightToBracket",
        rightButton:'Enrol',
        leftButton: 'Cancel',
        // routerLink:'student/login-signup'
      }
    });
    
    dialogRef.afterClosed().subscribe(async result => {
      console.log(`Dialog result: ${result}`);
      if(result){
        await this.examService.enrolStudent({exam:exam,student:this.currentUser}).subscribe((res: any)=>{   
          console.log(res)      
        })    
        this._snackBar.open(`You have successfully enrolled in this exam. You can take it any time you'd like!`,'close'); 
        // this.getExams();
        this.selectedTabIndex = 0
      }
      await this.getExams();
    });
  }

  sortExams(){
   // return 'keyboard_arrow_down' 
   // return <mat-icon>arrow_upward</mat-icon>
  }

  getExamResult(exam:any){
    let result=""
    if(exam['studentEnrolled']?.filter((obj: { studentEmail: string; })=>{return obj.studentEmail === this.currentUser.email}).length>0){
      result='studentEnrolled'
      if(exam['studentCompleted']?.filter((obj: { studentEmail: string; })=>{return obj.studentEmail === this.currentUser.email}).length>0){
        result = 'studentCompleted'//"Your exam is still being marked"
        if(exam['studentCompleted']?.filter((obj: { studentEmail: string; })=>{return obj.studentEmail === this.currentUser.email})[0].finalComments){
          result = exam['studentCompleted']?.filter((obj: { studentEmail: string; })=>{return obj.studentEmail === this.currentUser.email})[0].score//'examMarked'
        }
      }
        // try{        
        //   if (exam['studentCompleted']?.filter((obj: { studentEmail: string; })=>{return obj.studentEmail === this.currentUser.email})[0].score!==''){
        //     result = `${exam['studentCompleted']?.filter((obj: { studentEmail: string; })=>{return obj.studentEmail === this.currentUser.email})[0].score} / ${exam.examTotalScore}`//'examMarked'
        //   } 
        //   else if (exam['studentCompleted']?.filter((obj: { studentEmail: string; })=>{return obj.studentEmail === this.currentUser.email})[0].score==='') {
        //     result = 'studentCompleted'//"Your exam is still being marked"
        //   }
        // }
        // catch{}
        
    } else{
      result = '-'
    }
    return result
  }

  changeTabs(tab:any){
    console.log(tab.index)
    if(tab.index===0 && this.currentUser.userType ==='Student'){
      this.tableDataFiltered = this.tableData.filter(obj=>{ return obj.studentEnrolled.find((student: { studentEmail: string; })=>{return student.studentEmail=== this.currentUser.email})})
      // console.log(this.tableDataFiltered.filter(obj=>{obj.studentEnrolled.studentEmail=== "test20@gmail.com"}))
    } if(tab.index===0 && this.currentUser.userType ==='Teacher'){
      this.tableDataFiltered = this.tableData.filter(obj=>{ return obj.assignedTeacher === this.currentUser.email})
    }
    if (tab.index===1){
      this.tableDataFiltered = this.tableData
    }
  }

  openStudentsCompletedDialog(exam:any){    
    console.log(exam.studentCompleted.filter((obj: { studentEmail: string; }) => {return obj.studentEmail === this.currentUser.email}).dateCompleted)
    const dialogRef = this.dialog.open(ExamUserDialogComponent,{
      width: '530px',
      data: {
        header: `Students Who Have Completed ${exam.examName}`,
        body: exam,
        rightButton:'Enroll a New Student',
        leftButton: 'Close',
        purpose:'Completed',
        // date:new Date(exam.updatedAt)
        // routerLink:'/exams'
      },
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openStudentsEnrolledDialog(exam:any){
    console.log(exam.studentEnrolled)
    const dialogRef = this.dialog.open(ExamUserDialogComponent,{
      width: '530px',
      data: {
        header: `Students Who Have Enrolled in ${exam.examName}`,
        body: exam,
        rightButton:'Enroll a New Student',
        leftButton: 'Close',
        purpose:'Enrolled',
        // date:new Date(exam.updatedAt)
        // routerLink:'/exams'
      },
    });
  }

  openExamDialog(exam: any){ 
    const dialogRef = this.dialog.open(ExamDisplayIndividualComponent,{
      width: '1000px',
      data:{ exam:exam, user:this.currentUser}
    });  

    dialogRef.afterClosed().subscribe(async result => {
      console.log(`Dialog result: ${result}`);  
      await this.getExams();    
    });
    // this.getExams()
  }

  openNewExamDialog(){ 
    
    const dialogRef = this.dialog.open(NewExamComponent,{
      width: '1000px',
      data: {
        header: 'Create new exam',
        // body: '',
        rightButton:'Create',
        leftButton: 'Cancel',
        // routerLink:''
      }
    });  

    dialogRef.afterClosed().subscribe(async result => {
      console.log(`Dialog result: ${result}`);
      await this.getExams()
    });
    // this.getExams();
  }


}
