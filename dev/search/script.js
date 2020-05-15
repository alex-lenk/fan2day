/*SEARCH*/
function declOfNum(n, titles) {
  return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]
}
$(document).ready(() => {

  const result = $('.js-result');
  const noresult = $('.js-no-res');
  const resultItem = $('.js-result-item');
  const items = $('.catalog-item').length;

  if (items === 0) {
    resultItem.text('Ничего не найдено');
    result.css('display', 'none');
    noresult.css('display', 'block');
  } else {
    resultItem.text(declOfNum(items, ['Найден', 'Найдено', 'Найдено']) +' '+items+' '+ declOfNum(items, ['товар', 'товара', 'товаров']));
  }

});
