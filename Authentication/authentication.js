/**
  You need to create a HTTP server in Node.js which will handle the logic of an authentication server.
  - Don't need to use any database to store the data.

  - Save the users and their signup/login data in an array in a variable
  - You can store the passwords in plain text (as is) in the variable for now

  The expected API endpoints are defined below,
  1. POST /signup - User Signup
    Description: Allows users to create an account. This should be stored in an array on the server, and a unique id should be generated for every new user that is added.
    Request Body: JSON object with username, password, firstName and lastName fields.
    Response: 201 Created if successful, or 400 Bad Request if the username already exists.
    Example: POST http://localhost:3000/signup

  2. POST /login - User Login
    Description: Gets user back their details like firstname, lastname and id
    Request Body: JSON object with username and password fields.
    Response: 200 OK with an authentication token in JSON format if successful, or 401 Unauthorized if the credentials are invalid.
    Example: POST http://localhost:3000/login

  3. GET /data - Fetch all user's names and ids from the server (Protected route)
    Description: Gets details of all users like firstname, lastname and id in an array format. Returned object should have a key called users which contains the list of all users with their email/firstname/lastname.
    The users username and password should be fetched from the headers and checked before the array is returned
    Response: 200 OK with the protected data in JSON format if the username and password in headers are valid, or 401 Unauthorized if the username and password are missing or invalid.
    Example: GET http://localhost:3000/data

  - For any other route not defined in the server return 404

  Testing the server - run `npm run test-authenticationServer` command in terminal
 */

const express = require("express")
const PORT = 3000;
const app = express();

const USERS = [];

app.use(express.json());



//Create Account
app.post("/signup", (req, res) => {
  let { username, password, firstName, lastName } = req.body;

  let userAlreadyExist = false;
  for (let i = 0; i < USERS.length; i++) {
    if (USERS[i].username === USERS.username) {
      userAlreadyExist = true;
      break;
    }
  }
  const id = USERS.length + 1;
  const newUser = { id, username, password, firstName, lastName };
  if (userAlreadyExist) {
    res.status(400).send("Username already exists");
  } else {
    USERS.push(newUser);
    console.log(newUser);
    res.status(200).send("Signup successfull");
  }
});



//User login
app.post("/login", (req, res) => {
  let { username, password } = req.body;
  let userFound = null;
  for (let i = 0; i < USERS.length; i++) {
    if (USERS[i].username === username && USERS[i].password === password) {
      userFound = USERS[i];
      break;
    }
  }
  if (userFound) {
    res.json({
      id: userFound.id,
      firstName: userFound.firstName,
      lastName: userFound.lastName
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});


//List users
app.get("/data", (req, res) => {
  var username = req.headers.username;
  var password = req.headers.password;
  let userFound = false;
  for (var i = 0; i < USERS.length; i++) {
    if (USERS[i].username === username && USERS[i].password === password) {
      userFound = true;
      break;
    }
  }

  if (userFound) {
    let usersToReturn = [];
    for (let i = 0; i < USERS.length; i++) {
      usersToReturn.push({
        firstName: USERS[i].firstName,
        lastName: USERS[i].lastName,
        username: USERS[i].username
      });
    }
    res.json(USERS);
  } else {
    res.sendStatus(401);
  }
})


function started() {
  console.log(`Example app listening on port ${PORT}`)
}
app.listen(PORT, started)
module.exports = app;
