// Handle creating a new comment
const newCommentHandler = async (event) => {
  event.preventDefault();

  const comment_text = event.target.querySelector('textarea[name="comment_text"]').value.trim();
  const post_id = event.target.getAttribute('data-post-id');

  if (comment_text && post_id) {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ comment_text, post_id }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const newComment = await response.json();
        
        // Clear the textarea
        event.target.querySelector('textarea[name="comment_text"]').value = '';

        // Add the new comment to the post's comment list
        const commentsSection = document.querySelector(`.comments[data-post-id="${post_id}"]`);
        const newCommentElement = document.createElement('p');
        newCommentElement.textContent = `${newComment.comment_text} - You`;
        commentsSection.appendChild(newCommentElement);
        commentsSection.style.display = 'block'; // Ensure comments are visible
      } else {
        alert('Failed to add comment.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add comment.');
    }
  }
};

// Handle toggling comments
const toggleCommentsHandler = (event) => {
  event.preventDefault();
  const postId = event.target.getAttribute('data-post-id');
  const commentsSection = document.querySelector(`.comments[data-post-id="${postId}"]`);
  if (commentsSection) {
    if (commentsSection.style.display === 'none' || commentsSection.style.display === '') {
      commentsSection.style.display = 'block';
      event.target.textContent = 'Hide comments';
    } else {
      commentsSection.style.display = 'none';
      event.target.textContent = 'Show comments';
    }
  }
};

// Add event listeners
document.querySelectorAll('.new-comment-form').forEach(form => {
  form.addEventListener('submit', newCommentHandler);
});

document.querySelectorAll('.toggle-comments').forEach(link => {
  link.addEventListener('click', toggleCommentsHandler);
});
