import View from './View.js';

class SearchView extends View {
  _parentElement = document.querySelector('.search');

  getQuery() {
    const query = this._parentElement
      .querySelector('.search__field')
      .value.trim();
    this.clearInput();
    return query;
  }

  addSearchHandler(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }
}

export default new SearchView();
