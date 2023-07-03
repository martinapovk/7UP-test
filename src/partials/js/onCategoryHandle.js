import BooksApiService from './BooksApiService';

import { renderCategoryName, renderBook } from './category';
import Notiflix from 'notiflix';

import {
  createTopBestSellersMarkup,
  accentSelectedTitle,
} from './all-categories';

const titleRef = document.querySelector('.title');
const bestSellersRef = document.querySelector('.best-sellers');
const api = new BooksApiService();

// const bestSellersRef = document.querySelector('.best-sellers');

export default function onCategoryHandle(e) {
  if (e.target.nodeName !== 'LI') {
    return;
  }

  accentSelectedTitle(e);

  // console.log(arrOfCategories);
  // console.log(e.currentTarget.children);
  // console.log(e.target.classList);

  if (e.target.dataset.categoryName === 'All categories') {
    bestSellersRef.classList.remove('one-category');

    createTopBestSellersMarkup()
      .then(markup => {
        bestSellersRef.innerHTML = markup;
      })
      .catch(e => {
        console.log(e.message);
        Notiflix.Report.failure('Error', `${error}`, 'OK');
      });
    return;
  }
  const categoryName = e.target.dataset.categoryName;
  // cvsdcs(categoryName);\
  createCategory(categoryName);

  // if (e.target.dataset.categoryName === 'Advice How-To and Miscellaneous') {
  // console.log('a');s
  //   bestSellersRef.innerHTML = 'aa';
  //   return;
  // }

  // api.getBooks(e.target.dataset.categoryName);
  // console.log(e.target.dataset.categoryName);
}

function createCategory(categoryName) {
  api
    .getBooks(categoryName)
    .then(value => {
      bestSellersRef.classList.add('one-category');
      // console.log(bestSellersRef.classList);

      value.map(value => (titleRef.innerHTML = renderCategoryName(value)));
      bestSellersRef.innerHTML = renderBook(value);
    })
    .catch(error => {
      console.log(error.message);
      Notiflix.Report.failure('Error', `${error}`, 'OK');
    });
}

export { createCategory };
