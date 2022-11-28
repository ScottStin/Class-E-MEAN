import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
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
// export class ExamsShowComponent {
//   dataSource = ELEMENT_DATA;
//   columnsToDisplay = ['Exam', 'Type', 'Time (min)', 'Default Welcome Exam?', 'Assigned Teacher'];
//   columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
//   expandedElement: PeriodicElement | null | undefined;
// }

// export interface PeriodicElement {
//   Exam: string;
//   Type: string;
//   position: number;
//   'Time (min)': number;
//   'Students Enrolled':Array<any>;
//   'Students Completed':Array<any>;
//   'Default Welcome Exam?':boolean
//   'Assigned Teacher': string;
//   Description: string;
//   Questions:Array<any>;
// }

export class ExamsShowComponent {

  // const ELEMENT_DATA: PeriodicElement[] = [
  columnsToDisplay = ['Exam Name', 'Type', 'Time (min)', 'Default Welcome Exam?', 'Assigned Teacher','Students Enrolled','Students Completed','Actions'];
  tableData = [
    {
      position: 1,
      Exam: 'English Level Test',
      Type: 'ELT',
      Time: NaN,
      'Students Enrolled': ['Naufal Omarieza','Daniel Angel'],
      'Students Completed': ['Daniel Angel'],
      'Default Welcome Exam?':true,
      'Assigned Teacher': 'Scot Stinson',
      Description: `Welcome to YouSTUDY! This general English level test will help us to assess your English level and assign you to the correct class. It takes about 10 minutes to complete and is completely free.`,
      Questions:[
        {questionNumber:1,questionName:'Question 1',questionType:'Audio-Response',questionLength:NaN, points:10,questionDescription:'Read the question below and record your answer.',questionPrompt:'What do you do you a living? Do you enjoy it? Why/why not?',questionImage:'',
          questionAnswer:[
            {
              'Daniel Angel':[
                {studentResponse:"I'm a student. I love it."},
                {teacherResponse:"Great answer, Daniel!"},
                {questionScore:9},
              ]
            },
          ]
        },
        {questionNumber:2,questionName:'Question 2',questionType:'Audio-Response',questionLength:NaN, questionDescription:'Read the question below and record your answer.',questionPrompt:'If you could quit your job and have any job in the world, what would you be? Why?',questionImage:'',
          questionAnswer:[
            {
              'Daniel Angel':[
                {studentResponse:"I would be doctor"},
                {teacherResponse:"Good answer daniel, but here we need an article, 'a', with the noun 'docotr'"},
                {questionScore:6},
              ]
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
      Questions:[]
    },
  ];
  tableDataFiltered = this.tableData

  constructor(public dialog: MatDialog) {}
  ngOnInit(): void{ }

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

  openExamDialog(exam: any){ 

    const dialogRef = this.dialog.open(ExamDisplayIndividualComponent,{
      width: '1000px',
      data: exam,
    });  

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }
}
// export class ExamsShowComponent implements OnInit { 
 

// Exams = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

//   displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
//   dataSource = new MatTableDataSource(this.Exams);
//   columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];

//   constructor(private _liveAnnouncer: LiveAnnouncer) { }

//   ngOnInit(): void {
//   }
  
//   @ViewChild(MatSort)
//   sort: MatSort = new MatSort;

//   ngAfterViewInit() {
//     this.dataSource.sort = this.sort;
//   }

//     announceSortChange(sortState: Sort) {
//     // This example uses English messages. If your application supports
//     // multiple language, you would internationalize these strings.
//     // Furthermore, you can customize the message to add additional
//     // details about the values being sorted.
//     if (sortState.direction) {
//       this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
//     } else {
//       this._liveAnnouncer.announce('Sorting cleared');
//     }
//   }

// }
