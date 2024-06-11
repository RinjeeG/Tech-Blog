document.addEventListener('DOMContentLoaded', () => {
  const newPostForm = document.querySelector('#new-post-form');
  const userPosts = document.querySelector('#user-posts');
  const editPostForm = document.querySelector('#edit-post-form');

  if (newPostForm) {
    newPostForm.addEventListener('submit', newPostHandler);
  }
  
  if (userPosts) {
    userPosts.addEventListener('click', deletePostHandler);
    userPosts.addEventListener('click', editPostHandler);
  }
  
  if (editPostForm) {
    editPostForm.addEventListener('submit', updatePostHandler);
  }
});

const newPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  if (title && content) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const newPost = await response.json();

      // Clear the form fields
      document.querySelector('#post-title').value = '';
      document.querySelector('#post-content').value = '';

      // Add the new post to the top of the post list
      const postList = document.querySelector('#all-posts');
      const newPostElement = document.createElement('div');
      newPostElement.classList.add('post');
      newPostElement.setAttribute('data-post-id', newPost.id);
      newPostElement.innerHTML = `
        <h3>${newPost.title}</h3>
        <p>${newPost.content}</p>
        <p>Posted by You on ${new Date(newPost.createdAt).toLocaleString()}</p>
        <a href="#" class="toggle-comments" data-post-id="${newPost.id}">Show comments</a>
        <div class="comments" data-post-id="${newPost.id}" style="display: none;"></div>
        <form class="new-comment-form" data-post-id="${newPost.id}">
          <textarea name="comment_text" placeholder="Add a comment" required></textarea>
          <button type="submit">Comment</button>
        </form>
        <button class="edit-post-btn">Edit</button>
        <button class="delete-post-btn">Delete</button>
      `;
      postList.prepend(newPostElement);
    } else {
      alert('Failed to create post.');
    }
  }
};

const deletePostHandler = async (event) => {
  if (event.target.classList.contains('delete-post-btn')) {
    const postId = event.target.closest('.post').getAttribute('data-post-id');

    if (postId) {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.querySelector(`.post[data-post-id="${postId}"]`).remove();
      } else {
        alert('Failed to delete post.');
      }
    }
  }
};

let currentPostId;

const editPostHandler = (event) => {
  if (event.target.classList.contains('edit-post-btn')) {
    const post = event.target.closest('.post');
    currentPostId = post.getAttribute('data-post-id');
    const title = post.querySelector('h3').textContent;
    const content = post.querySelector('p').textContent;

    document.querySelector('#edit-post-title').value = title;
    document.querySelector('#edit-post-content').value = content;

    document.querySelector('#edit-post-section').style.display = 'block';
    document.querySelector('#dashboard').style.display = 'none';
  }
};

const updatePostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#edit-post-title').value.trim();
  const content = document.querySelector('#edit-post-content').value.trim();

  if (title && content && currentPostId) {
    const response = await fetch(`/api/posts/${currentPostId}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const postElement = document.querySelector(`.post[data-post-id="${currentPostId}"]`);
      postElement.querySelector('h3').textContent = title;
      postElement.querySelector('p').textContent = content;

      document.querySelector('#edit-post-section').style.display = 'none';
      document.querySelector('#dashboard').style.display = 'block';
    } else {
      alert('Failed to update post.');
    }
  }
};
