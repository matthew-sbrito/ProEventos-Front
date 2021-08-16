import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

@Injectable()
  // providedIn: 'root',
export class EmailService {
  private baseURL = 'https://localhost:5001/api/email/send/'

  constructor(private http: HttpClient) {}

  public sendEmailConfirm(email: string, eventoId: number): any {
    return this.http.post(`${this.baseURL}${eventoId}`,
      {'Email' : email })
      .pipe(take(1));
  };
}
