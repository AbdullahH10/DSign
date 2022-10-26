import { MenuItem } from 'primeng/api';
import { workflow } from './../../models/workflow.model';
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
  workflowTitleDialog: boolean = false;

  workflowOpened: boolean = false;
  openedWorkflowTitle: string = '';

  workflows: workflow[] = [];

  documentSignSteps: MenuItem[] = [];
  activeStep: number = 0;

  constructor(
    private getUserService: GetUserService,
    private cookieService: CookieService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.documentSignSteps = [
      {
        label: 'Upload',
        routerLink: '/upload'
      },
      {
        label: 'Add members',
      },
      {
        label: 'Send document'
      }
    ];

    if(this.cookieService.check('id')){
      const id: number =+ this.cookieService.get('id');
      this.getUserService.getUser(id).subscribe(
        data => {
          this.user = data;
        }
      );
    }
    else {
      this.router.navigate(['/']);
    }
  }

  signOut() {
    this.cookieService.deleteAll();
    this.router.navigate(['/']);
  }

  nameWorkflow() {
    this.workflowTitleDialog = true;
  }

  createWorkflow(workflowTitle: string) {
    const workflow: workflow = {
      workflow_id: 0,
      title: workflowTitle
    }
    this.workflows.push(workflow);
    this.workflowTitleDialog = false;
  }

  openWorkflow(workflow: workflow) {
    this.workflowOpened = true;
    this.openedWorkflowTitle = workflow.title;
  }

}
