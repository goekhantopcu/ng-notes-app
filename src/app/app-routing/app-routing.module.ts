import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {NoteListComponent} from "../note/note-list/note-list.component";
import {NoteCreateComponent} from "../note/note-create/note-create.component";
import {NoteDetailComponent} from "../note/note-detail/note-detail.component";

const routes: Routes = [
  {path: '', redirectTo: 'notes', pathMatch: 'full'},
  {path: 'notes', component: NoteListComponent},
  {path: 'create', component: NoteCreateComponent},
  {path: 'detail', component: NoteDetailComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
