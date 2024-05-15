import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PreviewVeiw extends View {
  _parentElement = '';

  _generateMarkup() {
    const id = window.location.hash.slice(1);

    return `
      <li class="preview">
      <a class="preview__link ${
        id === this._data.id ? 'preview__link--active' : ''
      }" href="#${this._data.id}">
        <figure class="preview__fig">
          <img src="${this._data.image}" alt="Test" />
        </figure>
        <div class="preview__this._data">
          <h4 class="preview__title">${this._data.title} ...</h4>
          <p class="preview__publisher">${this._data.publisher}</p>

        </div>
        <div class="preview__user-generated ${this._data.key ? '' : 'hidden'}">
        <svg>
          <use href="${icons}#icon-user"></use>
          </svg>
        </div>
      </a>
    </li>
`;
  }
}

export default new PreviewVeiw();
/*
{
  "id": "5ed6604591c37cdc054bcd09",
  "title": "Cauliflower Pizza Crust (with BBQ Chicken Pizza)",
  "publisher": "Closet Cooking",
  "image": "http://forkify-api.herokuapp.com/images/BBQChickenPizzawithCauliflowerCrust5004699695624ce.jpg"
}
*/
