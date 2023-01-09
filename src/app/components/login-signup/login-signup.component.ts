import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CloudinaryImage} from '@cloudinary/url-gen';
import {fill} from '@cloudinary/url-gen/actions/resize';
import { UsersService } from 'backend/services/user-services/users.service';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {

  teacherImage:any = "../../../assets/Teacher.png";
  studentImage:any = "../../../assets/Student.png";
  schoolImage:any = "../../../assets/School.png";
  countryList = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
  urlAddress: String = ""
  user:String=""
  myImage?: CloudinaryImage

  constructor(
    private router: Router,
    private userService:UsersService,    
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.urlAddress = this.router.url
    if (this.urlAddress.includes('student')){
      this.user = 'Student'
    } if (this.urlAddress.includes('teacher')){
      this.user = 'Teacher'
    }

    // this.myImage =  new CloudinaryImage('sample', {cloudName: 'dkny57jpp'}).resize(fill().width(100).height(150));
  }

  onSubmit(event: any){
    const newUser = {
      name:event.target.name.value,
      userType:this.user,
      nationality:event.target.name.value,
      email:event.target.email.value,
      statement:event.target.name.value,
      package:'Casual',
      hashedPassword:event.target.password.value,
      // profilePic:event.target.profilePic.value,
      profilePicture:'C:\\Users\\scott_w5fgszu\\OneDrive\\Coding\\Class-E-MEAN\\backend\\assets\\'+event.target.profilePic.files[0].name, //note, I'm using this right now because the multer middleware isn't working
      // profilePic:<File>event.target.profilePic.files[0],
    }
    // const fd = new FormData();
    // fd.append('profilePic',event.target.profilePic.value)
    console.log(newUser)
    this.userService.createUser(newUser).subscribe((res: any)=>{   
      console.log(res)
      if(res){
        if(res.userType ==='Student'){
          this._snackBar.open(`Thank you for joining, ${res.name}. Remember, your first class is free. But before you join you need to complete your free English Level Test. Click on 'My Exams' to get started.`,'close');
        } if(res.userType ==='Teacher'){
          this._snackBar.open(`Thank you for joining, ${res.name}. Click the My Classes tab to schedule your first lesson`,'close');
        }
          localStorage.setItem('currentUser',JSON.stringify(res))
        this.router.navigate(['/home'])
      } else{
        console.log('insert error handler here')
      }
    })
  }

}
