import {Component, OnInit} from '@angular/core';
import {Note} from "../note";
import {Router} from "@angular/router";
import {NoteService} from "../note.service";

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {
  note: Note | undefined;

  constructor(
    private noteService: NoteService,
    private router: Router) {
    this.note = this.router.getCurrentNavigation()?.extras?.state?.['note'];
  }

  ngOnInit(): void {
  }

  hasData(): boolean {
    return this.note != null;
  }

  doRemoveNote() {
    if (!this.hasData()) {
      return;
    }
    this.noteService.doRemoveNote(this.note!);
    this.router.navigateByUrl('/notes');
  }

  doCancel(): Promise<boolean> {
    return this.router.navigateByUrl('/');
  }

  doEdit(): Promise<boolean> {
    return this.router.navigateByUrl('/create', {state: {note: this.note}})
  }
}
