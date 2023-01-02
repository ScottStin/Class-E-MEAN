import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ExamService } from 'backend/services/exam-services/exam.service';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.css']
})
export class NewExamComponent implements OnInit {    

  examForm: FormGroup = this.formBuilder.group({
    examNameInput: "",
    examDescriptionInput: "",
    examTimeLimitInput: "",
    examCostInput: "",
    questionPromptInput:"",
    questionDescriptionInput:"",
    questionNameInput:"",
    questionFileInput:"",
    questionTimeLimitInput:"",
    questionPoints:"",
    responseTypeInput:""
  });

  columnsToDisplayLessonTable = ['Name','Desc','Prompt', 'Resp','Time','Points','File', 'Actions'];
  tableData:Array<any>=[]

  defaultWelcomeExam = false
  faPlus = faPlus;
  questionName = "";
  examName = "";

  constructor(    
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private examServices: ExamService,
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  addNewQuestionRow(){
    this.tableData.push(
      {
        questionName: this.examForm.get('questionNameInput')?.value,
        questionDescription: this.examForm.get('questionDescriptionInput')?.value,
        questionPrompt: this.examForm.get('questionPromptInput')?.value,
        questionType: this.examForm.get('responseTypeInput')?.value,
        questionMedia: this.selectedFile?.name,
        questionTime: this.examForm.get('questionTimeLimitInput')?.value,
        questionPoints: this.examForm.get('questionPoints')?.value,
      }
    )
    this.tableData = this.tableData
    // this.table?.renderRows()
    console.log(this.tableData)
  }

  changeQuestionName(){
    this.questionName = this.examForm.get('questionNameInput')?.value
  }

  changeExamName(){
    this.examName = this.examForm.get('examNameInput')?.value
  }

  selectedFile: any = null;

  onFileSelected(event: any): void {
      this.selectedFile = event.target.files[0] ?? null;
      this.examForm.get('questionFileInput')?.setValue(this.selectedFile?.name)  
  }

  removeQuestion(question:any){
    this.tableData =  this.tableData.filter(function(obj) { return obj !== question; });
  }

  postExams = async()=>{
    const exam = {
      examName: this.examForm.get('examNameInput')?.value,
      examDescription: this.examForm.get('examDescriptionInput')?.value,
      examType: this.examForm.get('examDescriptionInput')?.value,
      examTime: this.examForm.get('examTimeLimitInput')?.value,
      defaultWelcomeExam: this.defaultWelcomeExam,
      examCasualPrice: this.examForm.get('examCostInput')?.value,
      examTotalScore: this.tableData.reduce((acc, obj) => { return parseInt(acc) + parseInt(obj.questionPoints);}, 0),
      Questions:this.tableData,
      // studentEnrolled: [],
      // studentCompleted: [],
      // assignedTeacher:"",
    }
    console.log(exam)
    await this.examServices.createExam(exam).subscribe((res: any)=>{     
      console.log(res)      
    })
  }

}
