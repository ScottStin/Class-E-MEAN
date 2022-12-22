import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import{faClipboardCheck, faBook} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-new-package',
  templateUrl: './new-package.component.html',
  styleUrls: ['./new-package.component.css']
})
export class NewPackageComponent implements OnInit {

  packageForm: FormGroup = this.formBuilder.group({
    nameInput: "",
    descriptionInput: "",
    classTypes: [],
    paymentPlanInput:"",
    priceInput: "",
    requiredHoursInput: "",
    PTEClasses: "",
    IELTSClasses: "",
    generalEnglishClasses: "",
    cambridgeClasses:"",
    allClasses: "",
  });

  firstFormGroup: FormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  classTypes = ['General English', 'PTE Exam Prep', 'IELTS Exam Prep', 'Cambridge Exam Prep']
  packageTypes = ['General English', 'PTE Exam Prep', 'IELTS Exam Prep', 'Cambridge Exam Prep','Visa Packages','Tafe/Uni Packages']
  paymentTypes = ['Daily','Weekly','Monthly','Yearly','Casual','One-time payment']
  paymentTypeValue = ""
  unlimitedAllClassesChecked = false;
  unlimitedPTEClassesChecked = false;
  unlimitedIELTSClassesChecked = false;
  unlimitedCambridgeClassesChecked = false;
  unlimitedGeneralEnglishClassesChecked = false;
  faClipboardCheck = faClipboardCheck;
  faBook = faBook;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  paymentTypeSelect(value: any){
    console.log(value)
    this.paymentTypeValue = "/ "+value
  }

  unlimitedClasesToggle(formName:any){
    if(formName === 'generalEnglishClasses'){
      this.unlimitedGeneralEnglishClassesChecked = !this.unlimitedGeneralEnglishClassesChecked
    }
    if(formName === 'PTEClasses'){
      this.unlimitedPTEClassesChecked = !this.unlimitedPTEClassesChecked
    }
    if(formName === 'IELTSClasses'){
      this.unlimitedIELTSClassesChecked = !this.unlimitedIELTSClassesChecked
    }
    if(formName === 'cambridgeClasses'){
      this.unlimitedCambridgeClassesChecked = !this.unlimitedCambridgeClassesChecked
    }
    if(formName === 'allClasses'){
      this.unlimitedAllClassesChecked = !this.unlimitedAllClassesChecked
    }
    this.packageForm.get(formName)?.setValue("")
  }
}
