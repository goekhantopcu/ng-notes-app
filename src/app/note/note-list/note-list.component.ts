import {Component, OnDestroy, OnInit} from '@angular/core';
import {NoteService} from "../note.service";
import {Note} from "../note";
import {SearchService} from "../../navbar/search/search.service";
import {SearchCallback} from "../../navbar/search/search-callback";
import {Router} from "@angular/router";
import {LoadingState} from "./loading-state";

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit, OnDestroy {
  notes: Note[];
  state: LoadingState;
  callback;

  constructor(
    private noteService: NoteService,
    private searchService: SearchService,
    private router: Router) {
    this.notes = [];
    this.state = LoadingState.Loading;
    this.callback = new NoteListComponent.NoteListSearchCallback(this);
  }

  ngOnInit(): void {
    this.loadNotes();
    this.searchService.doRegisterSearchCallback(this.callback);
  }

  ngOnDestroy() {
    this.searchService.doUnregisterSearchCallback(this.callback);
  }

  loadNotes = async () => {
    this.state = LoadingState.Loading;
    try {
      this.notes = await this.noteService.loadNotes();
      this.state = LoadingState.Success;
    } catch (error) {
      console.error(error);
      this.state = LoadingState.Failed;
    }
  }
  isSuccess = () => this.state === LoadingState.Success;
  isLoading = () => this.state === LoadingState.Loading;
  isFailed = () => this.state === LoadingState.Failed;
  isEmpty = () => this.notes.length == 0;
  remove = (note: Note) => {
    this.noteService.doRemoveNote(note);
  };
  detail = async (note: Note) => this.router.navigateByUrl('/detail', {state: {note: note}});

  static NoteListSearchCallback = class implements SearchCallback {
    constructor(private parent: NoteListComponent) {
    }

    doOnSearch(value: string): void {
      let parent = this.parent;
      if (value.length == 0 || value.replace(" ", "").length == 0) {
        parent.loadNotes();
        return;
      }
      if (parent.notes) {
        parent.notes = parent.notes.filter(note => this.matches(value, note));
      }
    }

    private matches(value: string, note: Note): boolean {
      return note.title.toLowerCase().includes(value.toLowerCase()) ||
        note.content.toLowerCase().includes(value.toLowerCase());
    }
  }
}
