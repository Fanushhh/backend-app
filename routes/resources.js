const express = require('express');
const Resource = require('../models/resource.model');

// import obiect User din models ()

const router = express.Router();

router.post('/', function(req, res) {
    const {name, type, price,author,availability} = req.body;
	
    const newResource = new Resource({name, type, price,author,availability});
    
    newResource.save().then((data) => console.log(data)).catch((error) => console.log('Error: ', error));

    res.json({'message': 'Resursa a fost adaugata'});
});

router.get('/', function(req, res){
    const allUsers = Resource.find()
    .then(data => res.json(data))
    .catch(error =>console.log('Error', error))
})

module.exports = router;