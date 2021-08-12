import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from '@app/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  senha: string = '';

  constructor(
    private titleService: Title,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Login')
  }
  public login(): void {
    this.spinner.show();
    this.userService.authLogin(this.email, this.senha).subscribe(
    (user: any)  => {
      localStorage.setItem('id', user.id);
      this.router.navigate(['/'])
    },
    (err: Error) => { console.error(err) },
    () => {}
    ).add(() => this.spinner.hide());
  }

}
