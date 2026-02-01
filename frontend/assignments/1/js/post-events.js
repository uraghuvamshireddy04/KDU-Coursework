const postInput = document.querySelector('.post-input');
const tweetButton = document.querySelector('.tweet-btn');
const postsContainer = document.querySelector('.posts');
const mobileMenuTrigger = document.getElementById('mobile-menu-trigger');
const navSection = document.querySelector('.navigation-section');
const overlay = document.getElementById('overlay');
const tweet = document.getElementById('tweet');
const tweetBox = document.querySelector('.tweet-box');

postInput.addEventListener('input', ()=> {
if(postInput.value.length > 0){
  tweetButton.style.opacity = '1';
  tweetButton.disabled = false;
} else{
  tweetButton.style.opacity = "0.5";
  tweetButton.disabled = true;
}
})

tweetButton.addEventListener('click',() => {
const input = postInput.value.trim();
if(input !== ""){
  createPost(input, true);
  postInput.value = "";
}
})

mobileMenuTrigger.addEventListener('click', () => {
  navSection.classList.add('active');
  overlay.classList.add('active');
});

overlay.addEventListener('click', () => {
  navSection.classList.remove('active');
  overlay.classList.remove('active');
});

tweet.addEventListener('click', () => {
tweetBox.classList.add('mobile-active');
if (!document.querySelector('.mobile-back')) {
  const backButton = document.createElement('button');
  backButton.innerText = "←";
  backButton.className = "mobile-back";
  backButton.style = "font-size: 24px; color: white; margin-bottom: 20px; text-align: left;";
  tweetBox.prepend(backButton);

backButton.addEventListener('click', () => {
        tweetBox.classList.remove('mobile-active');
    });
}

});
const originalTweetButton = document.querySelector('.tweet-btn');
originalTweetButton.addEventListener('click', () => {
if (window.innerWidth <= 500) {
    tweetBox.classList.remove('mobile-active');
}
  });