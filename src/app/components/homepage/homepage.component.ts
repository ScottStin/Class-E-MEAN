import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NewClassComponent } from '../new-class/new-class.component';
import { HttpClient } from '@angular/common/http';
import { LessonServiceService } from 'backend/services/lesson-service/lesson-service.service';
import { UsersService } from 'backend/services/user-services/users.service';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  studentImage1:any = "../../../assets/student1.jpg";
  studentImage2:any = "../../../assets/student2.jpg";
  studentImage3:any = "../../../assets/student3.webp";
  studentImage4:any = "../../../assets/student4.jpg";
  studentImage5:any = "../../../assets/student5.jpg";
  teacherImage1:any = "../../../assets/teacher1.jpg";
  teacherImage2:any = "../../../assets/teacher2.jpg";
  teacherImage3:any = "../../../assets/teacher3.jpg";
  teacherImage4:any = "../../../assets/teacher4.jpg";
  teacherImage5:any = "../../../assets/teacher5.jpg";

  users:Array<any>=[
    // {name:"Scott Stinson",userType:"Teacher",school:"YouSTUDY",nationality:"Australia",email:"scott.stinson.1991@gmail.com",hashedPassword:"test123",profilePicture:this.teacherImage1,package:[],level:"",statement:"I specialise in teaching general English. I love to help students improve their vocab, grammar and general conversation skills. I can also help you prepare for the IELTS"},
    // {name:"Tamara Loyacono",userType:"Teacher",school:"YouSTUDY",nationality:"Argentina",email:"tamaraloyacono@gmail.com",hashedPassword:"Test1234",profilePicture:this.teacherImage3,package:[],level:"",statement:"My area of expertise is improving grammar and pronuciation. When I'm not teaching, I love reading, hiking, camping and studying languages."},
    // {name:"Carol Doyle",userType:"Teacher",school:"YouSTUDY",nationality:"Australia",email:"caroldoyle@youstudy.com",hashedPassword:"Youstudy123",profilePicture:this.teacherImage4,package:[],level:"",statement:"I have 10 years experience helping students prepare for the PTE exam. My tips and ticks will help you ace the PTE. When I'm not teaching, I love horse riding."},
    // {name:"Cecilia Smith",userType:"Teacher",school:"YouSTUDY",nationality:"Argentina",email:"csmith@youstudy.com",hashedPassword:"Youstudy12345",profilePicture:this.teacherImage5,package:[],level:"",statement:"I have been teaching English for 15 years. My classes cover all the main skills: reading, writing, speaking, listening, vocab, grammar, pronunciation and spelling."},
    // {name:"James Smith",userType:"Teacher",school:"YouSTUDY",nationality:"USA",email:"jjs@youstudy.com",hashedPassword:"testtest",profilePicture:this.teacherImage2,package:[],level:"",statement:"Let me ask you a question. What's the difference between these two sentences: 1) I received three emails at work today, and 2) I have received three emails at work today. Not sure? Join my classes to review the main grammar tenses. I can also help you prepare for the Cambridge examm."},
    // {name:"Naufal Omarieza",userType:"Student",school:"YouSTUDY",nationality:"Indonesia",email:"dom-a@gmail.com",hashedPassword:"italy4eva",profilePicture:this.studentImage1,package:[],eltComplete:false,level:"",statement:""},
    // {name:"Dom Argentino",userType:"Student",school:"YouSTUDY",nationality:"Italy",email:"naufal1@gmail.com",hashedPassword:"naufal1234",profilePicture:this.studentImage2,package:[],eltComplete:true, level:"",statement:""},
    // {name:"Daniel Angel",userType:"Student",school:"YouSTUDY",nationality:"Spain",email:"danielAng@gmail.com.es",hashedPassword:"danTheMan99",profilePicture:this.studentImage3,package:[],eltComplete:true,level:"B2 Upper-Intermediate",statement:""},
    // {name:"Adam Driver",userType:"Student",school:"YouSTUDY",nationality:"France",email:"starwarsfan@gmail.com",hashedPassword:"darklord1122",profilePicture:this.studentImage4,package:[],eltComplete:true,level:"B2 Upper-Intermediate",statement:""},
    // {name:"John Wayne",userType:"Student",school:"YouSTUDY",nationality:"Chile",email:"cowboy@gmail.com",hashedPassword:"cowboi99",profilePicture:this.studentImage5,package:[],eltComplete:true,level:"B2 Upper-Intermediate",statement:""},
  ]

  lessons:Array<any> = []

  lessonTypes:Array<any> = [{longName:"General English",shortName:"Gen Eng"},{longName:"IELTS Exam Prep",shortName:"IELTS"},{longName:"PTE Exam Prep",shortName:"PTE"},{longName:"Cambridge Exam Prep",shortName:"Camb"}]
  // lessonTypesShort:Array<string> = ["Gen Eng","IELTS Exam Prep","PTE Exam Prep","Camb Exam Prep"]
  filterLessonType:string = ""
  filterLessonDate:string = "All Lessons"
  currentUser: any =""
  urlAddress:string=""
  displayUsers: Array<any>=[]// = this.users 
  displayLessons:any
  // displayLessons:any = this.lessons.sort(function(a: { startDate: string; startTime: string; },b: { startDate: string; startTime: string; }){return new Date(a.startDate+", "+a.startTime).getTime() - new Date(b.startDate+", "+b.startTime).getTime()}).filter((obj:any)=>{return new Date(new Date(`${obj.startDate} ${this.lessons[0].startTime}:00`).setHours(new Date(`${obj.startDate} ${obj.startTime}:00`).getHours()+obj.length)) >= new Date()})//{return new Date(obj.startDate +" ,"+obj.startTime).getTime()+(obj.length*3600000) > new Date().getTime()});
  faPlus = faPlus

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private http: HttpClient,
    private lessonService: LessonServiceService,
    private userService: UsersService,
    private _snackBar: MatSnackBar
    ) {  }

  async ngOnInit(): Promise<any> {    

    // this.currentUser=this.users[1]
    this.currentUser=JSON.parse(localStorage.getItem('currentUser')!)
    this.urlAddress = this.router.url 
    this.filterLessonType = this.lessonTypes[0].longName
    this.getUsers()
    this.getLessons()
    console.log(this.lessons)    
  }

  // ngOnChanges(){
  //   console.log('tests')
  //   this.getLessons()
  // }

  getLessons = async()=>{
    await this.lessonService.readLesson().subscribe((res: any)=>{      
      this.lessons = res
      console.log(this.lessons)
      this.displayLessons = this.lessons.sort(function(a: { startDate: string; startTime: string; },b: { startDate: string; startTime: string; }){return new Date(a.startDate+", "+a.startTime).getTime() - new Date(b.startDate+", "+b.startTime).getTime()}).filter((obj:any)=>{return new Date(new Date(`${obj.startDate} ${this.lessons[0].startTime}:00`).setHours(new Date(`${obj.startDate} ${obj.startTime}:00`).getHours()+obj.length)) >= new Date()})//{return new Date(obj.startDate +" ,"+obj.startTime).getTime()+(obj.length*3600000) > new Date().getTime()});
    })
  }

  postLessons = async(lessons:any)=>{
    await this.lessonService.createLesson(lessons).subscribe((res: any)=>{     
      console.log(res)      
    })
  }

  getUsers = async()=>{
    await this.userService.readUsers().subscribe((res: any)=>{     
      console.log(res)
      this.users = res
      this.displayUsers = res  
    })
  }

  applyFilter(lessonType: string){
    this.filterLessonType = lessonType
  } 
  
  filterStudents(searchUsers: string){
    console.log(searchUsers)
    this.displayUsers = this.users.filter(obj=>{
      return obj.name.toLowerCase().includes(searchUsers.toLowerCase())
    })
  }

  lessonStudentsEnrolled(lesson: any){
    console.log(lesson)
    if(lesson.studentsEnrolled.includes(this.currentUser.email)){
      return true
    } else{
      return false
    }
  }

  applyFilterLessonDate (lessonDate:any) {
    this.displayLessons = []
    this.filterLessonDate = lessonDate
    this.lessons.filter(obj=>{     
      console.log(new Date(new Date(`${obj.startDate} ${this.lessons[0].startTime}:00`).setHours(new Date(`${obj.startDate} ${obj.startTime}:00`).getHours()+obj.length)))   
        if (this.filterLessonDate === 'Upcoming Lessons' && new Date(new Date(`${obj.startDate} ${this.lessons[0].startTime}:00`).setHours(new Date(`${obj.startDate} ${obj.startTime}:00`).getHours()+obj.length)) >= new Date()){
          this.displayLessons.push(obj)
        }
        if (this.filterLessonDate === 'Past Lessons' && new Date(new Date(`${obj.startDate} ${this.lessons[0].startTime}:00`).setHours(new Date(`${obj.startDate} ${obj.startTime}:00`).getHours()+obj.length)) < new Date()){
          this.displayLessons.push(obj)
        }
        if (this.filterLessonDate === 'All Lessons'){
          this.displayLessons.push(obj)
        }
    })
    this.displayLessons = this.displayLessons.sort(function(a: { startDate: string; startTime: string; },b: { startDate: string; startTime: string; }){return new Date(a.startDate+", "+a.startTime).getTime() - new Date(b.startDate+", "+b.startTime).getTime()});
  }

  openNewClassDialog(){ 

    const dialogRef = this.dialog.open(NewClassComponent,{
      width: '2000px',
      data: {
        header: 'Create new lessons',
        // body: '',
        rightButton:'Create',
        leftButton: 'Cancel',
        // routerLink:''
      }
    });  
    dialogRef.afterClosed().subscribe(async result => {
      console.log(result);
      let plural = ''
      if(result.length>1){
        plural='s'
      }
      if(result){
        await this.postLessons(result)        
          .then(res=>{
            console.log(res)
            this._snackBar.open(`New lesson${plural} created!`,'close');
            this.getLessons()
          })
          .catch(err=>{
            console.log(err)
            this._snackBar.open(`Woops, something went wrong.`,'close');
          })        
      }     
    });
  }

  dataChange(eventData: { update: boolean }){
    this.getLessons()
  }

}
