# JWT Authentication Project - PERN Stack

This is a JWT Authentication project using the **PERN** stack: **PostgreSQL**, **Express.js**, **React.js**, and **Node.js**.

## Setup Instructions

### 1. Clone the Repository
Clone this repository to your local machine:


git clone https://github.com/imabhi-03/JWT-Authentication-Project---PERN-Stack.git
cd your-repository

2. Navigate to the client folder and install the client-side dependencies:

cd client
npm install

2. Navigate to the server folder and install the server-side dependencies:

cd server
npm install


3. Setup Environment Variables
Rename the .env.sample file to .env:
Edit the .env file with your actual configuration values:

jwtSecret: Secret key for JWT signing and verification.

4. Running the Project

For the client (React app):

cd client
npm start

For the server (Node.js backend):
cd  server
nodemon index.js


If you encounter any issues, make sure to check:
Your environment variables are correctly set in .env.
Dependencies are installed (npm install).