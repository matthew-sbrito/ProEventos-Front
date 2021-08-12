import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/models/User';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  authenticateUser?: User;
  id: any;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  
}
