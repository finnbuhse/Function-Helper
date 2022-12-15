import { Component, Input, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'fileUpload',
  templateUrl: './fileUpload.component.html',
  styleUrls: ['../../../styles.css']
})
export class FileUploadComponent {
  filename = "";

  constructor()
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