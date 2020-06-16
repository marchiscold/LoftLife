$('a[href^="#"]').click(function (ev) {
  let target = $(this.hash);
  let headerHeight = $('.header').height();

  if (target.length) {
    ev.preventDefault();

    $('html, body').animate({
      scrollTop: target.offset().top - headerHeight - 15
    },
    200,
    'linear');
  }
});