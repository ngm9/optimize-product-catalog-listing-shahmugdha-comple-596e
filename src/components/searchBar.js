export class SearchBar {
  constructor(inputElement, categoryElement, eventBus) {
    this.inputElement = inputElement;
    this.categoryElement = categoryElement;
    this.eventBus = eventBus;

    this.handleInput = this.handleInput.bind(this);

    this.inputElement.addEventListener('input', this.handleInput);
  }

  handleInput() {
    const category = this.categoryElement.value;
    const query = this.inputElement.value || '';
    this.eventBus.emit('search:changed', { category, query });
  }
}
