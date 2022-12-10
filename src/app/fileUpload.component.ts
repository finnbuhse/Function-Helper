import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { FirebaseService } from './firebaseService';

@Component({
  selector: 'fileUpload',
  templateUrl: './fileUpload.component.html',
  styleUrls: ['./appStyle.css']
})
export class FileUploadComponent {
  filename = "";

  constructor(private store: FirebaseService)
  {
  }

  onFileSelected(event) {

    const file:File = event.target.files[0];
    if (file) {
      this.filename = file.name;

      const formData = new FormData();

      formData.append("thumbnail", file);

      console.log(this.filename);

      
    }
  }
}