import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {
  @Output() cancelUploader = new EventEmitter();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  response: string;
  baseUrl = environment;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.initializeUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + '/users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      // allowedFileType: ['xls'],
      removeAfterUpload: true,
      autoUpload: false,

    });
  }

}
