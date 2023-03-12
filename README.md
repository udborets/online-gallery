# Online Gallery

### This is a [full-stack](#stack) website app which allows you to create albums, upload your own photos to them and visit other users albums.

# Navigation

- ## [`1. Stack`](#stack)

- ## [`2. Todo`](#todo)

- ## [`3. Run Locally`](#run-locally)

- ## [`4. Feedback`](#feedback)

# Stack

## Backend

`NodeJS`, `TypeScript`, `ExpressJS`, `Prisma`, `tRPC`

## Frontend

`TypeScript`, `React`, `React Router DOM`, `React Redux`, `RTK`, `React Query`, `React Error Boundary`, `SCSS`, `Firebase Authentication`, `Firebase Storage`

# Todo

- `fix album displaying in gallery page`

- `fix photos displaying in album page`

- `and much more :)`

# Run Locally

## (that's hard xd)

### Clone the project

```bash
  git clone https://github.com/udborets/online-gallery
```

### Go to the project directory

```bash
  cd online-gallery
```

### Deploy database

- Create PostgreSQL database

- Migrate prisma:

```bash
  cd server/src
  npx prisma migrate dev
  cd ../..
```

### Add Google Firebase

Create Google Firebase

### Environment variables

#### Set up these variables in `.env` file:

firebase config variables (your own firebase info)

```bash

VITE_REACT_APP_FIREBASE_API_KEY

VITE_REACT_APP_FIREBASE_AUTH_DOMAIN

VITE_REACT_APP_FIREBASE_PROJECT_ID

VITE_REACT_APP_FIREBASE_STORAGE_BUCKET

VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID

VITE_REACT_APP_FIREBASE_APP_ID

```

server api url variable (`http://localhost:5000`)

```bash

VITE_REACT_APP_API_URL

```

server port variable (`5000`)

```bash

SERVER_PORT

```

database url for prisma variable (your own database info)

```bash

DATABASE_URL

```

### Install dependencies

```bash
  cd server
  npm i
  cd ..
  cd client
  npm i
  cd ..
```

### Start the server

Open two terminals

- In the first one:

```bash
  cd server
  npm run dev
```

- In the second one:

```bash
  cd client
  npm run dev
```

# Feedback

#### If you have any suggestions or you found a bug in the code, please contact me:

- `telegram:` [@udborets](https://t.me/udborets)

- `VK:` [Юрий Борец](https://vk.com/udborets)

- `email:` udborets@gmail.com
