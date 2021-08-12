import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user?: any;
  id?: any;
  constructor(private titleService: Title, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.titleService.setTitle('Dashboard');
    this.user = this.getUser();
  }

  getUser(): any {
    this.id = localStorage.getItem('id');
    this.userService.getUserById(this.id).subscribe(
      (user: any) => {
        this.user = user;
      },
      (err: Error) => {
        console.error(err);
      },
      (): any => {}
    );
  }
}
