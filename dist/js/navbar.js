$('.header__hamburger').click(function () {
  $(this).toggleClass('active');
  $('.top-nav').toggleClass('active');
});

$(document).click(function (ev) {
  if (ev.target.closest('.header__hamburger') != null) {
    return;
  }

  if ($('.top-nav').hasClass('active')) {
    $('.top-nav').removeClass('active');
    $('.header__hamburger').removeClass('active');
  }

});