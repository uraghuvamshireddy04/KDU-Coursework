function createPost(input, newPost = false) {
    const initialLikes = newPost ? 0 : Math.floor(Math.random() * 100);
    const initialRetweets = newPost ? 0 : Math.floor(Math.random() * 100);
    const initialComments = newPost ? 0 : Math.floor(Math.random() * 100);

    const postArticle = document.createElement('article');
    postArticle.className = 'post';

    postArticle.innerHTML = `
        <div class="post-header">
            <img src="icons/profile-icon.svg" alt="User" />
            <span class="username">U Raghu Vamshi Reddy</span>
            <span class="twitter-name">@me</span>
            <span class="post-time">10s</span>
        </div>
        <p class="post-text">${input}</p>
        
        <div class="post-actions">
            <div class="action-item">
                <button class="comment-post">
                    <img src="icons/comment.svg" alt="Comment" />
                </button>
                <span class="comment-count">${initialComments}</span>
            </div>

            <div class="action-item">
                <button class="retweet-post">
                    <img src="icons/retweet.svg" alt="Retweet" />
                </button>
                <span class="retweet-count">${initialRetweets}</span>
            </div>

            <div class="action-item">
                <button class="like-post">
                    <img src="icons/like.svg" alt="Like" />
                </button>
                <button class="unlike-post" style="display:none;">
                    <img src="icons/like-pink.svg" alt="Unlike" />
                </button>
                <span class="likes-count">${initialLikes}</span>
            </div>

            <div class="action-item">
                <img src="icons/stats.svg" alt="Stats" />
            </div>
        </div>

        <div class="comment-section" style="display:none;">
            <div class="comment-input-list">
                <input type="text" class="comment-input" placeholder="Post your reply">
                <button class="comment-submit">Reply</button>
            </div>
            <div class="comments-list"></div>
        </div>
    `;
    postsContainer.prepend(postArticle);
    addEventListenerToNewPost(postArticle);
}

function addEventListenerToNewPost(post) {
    const likeButton = post.querySelector('.like-post');
    const unlikeButton = post.querySelector('.unlike-post');
    const likesCount = post.querySelector('.likes-count');
    const retweetButton = post.querySelector('.retweet-post');
    const retweetCount = post.querySelector('.retweet-count');
    const commentButton= post.querySelector('.comment-post');
    const commentSection = post.querySelector('.comment-section');
    const commentSubmit = post.querySelector('.comment-submit');
    const commentInput = post.querySelector('.comment-input');
    const commentsList = post.querySelector('.comments-list');

    likeButton.addEventListener('click', ()=> {
        likeButton.style.display = 'none';
        unlikeButton.style.display = 'inline-block';
        likesCount.textContent = Number.parseInt(likesCount.textContent) + 1;
        likesCount.style.color = '#df1f79ff';
    })

    unlikeButton.addEventListener('click', ()=> {
        unlikeButton.style.display = 'none';
        likeButton.style.display = 'inline-block';
        likesCount.textContent = Number.parseInt(likesCount.textContent) - 1;
        likesCount.style.color = '';
    })

    let retweeted = false;
    retweetButton.addEventListener('click', () => {
        let count = Number.parseInt(retweetCount.textContent);
        if (retweeted) {
            retweetCount.textContent = count - 1;
            retweetCount.style.color = "";
            retweeted = false;
        } else {
            retweetCount.textContent = count + 1;
            retweeted = true;
            retweetCount.style.color = "#435db5ff";
        }
    });

commentButton.addEventListener('click', () => {
        commentSection.style.display = commentSection.style.display === 'none' ? 'block' : 'none';
    });

commentSubmit.addEventListener('click', ()=> {
    const input = commentInput.value.trim();
    if(input !== ""){
        const divElement = document.createElement('div');
        divElement.className = 'comment-item';
        divElement.innerHTML = `<span>@User:</span> ${input}`;
        commentsList.appendChild(divElement);
        const count = post.querySelector('.comment-count');
        count.textContent = Number.parseInt(count.textContent)+1;
        commentInput.value = "";
    }
})

}