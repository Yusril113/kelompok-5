const express = require('express');
const cors = require('cors');
const { error } = require('console');

const app = express();
const PORT = 3300;

idseq = 3;
let reviews = [
    { id: 1, film_id: '2baf70d1 −42bb−4437−b551−e5fed5a87abe', nama: 'andi', rating: 10, comment: 'wuaapik puool' },
    { id: 2, film_id: '12cfb892-aac0-4c5b-94af-521852e46d6a', nama: 'suki', rating: 7, comment: 'film e uelek' },
    { id: 3, film_id: '58611129-2dbc-4a81-a72f-77ddfc1b1b49', nama: 'budi', rating: 7, comment: 'film e uelek' },
    { id: 3, film_id: 'ea660b10-85c4-4ae3-8a5f-41cea3648e3e', nama: 'garaga', rating: 9, comment: 'sangat estetik' },
    { id: 3, film_id: '4e236f34-b981-41c3-8c65-f8c9000b94e7', nama: 'suki', rating: 6, comment: 'suangaaaaarrr' },
]

// middlewere
app.use(cors());
// 3
// middlewere express.json
app.use(express.json());
// route

app.get('/status', (req, res) => {
    res.json({
        ok: true,
        service: 'Ghibli-API',
        time: new Date().toISOString()
    });
});

app.get('/reviews', (req, res) => {
    res.json(reviews);
});

app.get('/reviews/:id', (req, res) => {
    const id = Number(req.params.id);
    const reviews = reviews.find(m => m.id === id);
    if (!reviews) return res.status(404).json({ error: 'reviews tidak ditemukan' });
    res.json(reviews);
});