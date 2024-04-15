const express = require('express');
const router = express.Router();
const personsController = require('../controllers/persons.controller');
const { login } = require('../controllers/auth.controller');

router
    .get('/', personsController.get )
    .get('/:id', personsController.getById )
    .post('/', personsController.create )
    .put('/:id', personsController.update )
    .delete('/:id', personsController._delete )
    .post('/login', login);

module.exports = router;
