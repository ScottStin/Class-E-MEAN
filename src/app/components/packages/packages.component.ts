import { Component, OnInit, ViewChild,Input } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewPackageComponent } from '../new-package/new-package.component';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {

  @Input() currentUser: any | undefined;
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  

  packages:Array<any>=[
    {name:"Casual",description:"A pay-as-you-go plan where you only pay for the classes, courses and exams when you use them. Simply click on the class, course or exam you want to join and you'll be charged the listed price.",studentsEnrolled:['danielAng@gmail.com.es','test2'],paymentType:"",costAUD:"",requiredHours:null,maxLength:null,classes:[{type1:1,type2:0,type3:0,type4:0}],courses:["generalEnglish"],exams:[]},
    {name:"General English Basic",description:"Improve your general English (vocab, grammar, speaking, conversational skills, reading, writing and listening) with a mix of live classes and self-guided study. This packages includes 1 live general English class per week with a native teacher, as well as unlimited access to our online course",studentsEnrolled:[],paymentType:"weekly",costAUD:"50",requiredHours:null,maxLength:null,classes:[{type1:1,type2:0,type3:0,type4:0}],courses:["generalEnglish"],exams:[]},
    {name:"General English Pro",description:"An intensive course that inclides 3 live classes per week to improve your general English (vocab, grammar, speaking, conversational skills, reading, writing and listening) and unlimited self-guided study",studentsEnrolled:[],paymentType:"weekly",costAUD:"75",requiredHours:null,maxLength:null,classes:[{type1:3,type2:0,type3:0,type4:0}],courses:["generalEnglish"],exams:[]},
    {name:"General English Unlimited",description:"Unlimited access to our general live English classes and online study material. Join as many class as you'd like, any time, any day. All classes are taught by a fully qualified native English teacher",studentsEnrolled:[],paymentType:"weekly",costAUD:"99",requiredHours:null,maxLength:null,classes:[{type1:336,type2:0,type3:0,type4:0}],courses:["generalEnglish"],exams:[]},
    {name:"Quick PTE Exam Prep",description:"One-time access to three PTE exam prep classes plus 2 fully marked practice exams and a short self-guided exam prep course to get you exam ready a few weeks before the important date",studentsEnrolled:[],paymentType:"total",costAUD:"160",requiredHours:null,maxLength:null,classes:[{type1:0,type2:3,type3:0,type4:0}],courses:["PTE-1"],exams:["PTE-ShortExam-1","PTE-ShortExam-2","PTE-Long-2"]},
    {name:"PTE Basic Exam Prep",description:"Unlimited access to our self-guided PTE study course with heaps of pactice questions, explination videos, tips and tricks, as well as one free live PTE class each week and several practice exams.",studentsEnrolled:[],paymentType:"weekly",costAUD:"60",requiredHours:null,maxLength:null,classes:[{type1:0,type2:3,type3:0,type4:0}],courses:["PTE-1"],exams:["PTE-ShortExam-1","PTE-ShortExam-2","PTE-Long-2"]},
    {name:"PTE Pro Exam Prep",description:"Unlimited access to all PTE live classes, exams, courses and content",studentsEnrolled:[],paymentType:"total",costAUD:"160",requiredHours:null,maxLength:null,classes:[{type1:0,type2:3,type3:0,type4:0}],courses:["PTE-1"],exams:["PTE-ShortExam-1","PTE-ShortExam-2","PTE-Long-2"]},
    {name:"Quick IELTS Exam Prep",description:"One-time access to three PTE exam prep classes plus 2 fully marked practice exams and a short self-guided exam prep course to get you exam ready a few weeks before the important date",studentsEnrolled:[],paymentType:"total",costAUD:"160",requiredHours:null,maxLength:null,classes:[{type1:0,type2:3,type3:0,type4:0}],courses:["PTE-1"],exams:["PTE-ShortExam-1","PTE-ShortExam-2","PTE-Long-2"]},
    {name:"IELTS Basic Exam Prep",description:"Unlimited access to our self-guided study course with heaps of pactice questions, explination videos, tips and tricks, as well as one free live class each week and several practice exams.",studentsEnrolled:[],paymentType:"weekly",costAUD:"60",requiredHours:null,maxLength:null,classes:[{type1:0,type2:3,type3:0,type4:0}],courses:["PTE-1"],exams:["PTE-ShortExam-1","PTE-ShortExam-2","PTE-Long-2"]},
    {name:"IELTS Pro Exam Prep",description:"Unlimited access to all live classes, exams, courses and content",studentsEnrolled:[],paymentType:"total",costAUD:"160",requiredHours:null,maxLength:null,classes:[{type1:0,type2:3,type3:0,type4:0}],courses:["PTE-1"],exams:["PTE-ShortExam-1","PTE-ShortExam-2","PTE-Long-2"]},
    {name:"Quick Cambridge Exam Prep",description:"One-time access to three exam prep classes plus 2 fully marked practice exams and a short self-guided exam prep course to get you exam ready a few weeks before the important date",studentsEnrolled:[],paymentType:"total",costAUD:"160",requiredHours:null,maxLength:null,classes:[{type1:0,type2:3,type3:0,type4:0}],courses:["PTE-1"],exams:["PTE-ShortExam-1","PTE-ShortExam-2","PTE-Long-2"]},
    {name:"Cambridge Basic Exam Prep",description:"Unlimited access to our self-guided study course with heaps of pactice questions, explination videos, tips and tricks, as well as one free live class each week and several practice exams.",studentsEnrolled:[],paymentType:"weekly",costAUD:"60",requiredHours:null,maxLength:null,classes:[{type1:0,type2:3,type3:0,type4:0}],courses:["PTE-1"],exams:["PTE-ShortExam-1","PTE-ShortExam-2","PTE-Long-2"]},
    {name:"Cambridge Pro Exam Prep",description:"Unlimited access to all live classes, exams, courses and content",studentsEnrolled:[],paymentType:"total",costAUD:"160",requiredHours:null,maxLength:null,classes:[{type1:0,type2:3,type3:0,type4:0}],courses:["PTE-1"],exams:["PTE-ShortExam-1","PTE-ShortExam-2","PTE-Long-2"]},
    {name:"Combination Package - Basic",description:"1 live general English class per week to improve your vocab, grammar, reading, writing, speaking and listening, and 1 exam prep class per week to prepare for your exam, plus access to our online self guided study material and exams",studentsEnrolled:[],paymentType:"weekly",costAUD:"60",requiredHours:null,maxLength:null,classes:[{type1:0,type2:3,type3:0,type4:0}],courses:["PTE-1"],exams:["PTE-ShortExam-1","PTE-ShortExam-2","PTE-Long-2"]},
    {name:"Combination Package - Pro",description:"Unlimited access to all live classes, exams, courses and content for both general English and exam prep.",studentsEnrolled:[],paymentType:"weekly",costAUD:"190",requiredHours:null,maxLength:null,classes:[{type1:0,type2:3,type3:0,type4:0}],courses:["PTE-1"],exams:["PTE-ShortExam-1","PTE-ShortExam-2","PTE-Long-2"]},
    {name:"Australian VISA Migration Package",description:"20 hours a week of live classes and course material to meet the requirements of the Australian study visa.",studentsEnrolled:[],paymentType:"monthly",costAUD:"999",requiredHours:null,maxLength:null,classes:[{type1:336,type2:336,type3:336,type4:336}],courses:["PTE-1"],exams:["PTE-ShortExam-1","PTE-ShortExam-2","PTE-Long-2"]},
    {name:"QLD Tafe and Uni Entry Pathway",description:"Meet the study requirements to gain entry to a university or TAFE course",studentsEnrolled:[],paymentType:"monthly",costAUD:"999",requiredHours:null,maxLength:null,classes:[{type1:336,type2:336,type3:336,type4:336}],courses:["PTE-1"],exams:["PTE-ShortExam-1","PTE-ShortExam-2","PTE-Long-2"]}
  ]

  classTypes = ['General English', 'PTE Exam Prep', 'IELTS Exam Prep', 'Cambridge Exam Prep','Visa Packages']
  paymentTypes = ['Weekly','Monthly','Yearly','Casual','One-time payment']


  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    console.log(this.currentUser)
  }

  openNewPackageDialog(){ 
    const dialogRef = this.dialog.open(NewPackageComponent,{
      width: '2000px',
      data: {
        header: 'Create New Package',
        // body: '',
        rightButton:'Create',
        leftButton: 'Cancel',
        // routerLink:''
      }
    });  
    dialogRef.afterClosed().subscribe(async result => {
      console.log(result);     
      if(result){
       console.log(result)
      }     
    });
  }

}
