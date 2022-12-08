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

  let $tweet = $(`
<div class="single-tweet">
<header>
  <div class="posted-tweet-avatar">
    <img src=${avatar} id="posted-avatar">
    <div class="posted-tweet-name">${name}</div>
  </div>
  <div class="handle">
    ${handle}
  </div>
</header>

<article>
  <p class="content">${content}</p>
</article>

<footer>
  <div>
    <p class="timeStamp">${timeFormat}</p>
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
  for (let data of tweets) {
    const $tweet = createTweetElement(data);
    $('.posted-tweets').append($tweet);
  }
};

$(document).ready(function() {

  const loadTweets = function() {
    const $tweets = $.ajax('/tweets/', { method: 'GET'})
      .then((data) => {
        renderTweets(data.reverse());
      });

    return $tweets;
  };

  loadTweets();
  

  $('form').on('submit', function(event) {
    event.preventDefault();
    let data = $(this).serialize();
    let length = $('textarea').val().length;

    if (length > 140) {
      alert('Your tweet is too long');
    } else if (length <= 0) {
      alert('Your tweet is empty');
    } else {
      $.ajax({
        method: 'POST',
        url: '/tweets/',
        data: data,
      })
        .then(() => {
          $('.posted-tweets').empty();
          $.ajax('/tweets/', { method: 'GET'})
            .then((data) => {
              renderTweets(data.reverse());
            });
        });
    }
  });
});
