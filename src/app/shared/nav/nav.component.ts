import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isCollapsed = true;
  user?: any = {};
  id?: any;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.id = localStorage.getItem('id');
    this.userService.getUserById(this.id).subscribe(
      (user: any) => {
        this.user = user;
      },
      (err: Error) => {
        console.error(err);
        this.router.navigate(['/user/login']);
      },
      (): any => {
        if (!this.user) {
          this.router.navigate(['/user/login']);
        }
      }
    );
  }

  showMenu(): boolean {
    this.getUser();
    return (
      this.router.url !== '/user/login' &&
      this.router.url !== '/user/registration'
    );
  }
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/user/login']);
  }
}
