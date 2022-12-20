import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { Peer } from "peerjs";
import { faVideo, faVideoSlash, faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';



// import { PeerServer } from "peer";
//https://www.youtube.com/watch?v=98rz2GW5Tok
//https://dev.to/codesphere/building-a-video-chat-app-with-socket-io-peerjs-codesphere-5a63
//https://github.com/peers/peerjs/issues/808
//https://stackoverflow.com/questions/66937384/peer-oncalll-is-never-being-called

// declare const Peer: new (arg0: string, arg1: { host: string; port: number; }) => any; 

interface VideoElement{
  muted:boolean;
  srcObject:MediaStream | undefined;
  userId:string;
}

@Component({
  selector: 'app-video-call-v2',
  templateUrl: './video-call-v2.component.html',
  styleUrls: ['./video-call-v2.component.css']
})
export class VideoCallV2Component implements OnInit {

  currentUserId:string='testUser'+Math.floor(Math.random()*1000)//'testUser';
  videos:VideoElement[]=[];
  localVideoOn:boolean = false
  localMicOn:boolean = false
  faVideo = faVideo
  faVideoSlash = faVideoSlash
  faMicrophone = faMicrophone
  faMicrophoneSlash = faMicrophoneSlash

  constructor(
    private route: ActivatedRoute,
    private socket: Socket,
  ) {}

  ngOnInit() {
    console.log(`Init Peer with id ${this.currentUserId}`)
    
    //------------------------------------
    // --- Access user video and audio ---
    //------------------------------------

    navigator.mediaDevices.getUserMedia({
      audio:true,
      video:true
    }).catch((err)=>{
      console.log('user media error: ',err);
      return null
    }).then((stream:any)=>{ // .then((stream:MediaStream | null)=>{    

      const myPeer = new Peer(this.currentUserId,{
        host:'/',
        port:3000,
      });      
      console.log('myPeer ='); console.log(myPeer)

      // this.route.params.subscribe((params)=>{
        // console.log(params)
        myPeer.on('open',(userId: any)=>{
          console.log('test2')
          console.log(userId)
          // this.socket.emit('join-room',params['roomId'],userId)
          this.socket.emit('join-room','lessonvideo2',userId)
        });
      // });

      if (stream){        
        this.addMyVideo(stream);
        console.log(stream)
      } else{
        console.log('no stream found')
      }

      //-------------------------------
      // --- Receieve incoming call ---
      //-------------------------------

      myPeer.on('call',call=>{  // myPeer.on('call',(call: { answer: (arg0: MediaStream | null) => void; on: (arg0: string, arg1: { (otherUserVideoStream: MediaStream): void; (err: any): void; }) => void; metadata: { userId: string; }; })=>{// When we join someone's room we will receive a call from them
        console.log(`receiving call from... ${call}`);
        call.answer(stream)

        call.on('stream',(otherUserVideoStream: MediaStream)=>{
          console.log('receiving other user stream ' + otherUserVideoStream);
          this.addOtherUserVideo(call.metadata.userId,otherUserVideoStream);
        });

        call.on('error',(err:any)=>{
          console.log(err)
        })
      }); 
      // this.socket.emit("ready")

      //------------------------------
      // --- Connecting other user ---
      //------------------------------

      this.socket.on('user-connected',(userId:string)=>{
        console.log('receiving user-connected event', 'Calling ' + userId);      

        setTimeout(()=>{ // Allow some time for new peers to connect
          console.log("test3")
          const call = myPeer.call(userId,stream,{
            metadata:{userId:this.currentUserId},
          });
          call.on('stream',(otherUserVideoStream: MediaStream) =>{
            console.log('receiving other stream after...')
            this.addOtherUserVideo(userId,otherUserVideoStream)
          });

          call.on('close',()=>{
            this.videos=this.videos.filter((video)=>video.userId!==userId);
          });            
        },1000);          
      });        
    });

    //------------------------------
    // --- Disconnect other user ---
    //------------------------------

    this.socket.on('user-disconnected',(userId:string)=>{
      console.log('receiving user-doscconected event from '+ userId)
      this.videos = this.videos.filter((video)=>video.userId!==userId);
    })
  }

  addMyVideo(stream:MediaStream){
    for(let i of [0,1,2,3,4,5]){
      console.log('added')
      this.videos.push({
        muted:true,
        srcObject:stream,
        userId:this.currentUserId,
      });
    }
  }

  addOtherUserVideo(userId:string, stream:MediaStream){
    console.log('second video added')
    const alreadyExisting = this.videos.some(video => video.userId === userId)
    if (alreadyExisting){
      console.log(this.videos, userId);
      return;
    }
    this.videos.push({
      muted:true,
      srcObject:stream,
      userId,
    })
  }
  
  onLoadedMetadata(event:Event){
    (event.target as HTMLVideoElement).play()
  }  

    //------------------------------
    // ---------- Buttons ----------
    //------------------------------

  stopStartLocalVideo():void{
    // this.localStream?.getTracks().forEach(track=>{
    //   track.enabled = !track.enabled;
    //   console.log(track.enabled)
    // });
    // if(!this.localVideo.nativeElement.srcObject){
    //   this.localVideo.nativeElement.srcObject = this.localStream
    //   this.localVideoOn = true
    // } else{
    //   this.localVideo.nativeElement.srcObject = undefined
    //   this.localVideoOn=false
    // }
    this.localVideoOn = !this.localVideoOn
  }

  muteUnmuteLocalMic(){
    this.localMicOn = !this.localMicOn
  }

}
