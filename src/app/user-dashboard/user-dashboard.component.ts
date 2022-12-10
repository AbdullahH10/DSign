import { GetAllFileDetailsService } from './../services/get-all-file-details.service';
import { fileDetail } from './../../models/fileDetail.model';
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

  uploadedFileDetails: fileDetail[] = [];

  constructor(
    private getUserService: GetUserService,
    private fileDownloadService: FileDownloadService,
    private getFileDetailService: GetAllFileDetailsService,
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
    else {
      this.router.navigate(['/']);
    }

    this.getFileDetailService.getAllFileDetails().subscribe(
      data => {
        this.uploadedFileDetails = data;
      }
    );
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

  async onSuccess(event: any, uploader: any) {
    //window.location.reload();
  }

//   async onSelect(event: any) {
// debugger
//     if(event.currentFiles.length){
//       console.log('on file selection');
//     }
//   }

//   clearQueue(uploader: any) {
// debugger
//     if (!uploader._files.length) {
//       console.log('on file selection');
//     }
//   }

//   async onProgress(event: any) {
// debugger
//     console.log(event.progress);
//   }

  downloadFile(name: string) {
    window.open(`http://localhost:9191/image/fileSystem/${name}`, 'blank');
  }

  saveFile(data: BlobPart) {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
  }
  

}
