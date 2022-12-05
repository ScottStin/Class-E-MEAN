import { Component, OnInit,Input } from '@angular/core';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { faPersonChalkboard } from '@fortawesome/free-solid-svg-icons';
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { faSchool } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faHouseLaptop } from '@fortawesome/free-solid-svg-icons';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faChalkboardUser } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() currentUser: any | undefined;
  @Input() activePage: string | undefined;
  faStar = faStar;

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
    {name:"Exam Marking",icon:faPenToSquare,use:["Teacher"],routerLink:''},
    {name:"My School",icon:faSchool,use:["Student","Teacher"],routerLink:''},
  ]
  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    console.log(this.currentUser)
  }

  openSnackBarLogin(item: any){
    this._snackBar.open(`You must be signed in to access ${item}`,'close');
  }

}
