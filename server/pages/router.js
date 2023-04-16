const express = require('express');
const router = express.Router();
const Genres = require('../Genres/Genres');
const Country = require('../Country/Country');
router.get('/', async (req, res) => {
  const allGenres = await Genres.find();
  res.render('index', { genres: allGenres, user: req.user ? req.user : {} });
});
router.get('/login', (req, res) => {
  res.render('login', { user: req.user ? req.user : {} });
});
router.get('/register', (req, res) => {
  res.render('register', { user: req.user ? req.user : {} });
});
router.get('/profile/:id', (req, res) => {
  res.render('profile', { user: req.user ? req.user : {} });
});
router.get('/admin', (req, res) => {
  res.render('adminProfile', { user: req.user ? req.user : {} });
});
router.get('/new', async (req, res) => {
  const allGenres = await Genres.find();
  const allCountries = await Country.find();
  res.render('newFilm', {
    genres: allGenres,
    countries: allCountries,
    user: req.user ? req.user : {},
  });
});
router.get('/edit', async (req, res) => {
  const allGenres = await Genres.find();
  const allCountries = await Country.find();
  res.render('editFilm', {
    genres: allGenres,
    countries: allCountries,
    user: req.user ? req.user : {},
  });
});
module.exports = router;
