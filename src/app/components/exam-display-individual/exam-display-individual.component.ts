import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule, FormArray} from '@angular/forms';
import { ExamService } from 'backend/services/exam-services/exam.service';

@Component({
  selector: 'app-exam-display-individual',
  templateUrl: './exam-display-individual.component.html',
  styleUrls: ['./exam-display-individual.component.css']
})
export class ExamDisplayIndividualComponent implements OnInit {

  studentResponseForm: FormGroup = this.formBuilder.group({
    // questionWrittenResponseInput: "",
    // responses: this.formBuilder.array([])
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private examServices: ExamService
  ) { }

  playerSrc?: MediaStream;
  downloadLink: any 
  audioSrc = new Audio();
  audioURL?: SafeUrl;
  mediaRecorder?: MediaRecorder;
  faMicrophone = faMicrophone;
  recordAudioButtonSpin = false;
  faSpinner = faSpinner;
  studentResponses: any={}
  teacherFeedback: any={}
  finalComments:String = ""
  score:String = ""

  ngOnInit(): void {
    console.log(this.data);
    // for(let question of this.data.exam.Questions){
      // (this.studentResponseForm.get('responses') as FormArray).push(this.formBuilder.control(''));
    // }
  }

  studentCompleted(){
    if(this.data.exam.studentCompleted.filter((obj:any)=>{return obj.studentEmail === this.data.user.email})[0]){
      return true
    } else{
      return false
    }    
  }

  findStudentResponse(question:any){
    if(question.questionAnswer.filter((obj:any)=>{return obj.studentEmail === this.data.user.email})[0]?.studentResponse){
      return question.questionAnswer.filter((obj:any)=>{return obj.studentEmail === this.data.user.email})[0]?.studentResponse
    } else{
      return false
    }    
  }

  findTeacherFeedback(question:any){
    if(question.questionAnswer.filter((obj:any)=>{return obj.studentName === this.data.user.name})[0]?.teacherResponse){
      return question.questionAnswer.filter((obj:any)=>{return obj.studentName === this.data.user.name})[0]?.teacherResponse
    } else{
      return false
    }  
  }

  findResponseScore(question:any){
    if(question.questionAnswer.filter((obj:any)=>{return obj.studentName === this.data.user.name})[0]?.questionScore){
      return question.questionAnswer.filter((obj:any)=>{return obj.studentName === this.data.user.name})[0]?.questionScore
    } else{
      return false
    }  
  }

  findFinalScore(){
    if (this.data.exam.studentCompleted.filter((obj: { studentEmail: any; })=>{return obj.studentEmail===this.data.user.email})[0]?.score){
      // console.log(this.data.exam.studentCompleted.filter((obj: { studentEmail: any; })=>{return obj.studentEmail===this.data.user.email}))
      // return this.data.exam.studentCompleted.filter((obj: { studentEmail: any; })=>{return obj.studentEmail===this.data.user.email})[0].finalComments
     this.finalComments =  this.data.exam.studentCompleted.filter((obj: { studentEmail: any; })=>{return obj.studentEmail===this.data.user.email})[0]?.finalComments
     this.score =  this.data.exam.studentCompleted.filter((obj: { studentEmail: any; })=>{return obj.studentEmail===this.data.user.email})[0]?.score
    //  console.log(this.data.exam)
     return true
      
    } else{
      return false
    }
  }
  
  recordAudio(question:any){ //https://medium.com/@bryanjenningz/how-to-record-and-play-audio-in-javascript-faa1b2b3e49b
    console.log(question)
    this.recordAudioButtonSpin = true
    console.log(this.audioSrc)
    navigator.mediaDevices
    .getUserMedia({audio: true, video: false})
    .then(
      (stream) =>{
        console.log(stream)
   
        // const mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.start();
        const audioChunks: BlobPart[] | undefined = [];
        this.mediaRecorder.addEventListener("dataavailable", event => {
          audioChunks.push(event.data);
        });
        this.mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          this.audioSrc = new Audio(audioUrl);
          // const audioSrc = new Audio(audioUrl);
          this.audioURL = this.sanitizer.bypassSecurityTrustUrl(`${audioUrl}`);   
          this.studentResponses[question._id]={studentName:this.data.user.name,studentEmail:this.data.user.email,studentResponse:this.audioURL}       
          // this.audioSrc.play();
        });
        setTimeout(() => {
          this.mediaRecorder?.stop();
          // this.studentResponses[question._id]={studentName:this.data.user.name,studentEmail:this.data.user.email,studentResponse:this.audioURL}
          this.recordAudioButtonSpin = false
        }, 1000*question.questionLength);
      }
    );
    console.log(this.studentResponses[question._id]?.studentResponse)
  }

  // getAudioSrc(question:any){
  //   return this.studentResponses[question._id].studentResponse
  // }

  pauseAudio(question:any){
    this.mediaRecorder?.stop();
    // this.studentResponses[question._id]={studentName:this.data.user.name,studentEmail:this.data.user.email,studentResponse:this.audioURL}
    this.recordAudioButtonSpin = false
  }

  playAudio(){
    const player = document.getElementById('player');
    this.audioSrc.play();
  }

  updateAnswer(question: any, event:any){
    this.studentResponses[question._id]={studentName:this.data.user.name,studentEmail:this.data.user.email,studentResponse:event.target.value}
    console.log(this.studentResponses)    
  }

  updateTeacherFeedback(question: any, event:any){
    this.teacherFeedback[question._id]={teacherResponse:event.target.value}
    console.log(this.teacherFeedback)    
  }

  async submitStudentResponses(){
    await this.examServices.submitStudentResponses({parentExamRef:this.data.exam._id,studentResponses:this.studentResponses}).subscribe((res: any)=>{     
      console.log(res) 
      if(res){
        console.log('TEST')
        console.log(res)
        localStorage.setItem('currentUser',JSON.stringify(res)) 
      }   
    })
  }

  async submitFeedback(){
    console.log(this.data)
    await this.examServices.submitTeacherFeedback({parentExamRef:this.data.exam._id,teacherFeedback:this.teacherFeedback,finalComments:(<HTMLInputElement>document.getElementById("finalComments")).value, score:(<HTMLInputElement>document.getElementById("finalScore")).value, userEmail:this.data.user.email}).subscribe((res: any)=>{     
      console.log(res)      
    })
  }

}
