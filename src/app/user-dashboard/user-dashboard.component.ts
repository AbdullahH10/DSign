import { GetUserService } from './../services/get-user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  user?: User;

  constructor(
    private getUserService: GetUserService,
    private cookieService: CookieService,
    private router: Router
  ) { }
  ngOnInit(): void {
    if(this.cookieService.check('id')){
      const id: number =+ this.cookieService.get('id');
      this.getUserService.getUser(id).subscribe(
        data => {
          this.user = data;
        }
      );
    }
  }

  signOut() {
    this.cookieService.deleteAll();
    this.router.navigate(['/']);
  }

}
