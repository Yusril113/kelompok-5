const express = require('express');
const cors = require('cors');
const { error } = require('console');

const app = express();
const PORT = 3300;

let idSeq = 6;
let reviews = [
    { id: 1, film_id: '2baf70d1 −42bb−4437−b551−e5fed5a87abe', nama: 'andi', rating: 10, comment: 'wuaapik puool' },
    { id: 2, film_id: '12cfb892-aac0-4c5b-94af-521852e46d6a', nama: 'suki', rating: 7, comment: 'film e uelek' },
    { id: 3, film_id: '58611129-2dbc-4a81-a72f-77ddfc1b1b49', nama: 'budi', rating: 7, comment: 'film e uelek' },
    { id: 4, film_id: 'ea660b10-85c4-4ae3-8a5f-41cea3648e3e', nama: 'garaga', rating: 9, comment: 'sangat estetik' },
    { id: 5, film_id: '4e236f34-b981-41c3-8c65-f8c9000b94e7', nama: 'suki', rating: 6, comment: 'suangaaaaarrr' },
]

// middlewere
app.use(cors());
// 3
// middlewere express.json
app.use(express.json());


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
    const review = reviews.find(r => r.id === id);
    if (!review) return res.status(404).json({ error: 'reviews tidak ditemukan' });
    res.json(review);
});

app.post('/reviews', (req, res) => {
    const { film_id, nama, rating, comment} = req.body || {};
    if (!film_id || !nama || !rating || !comment) {
        return res.status(400).json({ error: 'film_id, nama, rating, comment wajib diisi boy!' });
    }
    const newreview = { id: idSeq++, film_id, nama, rating, comment };
    reviews.push(newreview);
    res.status(201).json(newreview);
});

app.put('/reviews/:id', (req, res) => {
    const id = Number(req.params.id);
    const reviewIndex = reviews.findIndex(r => r.id === id);
    if (reviewIndex === -1) {
        return res.status(404).json({ error: 'review tidak ditemukan' });
    }
    const { film_id, nama, rating, comment } = req.body || {};
    const updatereview = { id, film_id, nama, rating, comment };
    reviews[reviewIndex] = updatereview;
    res.json(updatereview);
});

app.delete('/reviews/:id', (req, res) => {
    const id = Number(req.params.id);
    const reviewIndex = reviews.findIndex(r => r.id === id);
    if (reviewIndex === -1) {
        return res.status(404).json({ error: 'reviews tidak ditemukan' });
    }
    reviews.splice(reviewIndex, 1);
    res.status(204).send();
});


// middleware fallback untuk menangani rute 404 Not found 
app.use((req, res) => {
    res.status(404).json({ error: 'Rute tidak ditemukan' });
});
// 4
app.use((err, req, res, _next) => {
    console.error('[EROR]')
    res.status(500).json({ error: 'Terjadi kesalahan di server' });
});
// Start server
app.listen(PORT, () => {
    console.log(`server aktif di http://localhost:${PORT}/reviews/:id`);
});