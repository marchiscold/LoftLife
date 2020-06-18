$('.ware-nav__item').click(function () {
  $('.ware-nav__item').not($(this)).removeClass('active');
  $(this).addClass('active');

  let tabid = $(this).data('tabid');
  $('.product__list').not($(tabid)).removeClass('active');
  $(tabid).addClass('active');
});
