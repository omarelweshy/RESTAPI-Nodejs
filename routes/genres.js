const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findbyId(req.params.id);

    if (!genre) return res.status(404).send("Not Found");

    res.send(genre);
});

router.post('/', async (req, res) => {
    const { error } = ValidateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    res.send(genre);
});

router.put('/:id', async (req, res) => {
    const { error } = ValidateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findOneAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });
    
    if (!genre) return res.status(404).send("Not Found");

    res.send(genre); 
});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findOneAndRemove(req.params.id)

    if (!genre) return res.status(404).send("Not Found");

    res.send(genre);
});


function ValidateGenre(genre) {
    const shecma = Joi.object({
        name: Joi.string().min(3).required()
    });

    return shecma.validate(genre)
}

module.exports = router;