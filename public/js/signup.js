document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.querySelector('.signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', signupFormHandler);
  }
});

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && password) {
    try {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to sign up.');
    }
  } else {
    alert('Please fill out all fields.');
  }
};
