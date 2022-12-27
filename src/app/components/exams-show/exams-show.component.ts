import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ExamDisplayIndividualComponent } from '../exam-display-individual/exam-display-individual.component';

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
  tableData = [
    {
      position: 1,
      Exam: 'English Level Test',
      Type: 'ELT',
      Time: NaN,
      'Students Enrolled': ['Naufal Omarieza','Daniel Angel','Dom Argentino'],
      'Students Completed': [{student:'Daniel Angel',score:7.5},{student:'Dom Argentino',score:''}],
      'Default Welcome Exam?':true,
      'Assigned Teacher': 'Scot Stinson',
      Description: `Welcome to YouSTUDY! This general English level test will help us to assess your English level and assign you to the correct class. It takes about 10 minutes to complete and is completely free.`,
      totalScore: 10,
      Questions:[
        {questionNumber:1,questionName:'Question 1',questionType:'Written-Response',questionLength:NaN, points:10,questionDescription:'Read the question below and record your answer.',questionPrompt:'What do you do you a living? Do you enjoy it? Why/why not?',questionImage:'',
          questionAnswer:[
            {
              studentName: 'Daniel Angel',
              studentResponse:"I'm a student. I love it.",
              teacherResponse:"Great answer, Daniel!",
              questionScore:9
              // 'Daniel Angel':[
              //   {studentResponse:"I'm a student. I love it."},
              //   {teacherResponse:"Great answer, Daniel!"},
              //   {questionScore:9},
              // ]
            },
            {
              studentName: 'Dom Argentino',
              studentResponse:"I work in a cafe. I hate it.",
              teacherResponse:"",
              questionScore:''
              // 'Dom Argentino':[
              //   {studentResponse:"I work in a cafe. I hate it."},
              //   {teacherResponse:""},
              //   {questionScore:''},
              // ]
            },
          ]
        },
        {questionNumber:2,questionName:'Question 2',questionType:'Written-Response',questionLength:NaN, points:10, questionDescription:'Read the question below and record your answer.',questionPrompt:'If you could quit your job and have any job in the world, what would you be? Why?',questionImage:'',
          questionAnswer:[
            {
              studentName: 'Daniel Angel',
              studentResponse:"I would be doctor.",
              teacherResponse:"Good answer daniel, but here we need an article, 'a', with the noun 'doctor'",
              questionScore:6
              // 'Daniel Angel':[
              //   {studentResponse:"I would be doctor"},
              //   {teacherResponse:"Good answer daniel, but here we need an article, 'a', with the noun 'docotr'"},
              //   {questionScore:6},
              // ]
            },
            {
              studentName: 'Dom Argentino',
              studentResponse:"I want to win the lottery and not work anymore.",
              teacherResponse:"",
              questionScore:''
              // 'Dom Argentino':[
              //   {studentResponse:"I want to win the lottery and not work anymore"},
              //   {teacherResponse:""},
              //   {questionScore:""},
              // ]
            },
          ]
        },
      ]
    },
    {
      position: 2,
      Exam: 'IELTS Reading Exam 1',
      Type: 'IELTS',
      Time: 60,
      'Students Enrolled': [],
      'Students Completed': [],
      'Default Welcome Exam?':false,
      'Assigned Teacher': 'Scott Stinson',
      Description: `This exam will test you on the IELTS Reading Section. You have 60 minutes to complete 3 exercises.`,
      totalScore: 10,
      Questions:[
        {questionNumber:1,questionName:'Question 1',questionType:'Written-Response',length:'100',questionLength:NaN, points:10,questionDescription:'Read the question below and record your answer.',questionPrompt:'What do you do you a living? Do you enjoy it? Why/why not?',questionImage:'',
          questionAnswer:[]
        },
        {questionNumber:2,questionName:'Question 2',questionType:'Audio-Response', length:'30',questionLength:NaN, points:10, questionDescription:'Read the question below and record your answer.',questionPrompt:'If you could quit your job and have any job in the world, what would you be? Why?',questionImage:'',
          questionAnswer:[]
        },
      ]
    },
  ];
  tableDataFiltered = this.tableData

  constructor(public dialog: MatDialog) {}
  ngOnInit(): void{
    // this.getExamResult()
   }

  filterExams(searchExams: any){
    console.log(searchExams)
    this.tableDataFiltered = this.tableData.filter(obj=>{
      return obj.Exam.toLowerCase().includes(searchExams.toLowerCase())
    })
  }

  sortExams(){
   // return 'keyboard_arrow_down' 
   // return <mat-icon>arrow_upward</mat-icon>
  }

  getExamResult(exam:any){
    let result=""
    if(exam['Students Completed'].filter((obj: { student: any; })=>{return obj.student === this.currentUser.name}).length>0){
      if (exam['Students Completed'].filter((obj: { student: any; })=>{return obj.student === this.currentUser.name})[0].score!==''){
        result = `${exam['Students Completed'].filter((obj: { student: any; })=>{return obj.student === this.currentUser.name})[0].score} / ${exam.totalScore}`
      } else {
        result = "Your exam is still being marked"
      }
    } else{
      result = '-'
    }
    return result
  }

  openExamDialog(exam: any){ 

    const dialogRef = this.dialog.open(ExamDisplayIndividualComponent,{
      width: '1000px',
      data:{ exam:exam, user:this.currentUser}
    });  

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
