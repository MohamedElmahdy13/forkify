import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.page;
      handler(goToPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(curPage);

    // page 1 and there are other pages
    if (curPage === 1 && numPages > 1)
      return this._paginationBtns('next', curPage);

    // last page
    if (curPage === numPages && numPages > 1)
      return this._paginationBtns('prev', curPage);
    // other page
    if (curPage < numPages)
      return `${this._paginationBtns('prev', curPage)} ${this._paginationBtns(
        'next',
        curPage
      )}`;

    // page1 and there is no other pages

    return ``;
  }

  _paginationBtns(type, curPage) {
    curPage = type === 'prev' ? curPage - 1 : curPage + 1;
    return `
          <button data-page="${curPage}" class="btn--inline pagination__btn--${type}">
          ${
            type === 'prev'
              ? `<svg class="search__icon">
                 <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage}</span>`
              : `<span>Page ${curPage}</span>
                  <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>`
          }
        </button>`;
  }
}

export default new PaginationView();
