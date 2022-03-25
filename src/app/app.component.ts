import {Component} from '@angular/core';
import {Note} from "./note";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-notes-app';

  titleControl = new FormControl();
  contentControl = new FormControl();

  notes: Note[] = [
    {title: 'Lernen', content: 'Für die Prüfung x am xx.xx.xxxx lernen', date: Date.now()},
    {title: 'Essen', content: 'Hähnchen mit Reis zubereiten', date: Date.now()},
    {title: 'Gym', content: 'Ins Gym mit den Jungs gehen', date: Date.now()},
  ]

  doRemoveNote(remove: Note) {
    this.notes = this.notes.filter(note => note.title !== remove.title);
  }

  doAddNote() {
    this.notes.push(
      {
        title: this.titleControl.value,
        content: this.contentControl.value,
        date: Date.now()
      }
    );
  }
}
