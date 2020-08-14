const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
    { id: 1, genre: "genre1"},
    { id: 2, genre: "genre2"},
    { id: 3, genre: "genre3"},
];

app.get('/', (req, res) => {
    res.send('Hello');
});

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("Not Found");
    res.send(genre);
});

app.post('/api/genres', (req, res) => {
    const { error } = ValidateGenre(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        genre: req.body.genre
    }
    genres.push(genre);
    res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("Not Found");

    const { error } = ValidateGenre(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    genre.genre = req.body.genre;
    res.send(genre); 
});

app.delete('/api/genres/:id', (req, res) => {
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

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening port ${port}....`));