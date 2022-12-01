import { Component, OnInit,Input } from '@angular/core';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

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

  constructor() { }

  ngOnInit(): void {
  }

  getImageSource(){
      return this.allUsers.find((obj: { name: string; })=>obj.name === this.user.name).profilePicture
  }

}
