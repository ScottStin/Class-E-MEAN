import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ExamDisplayIndividualComponent } from '../../exam-display-individual/exam-display-individual.component';

@Component({
  selector: 'app-exam-user-dialog',
  templateUrl: './exam-user-dialog.component.html',
  styleUrls: ['./exam-user-dialog.component.css']
})
export class ExamUserDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  showUserExam(student:any){ 
      const dialogRef = this.dialog.open(ExamDisplayIndividualComponent,{
        width: '1000px',
        data:{ exam:this.data.body, user:{email:student.studentEmail,name:student.studentName, userType:'Teacher'}}
      });  
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
  }

}
