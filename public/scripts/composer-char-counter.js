$(document).ready(function() {
  $('textarea').keyup(function() {
    let length = $(this).val().length;
    if (length > 140) {
      $('.counter').attr('id', 'over');
    } else {
      $('.counter').attr('id', 'under');
    }
    $('.counter').text(140 - length);
  });
});
