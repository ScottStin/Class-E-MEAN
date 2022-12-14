import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
// import {MatTable} from '@angular/material/table';

@Component({
  selector: 'app-new-class',
  templateUrl: './new-class.component.html',
  styleUrls: ['./new-class.component.css']
})
export class NewClassComponent implements OnInit {
  // @ViewChild(MatTable) table: MatTable<any> | undefined;

  lessonForm: FormGroup = this.formBuilder.group({
    dateInput: "",
    typeInput: [""],
    timeInput: [new Date().toString().slice(16, 21)],
    sizeInput: "",
    lengthInput: "",
    levelInput: "",
    descriptionInput: "",
  });
  
  columnsToDisplayLessonTable = ['Date','Start Time','Length (hours)', 'Max Size','Class Type','Level','Description','Action'];
  tableData:Array<any>=[]
  levels = ['A2 Lower-Intermediate','B1 Intermediate','B2 Upper-Intermediate','C1 Advanced']
  lessonTypes:Array<string> = ["General English","IELTS Exam Prep","PTE Exam Prep","Cambridge Exam Prep"]
  faPlus = faPlus
  currentUser:any = {name:"Tamara Loyacono",userType:"Teacher",school:"YouSTUDY",nationality:"Argentina",email:"tamaraloyacono@gmail.com",hashedPassword:"Test1234",package:[],level:"",statement:"My area of expertise is improving grammar and pronuciation. When I'm not teaching, I love reading, hiking, camping and studying languages."};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
  ) { }

  async ngOnInit(): Promise < void > {
    console.log(new Date())
    // this.lessonForm = this.formBuilder.group({
    //   dateInput: "",
    //   typeInput: [""],
    //   timeInput: [new Date().toString().slice(16, 21)],
    //   sizeInput: "",
    //   lengthInput: "",
    //   levelInput: "",
    //   descriptionInput: "",
    // });
    // this.lessonForm.controls['timeInput'].setValue("17:00");
  }

  addNewLessonRow(){
    // console.log(this.lessonForm.controls['timeInput'].get('value'))
    const form = this.lessonForm.get('timeInput')?.value
    console.log(this.lessonForm.get('timeInput')?.value)
    const data = {
      starTime: this.lessonForm.get('timeInput')
    }
    const months = ["January", "February", "March", "April", "May", "June",  "July", "August", "September", "October", "November", "December"];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
    const date = JSON.stringify(this.lessonForm.get('dateInput')?.value).slice(1,11)
    this.tableData.push(
      {
        teacher:this.currentUser.name,
        // startDate: JSON.stringify(this.lessonForm.get('dateInput')?.value.slice(1,11)),
        startDate: `${days[new Date (date).getDay()]} ${months[new Date (date).getMonth()].slice(0,3)} ${new Date (date).getDate()} ${new Date (date).getFullYear()}`,
        classType: this.lessonForm.get('typeInput')?.value,
        startTime: this.lessonForm.get('timeInput')?.value,
        maxSize: this.lessonForm.get('sizeInput')?.value,
        length: this.lessonForm.get('lengthInput')?.value/60,
        level: this.lessonForm.get('levelInput')?.value,
        description: this.lessonForm.get('descriptionInput')?.value,
      }
    )
    this.tableData = this.tableData
    // this.table?.renderRows()
    console.log(this.tableData)
    //this.lessonForm.get('timeInput').value
  }

}
