import { Component, OnInit,Input } from '@angular/core';
import { faBoxOpen, faMessage,faBullhorn,faFolder,faPenToSquare,faChalkboardUser,faUsers,faCertificate,faGraduationCap,faStar,faClipboardCheck,faHouseLaptop,faBook,faSchool,faPeopleGroup,faHouseChimney ,faPersonChalkboard,faFilm} from '@fortawesome/free-solid-svg-icons';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import { ExamService } from 'backend/services/exam-services/exam.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() currentUser: any | undefined;
  @Input() activePage: string | undefined;
  faStar = faStar;
  examsToMark:any=""

  menuItems: any = [
    {name:"Home Page",icon:faHouseChimney,use:["Student","Teacher"],routerLink:'/home'},
    {name:"My Classes",icon:faChalkboardUser,use:["Student","Teacher"],routerLink:'/myclasses'},
    {name:"My Exams",icon:faClipboardCheck,use:["Student"],routerLink:'/exams'},
    {name:"My Coursework",icon:faBook,use:["Student"],routerLink:''},
    {name:"My Homework",icon:faHouseLaptop,use:["Student"],routerLink:''},
    {name:"My Teachers",icon:faPersonChalkboard,use:["Student"],routerLink:'/teacherlist'},
    {name:"My Classmates",icon:faUsers,use:["Student"],routerLink:'/studentlist'},
    {name:"My Certificates",icon:faCertificate,use:["Student"],routerLink:''},
    {name:"My Students",icon:faGraduationCap,use:["Teacher"],routerLink:'/studentlist'},
    {name:"My Colleagues",icon:faPeopleGroup,use:["Teacher"],routerLink:'/teacherlist'},
    {name:"My Messages",icon:faMessage,use:["Teacher","Student"],routerLink:''},
    {name:"My Announcements",icon:faBullhorn,use:["Teacher","Student"],routerLink:''},
    {name:"Class Material",icon:faFolder,use:["Teacher"],routerLink:''},
    {name:"Exam Marking",icon:faPenToSquare,use:["Teacher"],routerLink:'/exams'},
    {name:"My Packages",icon:faBoxOpen,use:["Student"],routerLink:'/packages'},
    {name:"Packages",icon:faBoxOpen,use:["Teacher"],routerLink:'/packages'},
    {name:"My School",icon:faSchool,use:["Student","Teacher"],routerLink:''},
  ];
  constructor(private _snackBar: MatSnackBar, private examService: ExamService,) { };

  ngOnInit(): void {
    // console.log(this.currentUser)
    this.getExams()
  };

  openSnackBarLogin(item: any){
    this._snackBar.open(`You must be signed in to access ${item}`,'close');
  };

  logout(){
    localStorage.removeItem('currentUser')
  };

  getExams = async()=>{
    await this.examService.readExams().subscribe((res: any)=>{   
      console.log(res)   
      var count=0
      for (let exam of res){
        count = count + (exam.studentCompleted.length - exam.studentCompleted.filter((obj: { score: any; })=>{return obj.score!==undefined}).length)
        // console.log(exam.studentCompleted.filter((obj: { score: any; })=>{return !obj.score}).length)
        // console.log(exam.studentCompleted.length)
        // console.log("COUNT:")
        // console.log(exam.studentCompleted.length - exam.studentCompleted.filter((obj: { score: any; })=>{obj.score!==undefined}).length)
      }
      this.examsToMark = JSON.stringify(count)
      // console.log(count)
      // return count
    })    
  }

}
