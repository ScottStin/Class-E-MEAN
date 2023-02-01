import { Component, OnInit, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ExamService } from 'backend/services/exam-services/exam.service';
import { UsersService } from 'backend/services/user-services/users.service';
import { GeneralDialogComponent } from '../general-dialog/general-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';

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
    responseTypeInput:"",
    questionLengthInput:"",
    examTypeInput:"",
    assignedTeacherInput:""
  });

  columnsToDisplayLessonTable = ['Name','Desc','Prompt', 'Resp','Time','Points','File', 'Actions'];
  tableData:Array<any>=[]

  defaultWelcomeExam = false
  faPlus = faPlus;
  questionName = "";
  examName = "";
  responseType = "";
  teachers:Array<any> = [];

  constructor(    
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private examServices: ExamService,
    private userService: UsersService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.getUsers();
  }

  getUsers = async()=>{
    await this.userService.readUsers().subscribe((res: any)=>{     
      console.log(res)
      this.teachers = res.filter((obj: { userType: string; })=>{return obj.userType === 'Teacher'})
    })
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
        questionLength: this.examForm.get('questionLengthInput')?.value,
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

  changeResponseType(){
    this.responseType =  this.examForm.get('responseTypeInput')?.value
    return this.responseType
  }

  defaultWarningMessage(){
    this.defaultWelcomeExam=!this.defaultWelcomeExam
    console.log(this.defaultWelcomeExam)
    if (this.defaultWelcomeExam){
      const dialogRef = this.dialog.open(GeneralDialogComponent,{
        width: '530px',
        data: {
          header: `Change default exam?`,
          body: `You have set this exam to be your new default. The default exam is automatically assigned to new students when they sign up. You can only have one default exam. Therefore, this will become the new current default exam.`,
          icon: "faRightToBracket",
          rightButton:'Okay',
          // leftButton: 'Cancel',
        }
      })
    }
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
    // if(this.defaultWelcomeExam){
    //   const dialogRef = this.dialog.open(GeneralDialogComponent,{
    //     width: '530px',
    //     data: {
    //       header: `Change default exam?`,
    //       body: `You have set this exam to be your new default. The default exam is automatically assigned to new students when they sign up. You can only have one default exam. Therefore, this will become the new current default exam`,
    //       icon: "faRightToBracket",
    //       rightButton:'Set new defaul',
    //       leftButton: 'Cancel',
    //     }
    //   });
      
    //   dialogRef.afterClosed().subscribe(async result => {
    //     console.log(`Dialog result: ${result}`);
    //     if(result){
         
    //     }
    //   });
    // }
    const exam = {
      examName: this.examForm.get('examNameInput')?.value,
      examDescription: this.examForm.get('examDescriptionInput')?.value,
      examType: this.examForm.get('examTypeInput')?.value,
      examTime: this.examForm.get('examTimeLimitInput')?.value,
      defaultWelcomeExam: this.defaultWelcomeExam,
      examCasualPrice: this.examForm.get('examCostInput')?.value,
      examTotalScore: this.tableData.reduce((acc, obj) => { return parseInt(acc) + parseInt(obj.questionPoints);}, 0),
      Questions:this.tableData,
      // studentEnrolled: [],
      // studentCompleted: [],
      assignedTeacher: this.examForm.get('assignedTeacherInput')?.value,
    }
    console.log(exam)
    await this.examServices.createExam(exam).subscribe((res: any)=>{     
      console.log(res)      
    })
  }

}
