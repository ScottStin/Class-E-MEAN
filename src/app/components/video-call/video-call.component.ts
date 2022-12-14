import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { faVideo, faVideoSlash, faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';
//https://www.youtube.com/watch?v=SWhG0VRdiW8
const mediaConstraints ={
  audio:true,
  video:{width:720, height:540}
}

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})
export class VideoCallComponent implements AfterViewInit {

  private localStream?: MediaStream;
  @ViewChild('local_video')
  localVideo!: ElementRef;
  localVideoOn:boolean = false
  localMicOn:boolean = false
  faVideo = faVideo
  faVideoSlash = faVideoSlash
  faMicrophone = faMicrophone
  faMicrophoneSlash = faMicrophoneSlash

  constructor() { }
  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
    this.requestMediaDevices();
  }

  ngOnInit(): void {
  }

  private async requestMediaDevices(): Promise <void>{
    this.localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints)
    this.localVideo.nativeElement.srcObject = this.localStream;
    this.stopStartLocalVideo();
  }

  stopStartLocalVideo():void{
    this.localStream?.getTracks().forEach(track=>{
      track.enabled = !track.enabled;
      console.log(track.enabled)
    });
    if(!this.localVideo.nativeElement.srcObject){
      this.localVideo.nativeElement.srcObject = this.localStream
      console.log(1)
      this.localVideoOn = true
    } else{
      this.localVideo.nativeElement.srcObject = undefined
      console.log(2)
      this.localVideoOn=false
    }
  }

  muteUnmuteLocalMic(){
    this.localMicOn = !this.localMicOn
  }

}
