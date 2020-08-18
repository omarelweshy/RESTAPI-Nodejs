const express = require('express');
const router = express.Router();

const genres = [
    { id: 1, genre: "genre1"},
    { id: 2, genre: "genre2"},
    { id: 3, genre: "genre3"},
];

router.get('/', (req, res) => {
    res.send('Hello');
});

router.get('/api/genres', (req, res) => {
    res.send(genres);
});

router.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("Not Found");
    res.send(genre);
});

router.post('/api/genres', (req, res) => {
    const { error } = ValidateGenre(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        genre: req.body.genre
    }
    genres.push(genre);
    res.send(genre);
});

router.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("Not Found");

    const { error } = ValidateGenre(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    genre.genre = req.body.genre;
    res.send(genre); 
});

router.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("Not Found");

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genres);
});


function ValidateGenre(genre) {
    const shecma = Joi.object({
        genre: Joi.string().min(3).required()
    });

    return shecma.validate(genre)
}

module.exports = router;