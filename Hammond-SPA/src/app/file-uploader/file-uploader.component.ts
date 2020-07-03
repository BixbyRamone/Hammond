import { Component, OnInit, Output, EventEmitter, Input, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from '../_services/auth.service';
import { UpFile } from '../_models/uploapd_file';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {
  @Input() roleToReg: string;
  @Output() cancelUploader = new EventEmitter();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  response: string;
  baseUrl = environment.apiUrl;

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.initializeUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
    console.log('OVER DROP ZONE');
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'auth/registerxls/'
       + this.authService.decodedToken.nameid + '/' + this.roleToReg,
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['xls'],
      removeAfterUpload: true,
      autoUpload: false,

    });
    console.log('THIS.UPLOADER');
    console.log(this.uploader);
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      console.log('FILE ADDED');
    };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        this.alertify.success('File Successfully Uploaded');
        const res: UpFile = JSON.parse(response);
      }
      this.alertify.success('File Successfully Uploaded');
    };
  }

  backup() {
    this.cancelUploader.emit(false);
  }

}
