$(window).on('scroll', function () {
  let $headerBody = $('.header__body');

  if (document.documentElement.scrollTop > 0) {
    $headerBody.addClass('header__body_scrolled');
  } else {
    $headerBody.removeClass('header__body_scrolled');
  }
});