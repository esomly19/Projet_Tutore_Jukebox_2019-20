
let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
let bodyParser = require('body-parser');


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});

client.connect();
app.post('/ajouterMusique', function (req, res) {
    console.log(req)
    io.emit('lireMusique', req.data.musique)
    res.send('wp');
})


//redirection vers la page principale
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});




server.listen(process.env.PORT || 3000);