export default function onCategoryHandle(e) {
  if (e.target.nodeName !== 'LI') {
    return;
  }

  accentSelectedTitle(e);

  // console.log(arrOfCategories);
  // console.log(e.currentTarget.children);
  // console.log(e.target.classList);

  if (e.target.dataset.categoryName === 'All categories') {
    createTopBestSellersMarkup()
      .then(markup => {
        bestSellersRef.innerHTML = markup;
      })
      .catch(e => console.log(e));
    return;
  }

  // if (e.target.dataset.categoryName === 'Advice How-To and Miscellaneous') {
  // console.log('a');s
  //   bestSellersRef.innerHTML = 'aa';
  //   return;
  // }

  // api.getBooks(e.target.dataset.categoryName);
  // console.log(e.target.dataset.categoryName);
}
