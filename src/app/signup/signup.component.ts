import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  userId: number = 0;
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  firstName: string = '';
  lastName: string = '';
  phoneNumber: number = 0;
  organiztion?: string;
  designation?: string;
  profileImageLocation?: string;
  signatureImageLocation?: string;

  constructor() { }

  ngOnInit(): void {
  }

  print() {
    console.log(
      this.userId+' '+
      this.email+' '+
      this.password+' '+
      this.confirmPassword+' '+
      this.firstName+' '+
      this.lastName+' '+
      this.phoneNumber+' '+
      this.organiztion+' '
    )
  }
}
