import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {NoteService} from "../note.service";

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.css']
})
export class NoteCreateComponent implements OnInit {

  constructor(private noteService: NoteService) {
  }

  titleControl = new FormControl();
  contentControl = new FormControl();

  ngOnInit(): void {
  }

  doSubmit(): void {
    this.noteService.doCreateNote(this.titleControl.value, this.contentControl.value);
    this.titleControl.reset('');
    this.contentControl.reset('');
  }
}
