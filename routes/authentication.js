const express = require('express');
const User = require('../models/user.model');

const router = express.Router();

router.post('/register', function(req, res) {
    const {firstName, lastName, email, password} = req.body;
	
    const newUser = new User({firstName, lastName, email, password});
    
    newUser.save().then((data) => console.log(data)).catch((error) => console.log('Error: ', error));

    res.json({'message': 'Inregistrare cu succes, utilizatorul a fost creat!'});
});

router.get('/register', function(req, res){
    const allUsers = User.find()
    .then(data => res.json(data))
    .catch(error =>console.log('Error', error))
})
module.exports = router;