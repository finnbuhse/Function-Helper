import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './appStyle.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;
}
