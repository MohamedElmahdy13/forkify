import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';
import paginationView from './view/paginationView';
import bookmarksView from './view/bookmarksView.js';
import addRecipeView from './view/addRecipeView.js';
import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config';

if (module.hot) {
  module.hot.accept();
}

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1) Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 2) Loading recipe
    await model.loadRecipe(id);

    // 3) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

// controlRecipes();
// hashchange only will be trigger when the hashchanged only so incase you copy the url and open it in another tab the event will not be triggered so we need to add load event to do that
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // get search query
    const query = searchView.getQuery();
    if (!query) return;
    // console.log(query);
    // load search results
    await model.loadSearchResults(query);

    // resultsView.render(model.state.search.results);
    // render results
    resultsView.render(model.getSearchResultsPage());
    // render intial pagination btns
    paginationView.render(model.state.search);
  } catch (error) {
    resultsView.renderError();
    throw error;
  }
};
const controlPagination = function (goToPage) {
  // render new page results
  resultsView.render(model.getSearchResultsPage(goToPage));
  // render new btns
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings in state
  model.updateServings(newServings);
  // Update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add/remove bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // Update recipie view
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    await model.uploadRecipe(newRecipe);
    addRecipeView.sucessMessage();

    // render recipe
    recipeView.render(model.state.recipe);
    // console.log(model.state.recipe);

    // render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // change id in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // close modal window
    setTimeout(function () {
      addRecipeView.toggleWindow();
      // location.reload();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    // console.error(error + '!!!!!!!!!!');
    addRecipeView.renderError(error.message);
  }

  // Upload recipe data
};
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addBookmarkHandler(controlAddBookmark);
  searchView.addSearchHandler(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
