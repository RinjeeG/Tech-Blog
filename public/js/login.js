const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      const result = await response.json();
      alert(result.message); // Display the error message
      if (response.status === 404) {
        const signup = confirm('No user with that username. Do you want to sign up?');
        if (signup) {
          document.location.replace('/signup');
        }
      }
    }
  }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
