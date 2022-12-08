import { CookieService } from 'ngx-cookie-service';
import { User } from './../../models/user.model';
import { SignupService } from './../services/signup.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  newUser: User = {
    email: '',
    password: ''
  };

  constructor(
    private signupService: SignupService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    if(this.cookieService.check('id') || this.cookieService.check('email')){
      this.router.navigate(['/dashboard']);
    }
  }

  addUser() {
    this.signupService.addUser(this.newUser).subscribe(
      data => {
        this.cookieService.set('id',`${data.userId}`);
        this.cookieService.set('email',`${data.email}`);
        this.router.navigate(['/dashboard']);
      }
    );
  }
}
