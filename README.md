# Project SB Fitness Gym Admin

## Contributors
- Ayantik Sarkar (Backend)
- Rishav Raj (Frontend)

## How to setup on your own PC?
1) Fork the repo to make your own copy under your account
2) Clone the repo using the below command in a terminal
```
git clone git https://github.com/your_github_username/SB-Fitness-Gym-Admin
```
3) Go inside the project using terminal command  below
```
git remote add upstream https://github.com/ayantik2006/SB-Fitness-Gym-Admin
```
4) Go inside `frontend` folder using below terminal command(if current folder is `Project SB Gym`)
```
cd frontend
```
5) Type the below command to install all dependencies(node_modules)
```
npm i
```
6) Go inside `backend` folder using below terminal command(if current folder is `Project SB Gym`)
```
cd backend
```
7) Type the below command to install all dependencies(node_modules)
```
npm i
```

## Setting up Environment Variables (For Development Stage)
1) For `frontend` folder
   - Create a file `.env`
   - Add the below environment variables in the file
     ```
     VITE_NODE_ENV=development
     VITE_FRONTEND_URL=http://localhost:5173
     VITE_BACKEND_URL=http://localhost:8080
     ```
2) For `backend` folder
   - Create a file `.env`
   - Add the below environment variables in the file
     ```
     NODE_ENV=development
     FRONTEND_URL=http://localhost:5173
     BACKEND_URL=http://localhost:8080
     MONGO_URI=mongodb://127.0.0.1:27017/sb_fitness_gym
     ```

## How to Contribute?
1) Create a separate `git branch` for the feature you are working on
2) Commit the changes you have made
3) Raise a Pull Request from the `feature branch` of your fork to the `main branch` of the `main repo`
4) After reviewing the changes, the commit will be merged to the main branch