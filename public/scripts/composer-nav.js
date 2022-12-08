$(document).ready(function() {
  // ----- mouse over animation -----
  $('#nav-right').mouseenter(
    function() {
      $('nav .fa-solid').css('animation', 'bounce 2s ease infinite');
    }
  );
  $('#nav-right').mouseleave(
    function() {
      $('nav .fa-solid').css('animation', 'none');
    }
  );

  // ----- form toggle -----
  $('#nav-right').click(function() {
    $('.new-tweet').css('display', 'block');
    $('#nav-right').click(function() {
      $('.new-tweet').toggle();
    });
  });
});