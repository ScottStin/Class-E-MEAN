import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-general-dialog',
  templateUrl: './general-dialog.component.html',
  styleUrls: ['./general-dialog.component.css']
})
export class GeneralDialogComponent implements OnInit {
 
  faXmark = faXmark;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.data)
  }

  setLevel(level:string){
    console.log(level)
    this.data.result=level
  }

}
