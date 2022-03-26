import {Component, OnDestroy, OnInit} from '@angular/core';
import {NoteService} from "../note.service";
import {Note} from "../note";
import {SearchService} from "../../navbar/search/search.service";
import {SearchCallback} from "../../navbar/search/search-callback";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit, OnDestroy {
  displayedNotes: Note[] = [];
  notesObservable: Observable<Note[]>;
  private callback = new NoteListComponent.NoteListSearchCallback(this);

  constructor(
    private noteService: NoteService,
    private searchService: SearchService,
    private router: Router) {
    this.notesObservable = noteService.doLoadNotes();
  }

  ngOnInit(): void {
    this.loadNotes();
    this.searchService.doRegisterSearchCallback(this.callback);
  }

  ngOnDestroy() {
    this.searchService.doUnregisterSearchCallback(this.callback);
  }

  doRemoveNote(note: Note) {
    this.noteService.doRemoveNote(note);
    this.loadNotes();
  }

  private loadNotes() {
    this.displayedNotes = this.noteService.notes;
  }

  static NoteListSearchCallback = class implements SearchCallback {
    constructor(private parent: NoteListComponent) {
    }

    doOnSearch(value: string): void {
      if (value.length == 0 || value.replace(" ", "").length == 0) {
        this.parent.loadNotes();
        return;
      }
      this.parent.displayedNotes = this.parent.displayedNotes.filter(note => this.doesMatch(value, note));
    }

    private doesMatch(value: string, note: Note): boolean {
      return note.title.toLowerCase().includes(value.toLowerCase()) ||
        note.content.toLowerCase().includes(value.toLowerCase());
    }
  }

  doOpenDetail(note: Note): Promise<boolean> {
    return this.router.navigateByUrl('/detail', {state: {note: note}})
  }
}
