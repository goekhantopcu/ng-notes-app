import {Injectable} from '@angular/core';
import {SearchCallback} from "./search-callback";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private callbacks: SearchCallback[] = [];

  constructor() {
  }

  doCallSearchCallbacks(value: string): void {
    for(let callback of this.callbacks) {
      callback.doOnSearch(value);
    }
  }

  doRegisterSearchCallback(register: SearchCallback) {
    this.callbacks.push(register);
  }

  doUnregisterSearchCallback(unregister: SearchCallback) {
    this.callbacks = this.callbacks.filter(callback => callback !== unregister);
  }
}
