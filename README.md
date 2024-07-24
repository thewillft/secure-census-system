# Secure Census System
This repository contains the source code for an academic analysis and implementation of a secure digital census system. It stresses security from the beginning of the design, from user authentication, to data encryption, and audit logging. [Next.js](https://nextjs.org/), a React framework, is used to quickly prototype the project's frontend and backend together in one place. [SQLite](https://www.sqlite.org/) is used for a local database to exemplify how queries should be made to the database securely. Lastly, additional packages are used for other necessary features in a secure app, such as [Joi](https://joi.dev/) for data validation, and more.

## Getting Started

Requirements:
- Node.js 

Steps:
1. from the root directory, use `npm install` to autmatically download all required node modules
2. create a `.env` file in the root directory of this project with the following:
```
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=410EYYBwXiCOnBqEN+tQgCCKXwJvZiZ8RKNJHPLwiwc=
SECRET_KEY=xfn9P8L9rIpKtWKj68IZ3G865WfdYXNY
```
4. next use `npm run dev` to launch the dev version of the application (sufficient for demonstration)
5. navigate to [http://localhost:3000](http://localhost:3000) to see the website live

## Using the Site
As a respondent:
1. nagivate to [http://localhost:3000/register](http://localhost:3000/register)
2. create an account with any email and password, for example `janewillis@gmail.com` `jwjwjw`, you will b
3. you will be redirected to the login page if your registration was successful
4. login with the details you used to register and you will be redirected to the dashboard home page
5. on the dashboard home page you may fill out the census response form as you wish and press the submit button at the bottom
6. the page will update, thanking you for your submission, and disallowing any further submission (one response per user)
7. that's it!

As an admin:
1. ...
