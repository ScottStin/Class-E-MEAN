import { Component, OnInit,Input } from '@angular/core';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from 'backend/services/user-services/users.service';
import { GeneralDialogComponent } from '../general-dialog/general-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() currentUser: any | undefined;
  @Input() user: any | undefined;
  @Input() allUsers: any | undefined;

  faEarthAmericas = faEarthAmericas
  faAt=faAt
  faStar=faStar

  constructor(
    private userService: UsersService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  getImageSource(){
      return this.allUsers.find((obj: { name: string; })=>obj.name === this.user.name).profilePicture.url
  }

  setStudentLevel(user:any){
    const dialogRef = this.dialog.open(GeneralDialogComponent,{
      width: '530px',
      data: 
        {
          header: 'Set student level',
          body: "Once a student's level has been set they'll be able to start joining live classes",
          // icon: "faRightToBracket",
          inputFormValues:['A1 Beginner','A2 Lower-Intermediate','B1 Intermediate','B2 Upper-Intermediate','C1 Advanced','C2 Native'],
          inputFormType:'radio',
          rightButton:'Set',
          leftButton: 'Cancel',
          // routerLink:''
        },
    });
    
    dialogRef.afterClosed().subscribe(async result => {
      console.log(`Dialog result: ${result}`);
      if(result){
        await this.userService.setUserLevel(user._id,result).subscribe((res: any)=>{     
          console.log(res) 
          // if(res){
          //   this.refreshData.emit({update:true})
          //   this._snackBar.open(`Lesson deleted`,'close');   
          // } else{
          //   this._snackBar.open(`Woops, something went wrong.`,'close'); 
          // }            
        })
      }      
    });
  }

  async deleteUser(user:any){
    console.log(user._id)
    // const dialogRef = this.dialog.open(GeneralDialogComponent,{
    //   width: '530px',
    //   data: {
    //     header: 'Are you sure you want to delete this lesson?',
    //     body: 'All students currently enrolled will be notified via email and refunded.',
    //     rightButton:'Delete class',
    //     leftButton: 'Return',
    //     // routerLink:'/exams'
    //   },
    // });
    
    // dialogRef.afterClosed().subscribe(async result => {
    //   console.log(`Dialog result: ${result}`);
    //   if(result){
        await this.userService.deleteUsers(user._id).subscribe((res: any)=>{     
          console.log(res) 
          // if(res){
          //   this.refreshData.emit({update:true})
          //   this._snackBar.open(`Lesson deleted`,'close');   
          // } else{
          //   this._snackBar.open(`Woops, something went wrong.`,'close'); 
          // }            
        })
    //   }
    // });   
  }

}
