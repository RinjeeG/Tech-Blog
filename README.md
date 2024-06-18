# Tech Blog

A CMS-style blog site where developers can publish their blog posts and comment on other developers’ posts. Built with Node.js, Express.js, Handlebars.js, Sequelize, and Bootstrap.

## Features

- **User Authentication**: Sign up, log in, and log out.
- **Post Management**: Create, edit, and delete blog posts.
- **Comment System**: Add and view comments on posts.
- **Responsive Design**: Uses Bootstrap for modern, responsive UI.
- **Professional Styling**: Custom CSS for a futuristic look.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/tech-blog.git
   ```
2. Install dependencies:
   ```sh
   cd tech-blog
   npm install
   ```
3. Set up environment variables:
   ```sh
   cp .env.example .env
   ```
   Update `.env` with your database and session secret configurations.

4. Set up the database:
   ```sh
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```

5. Start the server:
   ```sh
   npm start
   ```

6. Open your browser and go to `http://localhost:3001`.

## Usage

- **Homepage**: View all posts and comments.
- **Dashboard**: Manage your posts and create new ones.
- **Login/Signup**: Authenticate to access more features.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: Handlebars.js, Bootstrap, Custom CSS
- **Database**: PostgreSQL, Sequelize ORM
- **Authentication**: express-session, bcrypt

## Resources

- [Google](https://www.google.com)
- [Stack Overflow](https://stackoverflow.com)
- [ChatGPT](https://chat.openai.com)
- [YouTube](https://www.youtube.com)

## Screenshots
![alt text](<Screenshot 2024-06-17 220621.png>)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Link

- GitHub Repo: https://github.com/RinjeeG/Tech-Blog.git
- Render: https://tech-blog-z3zj.onrender.com
