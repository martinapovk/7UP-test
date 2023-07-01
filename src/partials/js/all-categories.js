import BooksApiService from './BooksApiService';

const allCategoriesRef = document.querySelector('.all-categories-list');
const bestSellersRef = document.querySelector('.best-sellers');

const api = new BooksApiService();

allCategoriesRef.addEventListener('click', onCategoryHandle);

createCategoriesList();

function createCategoriesList() {
  api
    .getCategoriesList()
    .then(list => {
      const markup = list
        .map(
          listItem =>
            `<li class="all-categories-list__item" data-category-name="${listItem.list_name}">
          ${listItem.list_name}
          </li>`
        )
        .join('');
      allCategoriesRef.insertAdjacentHTML('beforeend', markup);
      // console.log(list);
    })
    .catch(err => console.log(err));
}

createTopBestSellersMarkup()
  .then(a => {
    bestSellersRef.innerHTML = a;
  })
  .catch(e => console.log(e));

function onCategoryHandle(e) {
  // console.log(e.target.dataset.categoryName);
  if (e.target.dataset.categoryName === 'All categories') {
    createTopBestSellersMarkup()
      .then(markup => {
        bestSellersRef.innerHTML = markup;
      })
      .catch(e => console.log(e));
    return;
  }

  // api.getBooks(e.target.dataset.categoryName);
  // console.log(e.target.dataset.categoryName);
}

async function createTopBestSellersMarkup() {
  let markup = await api.getTopBooks().then(categotiesTop => {
    return categotiesTop
      .map(
        categoryTop => `<li class="best-sellers-category">
        <p class="category-title">${categoryTop.list_name}</p>
        <ul class="best-sellers__by-category">
      ${categoryTop.books
        .map(
          book => `<li class="best-sellers-book__by-category"  data-book-id="${book._id}">
       <img class="best-sellers-book__img" src="${book.book_image}" alt="${book.title}" />
       <p class="best-sellers-book__title">${book.title}</p>
       <p class="best-sellers-book__author">${book.author}</p>
       </li> `
        )
        .join('')}
        </ul>
        <button type="button" class="best-sellers__btn-see-more">see more</button>
        </li>`
      )
      .join('');
  });

  return markup;
}