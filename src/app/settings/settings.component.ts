import { UpdateUserService } from './../services/update-user.service';
import { Router } from '@angular/router';
import { GetUserService } from './../services/get-user.service';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  userInfo: User = {
    email: '',
    password: ''
  };

  emailFieldStatus: boolean = true;
  passwordFieldStatus: boolean = true;
  firstnameFieldStatus: boolean = true;
  lastnameFieldStatus: boolean = true;
  phonenumberFieldStatus: boolean = true;
  organizationFieldStatus: boolean = true;
  designationFieldStatus: boolean = true;

  constructor(
    private cookieService: CookieService,
    private getUserService: GetUserService,
    private updateUserService: UpdateUserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.cookieService.check('id')){
      const id: number =+ this.cookieService.get('id');
      this.getUserService.getUser(id).subscribe(
        data => {
          this.userInfo = data;
        }
      );
    }
    else {
      this.router.navigate(['/']);
    }
  }

  editEmail() {
    this.emailFieldStatus = false;
  }

  editPassword() {
    this.passwordFieldStatus = false;
  }

  editFirstname() {
    this.firstnameFieldStatus = false;
  }

  editLastname() {
    this.lastnameFieldStatus = false;
  }

  editPhonenumber() {
    this.phonenumberFieldStatus = false;
  }

  editOrganization() {
    this.organizationFieldStatus = false;
  }

  editDesignation() {
    this.designationFieldStatus = false;
  }

  updateUser() {
    this.updateUserService.updateUser(this.userInfo,this.userInfo.userid!).subscribe(
      data => {

      }
    )
    window.location.reload();
  }

}
