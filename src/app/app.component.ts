import { Component, VERSION } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './appStyle.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;

  constructor (private store: AngularFirestore)
  {

  }
}
