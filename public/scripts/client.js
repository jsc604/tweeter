/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweet) {
  let name = tweet.user.name;
  let avatar = tweet.user.avatars;
  let handle = tweet.user.handle;
  let content = tweet.content.text;
  let timeStamp = tweet.created_at;
  let timeFormat = timeago.format(timeStamp);

  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  let $tweet = $(`
<div class="single-tweet">
<header>
  <div class="posted-tweet-avatar">
    <img src=${escape(avatar)} id="posted-avatar">
    <div class="posted-tweet-name">${name}</div>
  </div>
  <div class="handle">
    ${escape(handle)}
  </div>
</header>

<article>
  <p>${escape(content)}</p>
</article>

<footer>
  <div>
    <p>${escape(timeFormat)}</p>
  </div>
  <div>
    <i class="fa-solid fa-flag"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-solid fa-heart"></i>
  </div>
</footer>
</div>
`);

  return $tweet;
};

const renderTweets = function(tweets) {
  $('.posted-tweets').empty();
  for (let data of tweets) {
    const $tweet = createTweetElement(data);
    $('.posted-tweets').prepend($tweet);
  }
};

$(document).ready(function() {

  const loadTweets = function() {
    $.ajax('/tweets/', { method: 'GET'})
      .then((data) => {
        renderTweets(data);
      });
  };

  loadTweets();
  

  $('form').on('submit', function(event) {
    event.preventDefault();
    let data = $(this).serialize();
    let length = $('textarea').val().length;

    if (length > 140) {
      $('#error-msg1').css('display', 'flex');
    } else if (length <= 0) {
      $('#error-msg2').css('display', 'flex');
    } else {
      $('#error-msg1').css('display', 'none');
      $('#error-msg2').css('display', 'none');
      $.ajax({
        method: 'POST',
        url: '/tweets/',
        data: data,
      })
        .then(() => {
          loadTweets();
          $('textarea').val('');
          $('.counter').text(140);
        });
    }
  });
});
