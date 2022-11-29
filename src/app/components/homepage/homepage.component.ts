import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

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
    {name:"Scott Stinson",userType:"Teacher",school:"YouSTUDY",nationality:"Australia",email:"scott.stinson.1991@gmail.com",hashedPassword:"test123",profilePicture:this.teacherImage1,package:[],level:""},
    {name:"Tamara Loyacono",userType:"Teacher",school:"YouSTUDY",nationality:"Argentina",email:"tamaraloyacono@gmail.com",hashedPassword:"Test1234",profilePicture:this.teacherImage3,package:[],level:""},
    {name:"Carol Doyle",userType:"Teacher",school:"YouSTUDY",nationality:"Australia",email:"caroldoyle@youstudy.com",hashedPassword:"Youstudy123",profilePicture:this.teacherImage4,package:[],level:""},
    {name:"Cecilia Smith",userType:"Teacher",school:"YouSTUDY",nationality:"Argentina",email:"csmith@youstudy.com",hashedPassword:"Youstudy12345",profilePicture:this.teacherImage5,package:[],level:""},
    {name:"James Smith",userType:"Teacher",school:"YouSTUDY",nationality:"USA",email:"jjs@youstudy.com",hashedPassword:"testtest",profilePicture:this.teacherImage2,package:[],level:""},
    {name:"Naufal Omarieza",userType:"Student",school:"YouSTUDY",nationality:"Indonesia",email:"dom-a@gmail.com",hashedPassword:"italy4eva",profilePicture:this.studentImage1,package:[],eltComplete:false,level:""},
    {name:"Dom Argentino",userType:"Student",school:"YouSTUDY",nationality:"Italy",email:"naufal1@gmail.com",hashedPassword:"naufal1234",profilePicture:this.studentImage2,package:[],eltComplete:true, level:""},
    {name:"Daniel Angel",userType:"Student",school:"YouSTUDY",nationality:"Spain",email:"danielAng@gmail.com.es",hashedPassword:"danTheMan99",profilePicture:this.studentImage3,package:[],eltComplete:true,level:"B2 Upper-Intermediate"},
    {name:"Adam Driver",userType:"Student",school:"YouSTUDY",nationality:"France",email:"starwarsfan@gmail.com",hashedPassword:"darklord1122",profilePicture:this.studentImage4,package:[],eltComplete:true,level:"B2 Upper-Intermediate"},
    {name:"John Wayne",userType:"Student",school:"YouSTUDY",nationality:"Chile",email:"cowboy@gmail.com",hashedPassword:"cowboi99",profilePicture:this.studentImage5,package:[],eltComplete:true,level:"B2 Upper-Intermediate"},
  ]

  lessons = [
    {teacher: this.users[1].name,length:2, startDate:'Monday Dec 12 2022', startTime: '17:00', level:['A2 Lower-Intermediate'], classType:"General English", status:'pending',restricted:false,maxSize:4,studentsEnrolled:[this.users[7],this.users[8],this.users[9]],studentsAttended:[], description:"General English classes to improve your speaking, reading, writing, vocab and grammar in a conversation settings."},
    {teacher: this.users[4].name,length:2, startDate:'Sunday Dec 11 2022', startTime: '11:00', level:['B2 Upper-Intermediate'], classType:"General English", status:'pending',restricted:false,maxSize:3,studentsEnrolled:[this.users[7],this.users[8],this.users[9]],studentsAttended:[],description:"Weekend general English classes to improve your speaking, reading, writing, vocab and grammar in a conversation settings."},
    {teacher: this.users[0].name,length:2, startDate:'Monday Dec 12 2022', startTime: '17:00', level:['B2 Upper-Intermediate'], classType:"General English", status:'pending',restricted:false,maxSize:8,studentsEnrolled:[this.users[7],this.users[8],this.users[9]],studentsAttended:[],description:"General English classes to improve your speaking, reading, writing, vocab and grammar in a conversation settings."},
    {teacher:  this.users[0].name,length:2, startDate:'Monday Dec 12 2022', startTime: '19:00', level:['B1 Intermediate'], classType:"General English", status:'pending',restricted:false,maxSize:6,studentsEnrolled:[],studentsAttended:[], description:"General English classes to improve your speaking, reading, writing, vocab and grammar in a conversation settings."},
    {teacher: this.users[1].name,length:2, startDate:'Wednesday Dec 14 2022', startTime: '17:00', level:['A2 Lower-Intermediat'], classType:"General English", status:'pending',restricted:false,maxSize:4,studentsEnrolled:[],studentsAttended:[],description:"General English classes to improve your speaking, reading, writing, vocab and grammar in a conversation settings."},
    {teacher: this.users[0].name,length:2, startDate:'Wednesday Dec 14 2022', startTime: '17:00', level:['B2 Upper-Intermediate'], classType:"General English", status:'pending',restricted:false,maxSize:8,studentsEnrolled:[],studentsAttended:[],description:"General English classes to improve your speaking, reading, writing, vocab and grammar in a conversation settings."},
    {teacher:  this.users[0].name,length:2, startDate:'Wednesday Dec 14 2022', startTime: '19:00', level:['B1 Intermediate'], classType:"General English", status:'pending',restricted:false,maxSize:6,studentsEnrolled:[],studentsAttended:[],description:"General English classes to improve your speaking, reading, writing, vocab and grammar in a conversation settings."},
    {teacher: this.users[1].name,length:2, startDate:'Friday Dec 16 2022', startTime: '17:00', level:['A2 lower-Intermediate'], classType:"General English", status:'pending',restricted:false,maxSize:4,studentsEnrolled:[],studentsAttended:[],teacherImage:"",description:"General English classes to improve your speaking, reading, writing, vocab and grammar in a conversation settings."},
    {teacher:  this.users[0].name,length:2, startDate:'Friday Dec 16 2022', startTime: '17:00', level:['B2 Upper-Intermediate'], classType:"General English", status:'pending',restricted:false,maxSize:8,studentsEnrolled:[],studentsAttended:[],description:"General English classes to improve your speaking, reading, writing, vocab and grammar in a conversation settings."},
    {teacher:  this.users[0].name,length:2, startDate:'Friday Dec 16 2022', startTime: '19:00', level:['B1 Intermediate'], classType:"General English", status:'pending',restricted:false,maxSize:6,studentsEnrolled:[],studentsAttended:[],description:"General English classes to improve your speaking, reading, writing, vocab and grammar in a conversation settings."},
    {teacher: this.users[3].name,length:2, startDate:'Monday Dec 12 2022', startTime: '19:00', level:['C1 Advanced'], classType:"General English", status:'pending',restricted:false,maxSize:8,studentsEnrolled:[],studentsAttended:[],description:"General English classes to improve your speaking, reading, writing, vocab and grammar in a conversation settings."},
    {teacher: this.users[3].name,length:2, startDate:'Monday Dec 12 2022', startTime: '19:00', level:['C1 Advanced'], classType:"General English", status:'pending',restricted:false,maxSize:8,studentsEnrolled:[],studentsAttended:[],teacherImage:"",description:"General English classes to improve your speaking, reading, writing, vocab and grammar in a conversation settings."},
    {teacher: this.users[3].name,length:2, startDate:'Monday Dec 12 2022', startTime: '19:00', level:['C1 Intermediate'], classType:"General English", status:'pending',restricted:false,maxSize:8,studentsEnrolled:[],studentsAttended:[],description:"General English classes to improve your speaking, reading, writing, vocab and grammar in a conversation settings."},
    {teacher:  this.users[2].name,length:2, startDate:'Tuesday Dec 13 2022', startTime: '17:00', level:['B1 Intermediate', 'B2 Upper-Intermediate','C1 Intermediate'], classType:"PTE Exam Prep", status:'pending',restricted:false,maxSize:12,studentsEnrolled:[],studentsAttended:[],teacherImage:"",description:"Ace your PTE exam by gettings tips and tricks to get a great answer. This lesson will cover writing and listening"},
    {teacher:  this.users[0].name,length:2, startDate:'Tuesday Dec 13 2022', startTime: '17:00', level:['B1 Intermediate', 'B2 Upper-Intermediate','C1 Intermediate'], classType:"IELTS Exam Prep", status:'pending',restricted:false,maxSize:12,studentsEnrolled:[],studentsAttended:[],description:"This lesson will cover the speaking section of the IELTS"},
    {teacher:  this.users[2].name,length:2, startDate:'Thursday Dec 15 2022', startTime: '17:00', level:['B1 Intermediate', 'B2 Upper-Intermediate','C1 Intermediate'], classType:"PTE Exam Prep", status:'pending',restricted:false,maxSize:12,studentsEnrolled:[],studentsAttended:[],description:"This lesson will cover the reading and speaking sections of the PTE. e'll practice answering questions and learn some great tips and stratergies to improve your score"},
    {teacher:  this.users[0].name,length:2, startDate:'Thursday Dec 15 2022', startTime: '17:00', level:['B1 Intermediate', 'B2 Upper-Intermediate','C1 Intermediate'], classType:"IELTS Exam Prep", status:'pending',restricted:false,maxSize:12,studentsEnrolled:[],studentsAttended:[],description:"Here we will practice questions from the IELTS listening, reading and writing"},
    {teacher: this.users[4].name,length:3, startDate:'Thursday Dec 15 2022', startTime: '17:30', level:['B1 Intermediate', 'B2 Upper-Intermediate','C1 Intermediate'], classType:"Cambridge Exam Prep", status:'pending',restricted:false,maxSize:12,studentsEnrolled:[],studentsAttended:[],description:"In this lesson, we'll learn tips and tricks to ace the cambridge exam"},
  ]

  lessonTypes:Array<string> = ["General English","IELTS Exam Prep","PTE Exam Prep","Cambridge Exam Prep"]

  filterLessonType:string = ""
  currentUser: any =""
  urlAddress:string=""
  displayUsers = this.users

  constructor(private router: Router) {  }

  ngOnInit(): void {
    this.filterLessonType = this.lessonTypes[0]
    this.currentUser=this.users[7]
    this.urlAddress = this.router.url
    console.log(this.urlAddress)
    this.lessonStudentsEnrolled(this.lessons[1])
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
    console.log(lesson.studentsEnrolled)
    if(lesson.studentsEnrolled.includes(this.currentUser)){
      return true
    } else{
      return false
    }
  }

}
