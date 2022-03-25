import {Injectable} from '@angular/core';
import {Note} from "./note";

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  constructor() {
  }

  notes: Note[] = [
    {title: 'Lernen', content: 'Für die Prüfung x am xx.xx.xxxx lernen', date: Date.now()},
    {title: 'Essen', content: 'Hähnchen mit Reis zubereiten', date: Date.now()},
    {title: 'Gym', content: 'Ins Gym mit den Jungs gehen', date: Date.now()},
  ]

  doRemoveNote(remove: Note): void {
    this.notes = this.notes.filter(note => note !== remove);
  }

  doCreateNote(title: String, content: String): Note {
    let result = {title: title, content: content, date: Date.now()};
    this.notes.push(result);
    return result;
  }
}
