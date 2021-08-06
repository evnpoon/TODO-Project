const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.static(__dirname + '/frontend'));
app.use(cors());
app.set('views', './views');
app.set('view engine', 'pug');

const TODOarray = [];
var IDcount = 1;

function createTODO(req) {
    const id = IDcount;
    IDcount++;
    const date = new Date().toISOString();
    const desc = req.query.description;
    return {
        id: id,
        dateTime: date,
        description: desc
    };
}

// Backend (POST /todo)
app.post('/todo', (req, res) => {
    TODOarray.push(createTODO(req));
    res.send(res.statusCode);
});

// Backend (GET /todo)
app.get('/todo', (req, res) => {
    res.render('gettodo', {
        title: 'TODO Project - GET /todo',
        header1: 'TODO Array of Objects',
        pre1: JSON.stringify(TODOarray, null, ' ')
    })
});

// Backend (DELETE /todo/id)
app.delete('/todo/id', (req, res) => {
    const toDel = TODOarray.find(item => item.id == req.query.id);
    if(!toDel) {
        res.status(404).send('DNE');
    }
    const index = TODOarray.indexOf(toDel);
    TODOarray.splice(index, 1);
    res.send(res.statusCode);
});

// Frontend (GET /)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/frontend.html');
});

module.exports = app;