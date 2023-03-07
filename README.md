# Online Gallery

### That is a [full-stack](#stack) "Online Gallery" website app with Google Firebase authentication which allows you to create albums, upload your own photos to them and visit other users albums.

# Navigation

- ## [`1. Stack`](#stack)

- ## [`2. Todo`](#todo)

- ## [`3. Feedback`](#feedback)

- ## [`4. Run Locally`](#run-locally)

# Stack

## Backend

`NodeJS`, `TypeScript`, `ExpressJS`, `Prisma`, `tRPC`

## Frontend

`TypeScript`, `React`, `React Router DOM`, `React Redux`, `RTK`, `React Query`, `React Error Boundary`, `SCSS`, `Google Firebase Authentication`, `Google Firebase Storage`

# Todo

- `fix albums creating and fetching functions`

- `fix photos creating and fetching functions`

- `update gallery page albums styling`

- `update album page photos styling`

- `create user page components`

- `create logic for album and photos displaying`

- `fix user name getter so there will be only unique names`

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

### Set up environment variables

 - `VITE_REACT_APP_FIREBASE_API_KEY`

 - `VITE_REACT_APP_FIREBASE_AUTH_DOMAIN`

 - `VITE_REACT_APP_FIREBASE_PROJECT_ID`

 - `VITE_REACT_APP_FIREBASE_STORAGE_BUCKET`

 - `VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID`

 - `VITE_REACT_APP_FIREBASE_APP_ID`

 - `VITE_REACT_APP_API_URL`

 - `DATABASE_URL`

 - `SERVER_PORT`

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
