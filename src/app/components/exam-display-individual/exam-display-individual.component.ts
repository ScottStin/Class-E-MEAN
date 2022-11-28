import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-exam-display-individual',
  templateUrl: './exam-display-individual.component.html',
  styleUrls: ['./exam-display-individual.component.css']
})
export class ExamDisplayIndividualComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

}
