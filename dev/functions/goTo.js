
/*Функция плавного перехода*/
export function goTo(target) {
    let $html = $('html, body');
    $html.animate({scrollTop: target.offset().top - 60}, 500);
}