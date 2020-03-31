import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from '../_services/auth.service';
import { UpFile } from '../_models/uploapd_file';

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
      url: 'http://localhost:5000/api/auth/registerxls/' + this.authService.decodedToken.nameid,
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      // allowedFileType: ['xls'],
      removeAfterUpload: true,
      autoUpload: false,

    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: UpFile = JSON.parse(response);
      }
    };
  }

  test() {
    debugger
    this.authService.test(this.authService.decodedToken.nameid, this.uploader).subscribe(() => {
      console.log('Success');
    }, error => {
      console.log(error);
    });
  }

  backup() {
    this.cancelUploader.emit(false);
  }

}