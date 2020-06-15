$('.address__nav-item').click(function () {
  $('.address__nav-item').not($(this)).removeClass('active');
  $(this).addClass('active');

  let tabid = $(this).data('tabid');
  $('.address__tabs-item').not($(tabid)).removeClass('active');
  $(tabid).addClass('active');
});