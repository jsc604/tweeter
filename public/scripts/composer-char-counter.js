$(document).ready(function() {
  // --- our code goes here ---
  console.log('hello');
});

function charCount(textinput) {
  let length = textinput.value.length;
  $('#tweet-counter').text(140 - length);
};