const express = require("express")
const PORT = 3000;
const app = express();
// write your logic here, DONT WRITE app.listen(3000) when you're running tests, the tests will automatically start the server

var users = [];

app.use(express.json());
app.post("/signup", (req, res) => {
  var user = req.body;
  let userAlreadyExists = false;
  for (var i = 0; i<users.length; i++) {
    if (users[i].email === user.email) {
        userAlreadyExists = true;
        break;
    }
  }
  if (userAlreadyExists) {
    res.status(400).send("User already exists");
  } else {
    users.push(user);
    res.status(201).send("Signup successful");
  }
});

app.post("/login", (req, res) => {
  var user = req.body;
  let userFound = null;
  for (var i = 0; i<users.length; i++) {
    if (users[i].email === user.email && users[i].password === user.password) {
        userFound = users[i];
        break;
    }
  }

  if (userFound) {
    res.json({
        firstName: userFound.firstName,
        lastName: userFound.lastName,
        email: userFound.email,
        password: userFound.password
    });
  } else {
    res.status(401).send("Wrong credentials");
  }
});

app.get("/data", (req, res) => {
  var email = req.headers.email;
  var password = req.headers.password;
  let userFound = false;
  for (var i = 0; i<users.length; i++) {
    if (users[i].email === email && users[i].password === password) {
        userFound = true;
        break;
    }
  }

  if (userFound) {
    let usersToReturn = [];
    for (let i = 0; i<users.length; i++) {
        usersToReturn.push({
            firstName: users[i].firstName,
            lastName: users[i].lastName,
            email: users[i].email,
            password:users[i].password
        });
    }
    res.json(users);
  } else {
    res.sendStatus(401);
  }
});
function started() {
    console.log(`Example app listening on port ${PORT}`)
  }
  app.listen(PORT, started)
