const express = require('express');

const app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/login', (req, res) => {
  res.render('login');
});
app.get('/register', (req, res) => {
  res.render('register');
});
app.get('/profile', (req, res) => {
  res.render('profile');
});
app.get('/admin', (req, res) => {
  res.render('adminProfile');
});
app.get('/new', (req, res) => {
  res.render('newFilm');
});
app.get('/edit', (req, res) => {
  res.render('editFilm');
});
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
