import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {NoteService} from "../note.service";
import {Note} from "../note";
import {Router} from "@angular/router";

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.css']
})
export class NoteCreateComponent implements OnInit {
  note: Note | null;
  titleControl = new FormControl();
  contentControl = new FormControl();

  constructor(private noteService: NoteService,
              private router: Router) {
    this.note = this.router.getCurrentNavigation()?.extras?.state?.['note'];
  }

  ngOnInit(): void {
    if(this.note) {
      this.titleControl.setValue(this.note!.title);
      this.contentControl.setValue(this.note!.content);
    }
  }

  doSubmit(): void {
    this.noteService.doCreateNote(this.titleControl.value, this.contentControl.value);
    this.titleControl.reset('');
    this.contentControl.reset('');
  }
}
