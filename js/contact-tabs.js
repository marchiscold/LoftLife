$('.address__nav-item').click(function () {
  $('.address__nav-item').not($(this)).removeClass('active');
  $(this).addClass('active');

  let tabid = '#tab-' + $(this).data('city');
  $('.address__tabs-item').not($(tabid)).removeClass('active');
  $(tabid).addClass('active');

  let mapid = '#map-' + $(this).data('city');
  $('.contact__map').not($(mapid)).removeClass('active');
  $(mapid).addClass('active');
});