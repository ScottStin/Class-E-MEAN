import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { faVideo, faVideoSlash, faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';
import { VideoCallService } from 'backend/services/videoCall-service/video-call.service';

//https://www.youtube.com/watch?v=SWhG0VRdiW8

const mediaConstraints ={
  audio:true,
  video:{width:720, height:540}
}

const offerOptions = {
  offerToReceiveAudio:true,
  offerToReceiveVideo:true
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

  private peerConnecton?:RTCPeerConnection //reference to remote party

  constructor(private videoCallService:VideoCallService) { }
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
      this.localVideoOn = true
    } else{
      this.localVideo.nativeElement.srcObject = undefined
      this.localVideoOn=false
    }
  }

  muteUnmuteLocalMic(){
    this.localMicOn = !this.localMicOn
  }

  // async call(): Promise<void>{
  //   this.createPeerConnection();
  // }

  // this.localStream.getTracks().forEach(){
  //   track=>this.peerConnecton.addTrack(track,this.localStream); // this will add all tracks rom local stream to remote (peer) party connection
  // };

  // try{
  //   const offer: RTCSessionDescriptionInit = await this.peerConnection.createOffer(offerOptions);
  //   await this.peerConnection.setLocalDescription(offer); //builds offer

  //   this.videoCallService.sendMessage({type:'offer',data:'offer'});
  // } catch(err){
  //   this.handleGetUserMediaError(err);
  // }

  // private createPeerConnection(){
  //   this.peerConnection = new RTCPeerConnection({
  //   iceServers:{

  //   }  
  //   })
  // }

  // handleGetUserMediaError(){

  // }

}
