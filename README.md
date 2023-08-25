# Forum Backend - Documentation

This is the backend of a forum, designed to handle the logic and functionality behind the application. The backend is built using JavaScript, Node.js and MongoDB as the database. The frontend of the application has been implemented in Angular.

## Project Structure

The backend project has the following folder and file structure:

- controllers/: Contains controllers to handle the different actions of the server.
  - auth.js: Driver for user authentication.
  - user.js: Controller for operations related to users.
  
- publicationscontrollers/: Contains controllers related to forum posts.
  - interactions.js: Controller to manage interactions in posts.
  - publications.js: Controller for forum post operations.

  - libs/: Contains initial configurations for the application.

-initialSetups.js: File with initial configurations of the application.

- middlewares/: Contains middlewares used in the server.
  - authjw.js: Middleware for authentication using JSON Web Tokens.
  - index.js: File to import and export middlewares.
  - verifySignup.js: Middleware to verify the registration process.

- models/: Defines the data models of the database.
  - admin.js: Model for administrators.
  - user.js: Model for normal users.
  
- models/publicationsmodel/: Defines models related to publications.
  - interactions.js: Model for interactions in posts.
  - publications.js: Template for forum posts.

- routers/: Defines the routes and endpoints of the API.
  - auth.js: Defines routes related to authentication.
  - user.js: Defines routes for user operations.

  - routers/publicationsrou/: Defines routes related to publications.
  - interactions.js: Defines routes for interactions in posts.
  - publications.js: Defines routes for the publication operations.

- .gitignore: File to specify files and folders that should be ignored by Git.
- app.js: Entry point of the Node.js application.
- config.js: Application configuration file.
- database.js: MongoDB database connection configuration.
- index.js: Script to start the server.
- package-lock.json and package.json: Dependency management files.

## Configuration and Use

1. Make sure you have Node.js and MongoDB installed on your system.
2. Clone this repository to your machine.
3. Navigate to the project folder and run npm install to install the dependencies.
4. Configure the configuration files (config.js, database.js) as needed.
5. Run node index.js to start the server.

## Contributions

If you want to contribute to this project, we are open to pull requests! Please follow development best practices and make sure new features or fixes are properly tested.

## Contact

If you have any questions or suggestions, feel free to contact the development team at [email or link to communication platform].