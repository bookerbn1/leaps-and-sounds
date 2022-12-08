const router = require('express').Router();
let Session = require('../models/session.model');

router.route('/').get((req, res) => {
  Session.find()
    .then(sessions => res.json(sessions))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const client = req.body.client;
  const description = req.body.description;
  const cost = Number(req.body.cost);
  const date = Date.parse(req.body.date);

  const newSession = new Session({
    name,
    client,
    description,
    cost,
    date,
  });

  newSession.save()
  .then(() => res.json('Sessions added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Session.findById(req.params.id)
    .then(session => res.json(session))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Session.findByIdAndDelete(req.params.id)
    .then(() => res.json('Session deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Session.findById(req.params.id)
    .then(session => {
      session.name = req.body.name;
      session.client = req.body.client;
      session.description = req.body.description;
      session.cost = Number(req.body.cost);
      session.date = Date.parse(req.body.date);

      session.save()
        .then(() => res.json('session updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;