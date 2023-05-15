const express = require('express');
const router = express.Router();
const Genres = require('../Genres/Genres');
const Country = require('../Country/Country');
const User = require('../auth/User');
const Film = require('../Films/Film')

router.get('/', async (req, res) => {
  // фильтрация по категориям //
  const options = {};
  const genres = await Genres.findOne({key: req.query.genre})
  if(genres){

    options.genre = genres._id;
  }
 // фильтрация по категориям //

  //  pagination //
  let page = 0;
  const limit = 6;
  if(req.query.page && req.query.page > 0){
    page = req.query.page
  }
  const totalFilms = await Film.count();
  //  pagination //

  const allGenres = await Genres.find();
  const films = await Film.find(options).limit(limit).skip(page * limit).populate('country', 'name').populate('genre', 'name');
  const user = req.user ? await User.findById(req.user._id) : {}
  res.render('index', { genres: allGenres, user, films, pages: Math.ceil(totalFilms / limit) });
});
router.get('/login', (req, res) => {
  res.render('login', { user: req.user ? req.user : {} });
});
router.get('/register', (req, res) => {
  res.render('register', { user: req.user ? req.user : {} });
});
router.get('/profile/:id', async (req, res) => {
  const allGenres = await Genres.find();
  const user = await User.findById(req.params.id).populate('toWatch')
  .populate({path: 'toWatch', populate: {path: 'country'}})
  .populate({path: 'toWatch', populate: {path: 'genre'}})
  if (user) {
    res.render('profile', {
      genres: allGenres,
      user: user,
      loginUser: req.user,
    });
  } else {
    res.redirect('/not-found');
  }
});
router.get('/admin/:id', async (req, res) => {
  const allGenres = await Genres.find();
  const user = await User.findById(req.params.id);
  const films = await Film.find().populate('country').populate('genre').populate('author')
  res.render('adminProfile', {
    genres: allGenres,
    user: user,
    loginUser: req.user ? req.user : {},
    films
  });
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
router.get('/edit/:id', async (req, res) => {
  const allGenres = await Genres.find();
  const allCountries = await Country.find();
  const film = await Film.findById(req.params.id)
  res.render('editFilm', {
    genres: allGenres,
    countries: allCountries,
    user: req.user ? req.user : {},
    film
  });
});
router.get('/not-found', (req, res) => {
  res.render('notFound');
}); 

router.get('/detail/:id', async (req, res) => {
  const film = await Film.findById(req.params.id).populate('country').populate('genre')
  res.render('detail', {user: req.user ? req.user : {}, film}); 
})
module.exports = router;
