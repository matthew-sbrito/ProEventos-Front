import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/models/User';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()

export class UserService {

private baseURL = 'https://localhost:5001/user'

constructor(private http: HttpClient) {}

public getUsers(): Observable<User[]>{
  return this.http
  .get<User[]>(`${this.baseURL}`)
  .pipe(take(1));
};
public getUserById(userId: number): Observable<User>{
  return this.http
  .get<User>(`${this.baseURL}/${userId}`)
  .pipe(take(1));
};
public getUserByEmail(email: string): Observable<User>{
  return this.http
  .post<User>(`${this.baseURL}/email`, { email: email})
  .pipe(take(1));
};
public authLogin(email: string, senha: string): Observable<object>{
  return this.http
  .post<object>(`https://localhost:5001/authenticate/login`, {
    email: email,
    senha: senha
  })
  .pipe(take(1));
};
public getUserByToken(token: string): Observable<User>{
  return this.http
  .post<User>(`https://localhost:5001/authenticate/user`, {
    token: token,
  })
  .pipe(take(1));
};
public post(user: User): Observable<User>{
  return this.http
  .put<User>(`${this.baseURL}`, user)
  .pipe(take(1));
};
public put(userId: number, user: User): Observable<User>{
  return this.http
  .put<User>(`${this.baseURL}/${userId}`, user)
  .pipe(take(1));
};
public deleteUser(userId: number): Observable<User>{
  return this.http
  .delete<User>(`${this.baseURL}/${userId}`)
  .pipe(take(1));
};
}
