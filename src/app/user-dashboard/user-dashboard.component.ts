import { FileDownloadService } from './../services/file-download.service';
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
  createWorkflowDialog: boolean = false;

  workflowOpened: boolean = false;
  openedWorkflowTitle: string = '';
  workflowTitle: string = '';

  workflows: workflow[] = [];

  documentSignSteps: MenuItem[] = [];
  activeStep: number = 0;

  uploadedFileName: string[] = [];

  constructor(
    private getUserService: GetUserService,
    private fileDownloadService: FileDownloadService,
    private cookieService: CookieService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.documentSignSteps = [
      {
        label: 'Upload',
        routerLink: ['/upload/:wid'],
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
    this.router.navigate(['/signin']);
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }

  nameWorkflow() {
    this.createWorkflowDialog = true;
  }

  createWorkflow() {
    const workflow: workflow = {
      workflow_id: 0,
      title: this.workflowTitle
    }
    this.workflows.push(workflow);
    this.workflowTitle = '';
    this.createWorkflowDialog = false;
  }

  openWorkflow(workflow: workflow, index: number) {
    this.workflowOpened = true;
    this.openedWorkflowTitle = workflow.title;
    this.router.navigate([`/dashboard/upload/${index}`]);
  }

  onUploadEnd(event: { file: { name: string; }; }) {
    console.log(event.file.name);
    this.uploadedFileName.push(event.file.name);
    window.location.reload();
  }

  downloadFile(name: string) {
    this.fileDownloadService.downloadFile(name);
  }

}
