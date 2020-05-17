// tabs https://codepen.io/rafaelavlucas/pen/MLKGba?editors=1010

let js__tabNav = document.querySelectorAll(".js__tab-nav"),
  js__tabPanel = document.querySelectorAll(".js__tab-panel");


/* Функция для передачи класса навигации ТАБов (TABs in TABs) */
function fnTabLinks(elClass) {
  elClass.forEach(function (el) {
    el.classList.remove("active");
  });
}


/* Функция для передачи класса контента ТАБов (TABs in TABs) */
function fnTabPane(elClass) {
  elClass.forEach(function (el) {
    el.classList.remove("active");
  });
}


js__tabNav.forEach(function (el) {
  el.addEventListener("click", openTabs);
});


function openTabs(el) {
  let btnTarget = el.currentTarget,
    idTab = btnTarget.dataset.tab;

  fnTabPane(js__tabPanel);

  fnTabLinks(js__tabNav);

  document.querySelector("#" + idTab).classList.add("active");

  btnTarget.classList.add("active");
}



/*
* Данные используются только для внутренних ТАБов и используются только на мобильном меню
*/

let js__tabItem = document.querySelectorAll(".js__tab-item"),
  js__tabBox = document.querySelectorAll(".js__tab-box");

js__tabItem.forEach(function (el) {
  el.addEventListener("click", openInTabs);
});

function openInTabs(el) {
  let btnTarget = el.currentTarget,
    idTab = btnTarget.dataset.tab;

  fnTabLinks(js__tabItem);

  fnTabPane(js__tabBox);

  document.querySelector("#" + idTab).classList.add("active");

  btnTarget.classList.add("active");
}
