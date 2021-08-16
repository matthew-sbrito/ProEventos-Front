import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from '@app/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Login')
  }
  public login(): void {
    this.spinner.show();
    this.userService.authLogin(this.email, this.senha).subscribe(
    (resp: any)  => {
      console.log(resp);
      window.localStorage.setItem('token', resp.token);
      this.router.navigate(['/'])
      this.toastr.success('Login Realizado!', 'Bem vindo!');
    },
    (err: Error) => {
      console.error(err);
      this.toastr.error('Email ou senha invalidos!', 'Tente novamente!');
    },
    () => {}
    ).add(() => this.spinner.hide());
  }

}
