import { Component, OnInit } from '@angular/core';
import { User } from '@app/models/User';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user?: User;
  token: string = '';

  constructor(private userService: UserService) {
  }

  async ngOnInit(): Promise<void> {
    this.user = await this.getUser();
  }

  getUser(): Promise<User> {
    this.token = window.localStorage.getItem('token') ?? '';
    return new Promise((resolve) => {
      this.userService.getUserByToken(this.token).subscribe(
        user  => resolve(user),
        error => console.error(error)
      );
    });
  }
}
