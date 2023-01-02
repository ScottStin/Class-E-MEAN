import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-exam-display-individual',
  templateUrl: './exam-display-individual.component.html',
  styleUrls: ['./exam-display-individual.component.css']
})
export class ExamDisplayIndividualComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
  ) { }

  playerSrc?: MediaStream;
  downloadLink: any 
  audioSrc = new Audio();
  audioURL?: SafeUrl;
  mediaRecorder?: MediaRecorder;
  faMicrophone = faMicrophone;
  recordAudioButtonSpin = false;
  faSpinner = faSpinner;

  ngOnInit(): void {
    console.log(this.data)
  }

  findStudentResponse(question:any){
    if(question.questionAnswer.filter((obj:any)=>{return obj.studentName === this.data.user.name})[0]?.studentResponse){
      return question.questionAnswer.filter((obj:any)=>{return obj.studentName === this.data.user.name})[0]?.studentResponse
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
  
  recordAudio(length:number){ //https://medium.com/@bryanjenningz/how-to-record-and-play-audio-in-javascript-faa1b2b3e49b
    console.log(length)
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
          this.audioURL = this.sanitizer.bypassSecurityTrustUrl(`${audioUrl}`);
          // this.audioSrc.play();
        });
        setTimeout(() => {
          this.mediaRecorder?.stop();
          this.recordAudioButtonSpin = false
        }, 1000*length);
      }
    );
  }

  pauseAudio(){
    this.mediaRecorder?.stop();
    this.recordAudioButtonSpin = false
  }

  playAudio(){
    const player = document.getElementById('player');
    this.audioSrc.play();
  }



}
