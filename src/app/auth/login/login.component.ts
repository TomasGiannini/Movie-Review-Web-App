import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css']
})

export class LoginComponent {
  isLoading = false;
  adminString = '@admin.com';
  adminEmail = '';

  constructor(public authService: AuthService, private http: HttpClient) {}

  adminURL = 'http://localhost:3000/api/admin/';

  onLogin(form: NgForm) {
    if (form.invalid) {
      return ;
    }
    const email = form.value.email;

    //get admin db
    this.http.get<{ email: string }>(this.adminURL + email)
    .subscribe(response => {
      this.adminEmail = response.email;
      console.log(this.adminEmail);
    });

    setTimeout(() => {
      // check if there is admin with this login
      if (this.adminEmail.length > 2) {
      // console.log(this.adminEmail);
      console.log('admin logn');
      // login as admin
      this.authService.loginAdmin(form.value.email, form.value.password);
      } else {
      console.log('user login');
      // login as user
      this.authService.login(form.value.email, form.value.password);
      }

    }, 3000);

  }
}
