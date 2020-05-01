const router = require('express').Router();
let Exercise = require('../model/exercise.model');

router.route('/').get((req, res) => {
    Exercise.find({
      // description : req.params.description,
      username : req.query.username
    })
      .then(exercises => res.json(exercises))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/all').get((req, res) => {
  Exercise.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const matkul = req.body.matkul
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    matkul,
    date,
  });

  newExercise.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.matkul = req.body.matkul;
      exercise.date = Date.parse(req.body.date);

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;