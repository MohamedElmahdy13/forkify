import View from './View.js';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `No recipes found for your query! Please try again ;)`;
  _sucsessMessage;
  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
/*
{
  "id": "5ed6604591c37cdc054bcd09",
  "title": "Cauliflower Pizza Crust (with BBQ Chicken Pizza)",
  "publisher": "Closet Cooking",
  "image": "http://forkify-api.herokuapp.com/images/BBQChickenPizzawithCauliflowerCrust5004699695624ce.jpg"
}
*/
