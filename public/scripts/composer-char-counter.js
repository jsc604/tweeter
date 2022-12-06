$(document).ready(function() {
  // --- our code goes here ---
  console.log('hello');
});

function charCount(textinput) {
  let length = textinput.value.length;
  if (length > 140) {
    $('#tweet-counter').css('color', 'red');
  } else {
    $('#tweet-counter').css('color', '#545149')
  }
  $('#tweet-counter').text(140 - length);
};