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
  columnsToDisplayTeacher = ['Exam Name', 'Type', 'Time (min)', 'Default Welcome Exam?', 'Assigned Teacher','Students Enrolled','Students Completed','Actions'];
  columnsToDisplayStudent = ['Exam Name', 'Type', 'Time (min)', 'My Result','Actions'];
  tableData: Array<any> = [{},];

  tableDataFiltered: Array<any> = [{}]

  getExams = async()=>{
    await this.examService.readExams().subscribe((res: any)=>{      
      this.tableData = res
      console.log(this.tableData)
      this.tableDataFiltered = this.tableData
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

  filterExams(searchExams: any){
    console.log(searchExams)
    this.tableDataFiltered = this.tableData.filter(obj=>{
      return obj.examName.toLowerCase().includes(searchExams.toLowerCase())
    })
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
    await this.examService.enrolStudent({exam:exam,student:this.currentUser}).subscribe((res: any)=>{   
      console.log(res)      
    })    
    this._snackBar.open(`You have successfully enrolled in this exam. You can take it any time you'd like!`,'close'); 
    this.getExams();
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

  openStudentsCompletedDialog(exam:any){    
    console.log(exam.studentCompleted)
    const dialogRef = this.dialog.open(ExamUserDialogComponent,{
      width: '530px',
      data: {
        header: `Students Who Have Completed ${exam.examName}`,
        body: exam,
        rightButton:'Enroll a New Student',
        leftButton: 'Close',
        // routerLink:'/exams'
      },
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openStudentsEnrolledDialog(exam:any){
    console.log(exam.studentEnrolled)
  }

  openExamDialog(exam: any){ 
    const dialogRef = this.dialog.open(ExamDisplayIndividualComponent,{
      width: '1000px',
      data:{ exam:exam, user:this.currentUser}
    });  

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);      
    });
    this.getExams()
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

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getExams()
    });
  }
}
