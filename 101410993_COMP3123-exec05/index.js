const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');
const path = require('path');

app.use(express.json());

router.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

router.get('/profile', (req, res) => {
  fs.readFile(path.join(__dirname, 'user.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ status: false, message: "Server Error" });
    }
    const user = JSON.parse(data);
    res.json(user);
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  fs.readFile(path.join(__dirname, 'user.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ status: false, message: "Server Error" });
    }

    const user = JSON.parse(data);

    if (user.username !== username) {
      return res.json({ status: false, message: "User Name is invalid" });
    }

    if (user.password !== password) {
      return res.json({ status: false, message: "Password is invalid" });
    }

    res.json({ status: true, message: "User is valid" });
  });
});

router.get('/logout', (req, res) => {
  const username = req.query.username;
  if (!username) {
    return res.status(400).send('<b>Username is required to log out.</b>');
  }
  res.send(`<b>${username} successfully logged out.</b>`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('<h1>Server Error</h1>');
});

app.use('/', router);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Web Server is listening at port ${PORT}`);
});
