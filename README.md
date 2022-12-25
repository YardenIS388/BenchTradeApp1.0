# BenchTradeApp1.0
Shenkar Software Engineering Course  

This README.md file is meant to help anyone who would like to understand our code and architecture a little better. 
We hope to regularly update it and keep things sharp. 

Let us know if you founf any mistakes! 


Project Structure: 

Screens - Screens are components that reprsent one view in our screen stack. navigation is implemnted with React Navigation. 
routes  - includes the homeStack component which is a stack navigator component
components - unit components in the system 


## Backend
### How to run the server
1. Go to server directory:
```
cd server
```
2. Install NPM packages:
```
npm i
```
3. Create a .env file with the following constants:
      * NODE_ENV=#
      * DB_USER=#
      * DB_PASSWORD=#
      * DB_NAME=#
      * PORT=#
      
4. Run the server:
```
npm run dev
```

### Important packages
  - **express-async-errors** - no need in try/catch blocks inside controllers, only error throwing
  - **fastest-validator** - validates entity information
  - **morgan** - http calls logger
  - **winston** - error logger
