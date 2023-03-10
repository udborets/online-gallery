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

- `fix page displaying logic (for owner/visitor)`

- `fix private album creating/seeing logic`

- `add ability to change album name ?`

- `add ability to change album privacy ?`

- `add ability to change photo name ?`

- `and much more :)`

# Run Locally

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

Set up firebase config (your own firebase info)

```bash

VITE_REACT_APP_FIREBASE_API_KEY

VITE_REACT_APP_FIREBASE_AUTH_DOMAIN

VITE_REACT_APP_FIREBASE_PROJECT_ID

VITE_REACT_APP_FIREBASE_STORAGE_BUCKET

VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID

VITE_REACT_APP_FIREBASE_APP_ID

```

Set up server api url (`http://localhost:5000`)

```bash

VITE_REACT_APP_API_URL

```

Set up server port (`5000`)

```bash

SERVER_PORT

```

Set up database url for prisma (your own database info)

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
