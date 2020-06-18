$.easing.easeOutQuint = function (x, t, b, c, d) {
  return c*((t=t/d-1)*t*t*t*t + 1) + b;
};

$('a[href^="#"]').click(function (ev) {
  if (this.hash == '#!') return;
  
  let target = $(this.hash);
  let headerHeight = $('.header').height();

  if (target.length) {
    ev.preventDefault();

    $('html, body').animate({
      scrollTop: target.offset().top - headerHeight - 15
    },
    800,
    'easeOutQuint');
  }
});