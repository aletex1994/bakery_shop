# 🍰 Bakery Shop - MERN App

A basic MERN (MongoDB, Express, React, Node.js) application featuring CRUD (Create, Read, Update, Delete) operations.

## Get started

- 📁 In backend directory create a `.env` folder with `CONST ATLAS_URI=yourMongoAtlasConnectionString`
- 📁 In backend directory run `npm i` - `npm start`

- In the root directory `npm i` - `npm run start`

## Create Admins 

Once the connection with MongoDB is estabilished use this JSON file to create Users:
`
{
	"username" : "FirstUser",
	"password" : "SecretPassword"
}
`
Make a `POST request` to `http://localhost:8000/users/add` - when user is added a notification `User successfully added` is displayed.

💡 Quick way to test api and add users here<https://insomnia.rest/download>



