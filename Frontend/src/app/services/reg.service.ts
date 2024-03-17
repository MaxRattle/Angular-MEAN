import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegistrationUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class RegService {
  constructor(private http: HttpClient) {}
  regUser(user: RegistrationUser) {
    this.http
      .post('http://localhost:3000/account/reg', user)
      .subscribe((reg: any) => {
        console.log('Reg successfully');
      });
  }
}
