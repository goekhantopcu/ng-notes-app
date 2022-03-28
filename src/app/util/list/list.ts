export class List<E> {
  private inner: Array<E> = [];

  get = (idx: number) => this.inner[idx];
  removeValue = (value: E) => this.inner = this.inner.filter(innerValue => innerValue !== value);
  removeIndex = (idx: number) => this.inner = this.inner.filter((value, index) => idx !== index);
  filter = (predicate: (value: E, idx: number) => unknown) => {
    this.inner = this.inner.filter((value, index) => predicate(value, index));
  }
  forEach = (callback: (value: E, index: number) => void) => this.inner.forEach(callback);
}
