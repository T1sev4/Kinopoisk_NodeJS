const Film = require('./Film');
const createFilm = (req, res) => {
  if (
    req.file &&
    req.body.titleRus.length > 2 &&
    req.body.titleEng.length > 2 &&
    req.body.year > 0 &&
    req.body.time > 10 &&
    req.body.country.length > 2 &&
    req.body.genre.length > 2
  ) {
    new Film({
      titleRus: req.body.titleRus,
      titleEng: req.body.titleEng,
      year: req.body.year,
      time: req.body.time,
      country: req.body.country,
      genre: req.body.genre,
      image: req.file.path,
      author: req.user._id,
    }).save();
    res.redirect(`/admin/${req.user._id}`);
  } else {
    res.redirect('/new?error=1');
  }
};

module.exports = { createFilm };
