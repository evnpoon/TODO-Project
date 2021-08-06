const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/frontend'));
app.use(cors());

var TODOarray = [];

function createTODO(req) {
    const id = Math.floor((1+Math.random()) * 0x1000000000000).toString(36);
    const date = new Date().toISOString();
    const desc = req.body.description;
    return {
        id: id,
        dateTime: date,
        description: desc
    };
}

// Backend (POST /todo)
app.post('/todo', cors(), (req, res) => {
    const newTODO = createTODO(req);
    TODOarray.push(newTODO);
    res.send(res.statusCode);
});

// Backend (GET /todo)
app.get('/todo', cors(), (req, res) => {
    res.send(JSON.stringify(TODOarray));
});

// Backend (DELETE /todo/id)
app.delete('/todo/:id', cors(), (req, res) => {
    const toDel = TODOarray.find(item => item.id === req.params.id);
    if(!toDel) {
        res.status(404).send('TODO DNE');
    } else {
        const index = TODOarray.indexOf(toDel);
        TODOarray.splice(index, 1);
        res.send(res.statusCode);
    }
});

// Backend (GET /)
app.get('/', cors(), (req, res) => {
    res.sendFile(__dirname + '/frontend/frontend.html');
});

module.exports = app;