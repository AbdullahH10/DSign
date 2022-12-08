import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { userVerification } from './../../models/userVerification.model';
import { GetUserService } from './../services/get-user.service';
import { Component, OnInit } from '@angular/core';
import { UIMessage } from 'primeng/message';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  userVerification: userVerification = {
    email: '',
    password: ''
  }

  constructor(
    private getUserService: GetUserService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.cookieService.check('id')){
      this.router.navigate(['/dashboard']);
    }
  }

  verifyUser(passwordError: HTMLElement) {
    this.getUserService.verifyUser(this.userVerification).subscribe(
      data => {
        if(data == null) {
          passwordError.hidden = false
        }
        else {
          this.cookieService.set('id',`${data.userId}`);
          this.cookieService.set('email',`${data.email}`);
          this.router.navigate(['/dashboard']);
        }
      }
    )
  }
}
