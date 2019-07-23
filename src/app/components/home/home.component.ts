import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { Pet } from 'src/app/models/pet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;
  pets: Array<Pet>;

  constructor(private userService: UserService) {

    this.userService.getUser('adam').subscribe(
      u => {
        this.user = u;
        this.pets = this.user.pets;
      }
    );

  }

  ngOnInit() {
  }

}
