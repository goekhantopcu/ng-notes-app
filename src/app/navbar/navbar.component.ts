import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SearchService} from "./search/search.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  control: FormControl = new FormControl();

  constructor(
    private router: Router,
    private searchService: SearchService) {
  }

  ngOnInit(): void {
  }

  isNotesPage(): boolean {
    return this.router.url === '/notes';
  }

  isCreatePage(): boolean {
    return this.router.url === '/create';
  }

  doDelegateSearchValue(): void {
    this.searchService.doCallSearchCallbacks(this.control.value);
  }
}
