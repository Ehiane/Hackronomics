# Hacronomics Backend Setup

## Initialize a New Node.js Project
```sh
npm init -y
```

## Install Required Dependencies
```sh
npm install express cors dotenv mongoose jsonwebtoken bcryptjs express-jwt jwks-rsa
```

## Install TypeScript and Development Dependencies
```sh
npm install --save-dev typescript @types/node @types/express ts-node nodemon
```

## Setup TypeScript Configuration
Run:
```sh
npx tsc --init
```
Then open `tsconfig.json` and make these changes:
```json
{
  "target": "ES6",
  "module": "CommonJS",
  "rootDir": "./src",
  "outDir": "./dist",
  "strict": true
}
```

## Create Project Folder Structure
Inside your **backend folder**, create the following structure:

```
/backend
│── /src
│   ├── /config        # Database & environment config
│   ├── /controllers   # Business logic for routes
│   ├── /models        # Mongoose schemas (MongoDB)
│   ├── /routes        # Express routes
│   ├── /middlewares   # Authentication, validation
│   ├── /services      # AI processing, external APIs
│   ├── /utils         # Helper functions
│   ├── app.ts         # Express app setup
│── .env               # Environment variables
│── package.json       # Project dependencies
│── tsconfig.json      # TypeScript configuration
│── nodemon.json       # Nodemon auto-reload config
│── README.md          # Documentation
```
