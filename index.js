import express from 'express';
import data from './data/data.json';

const app = express();
const PORT = 3000;

app.use(express.static('public'));

//method to use JSON
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/images', express.static('images'));

app.get('/', (req, res) =>
    res.json(data)
);

// JSON data
// {"hello": "JSON is cool"}
// URLEncoded data
// hello=URLEncoded+is+cool

app.post('/newItem', (req, res) => {
    console.log(req.body);
    res.send(req.body);
})

app.get('/item/:id', (req, res, next) => {
    // this is a middleware that pulls the data
    console.log(req.params.id);
    let user = Number(req.params.id);
    console.log(user);
    console.log(data[user]);
    // middleware that uses the req object
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);
    // everything above is middleware
    res.send(data[user]);
    next();
}, (req, res) =>
    console.log('Did you get the right data?')
);

app.put('/item', (req, res) =>
    res.send(`a put request with /newIrem route on port ${PORT}`)
);

app.route('/item')
    .get((req, res) =>
        res.send(`a get request with /item route on port ${PORT}`)
    )
    .put((req, res) =>
        res.send(`a put request with /newIrem route on port ${PORT}`)
    )
    .delete((req, res) =>
        res.send(`a delete request with /item route on port ${PORT}`)
    );

// app.get('/item', (req, res) =>
//     res.send(`a get request with /item route on port ${PORT}`)
// );

app.delete('/item', (req, res) =>
    res.send(`a delete request with /item route on port ${PORT}`)
);

app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`);
    console.log(data);
});

