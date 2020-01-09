let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
let bodyParser = require('body-parser');


app.use(express.static(__dirname + '/script'));
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
});

client.connect();

//redirection vers la page principale
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

//permet de renvoyer la playlist d'un jukebox
app.get('/playlist/:id', function (req, res) {
    let requete = 'SELECT * FROM public.appartient inner join public.musique on musique.id = appartient.id_musique where id_playlist='+req.params.id+';'

    let listeMusique = []
    await client.query(requete, (err, res) => {
        let listeMusique = [];
        if (err) throw err;
        for (let row of res.rows) {
            listeMusique.push(JSON.stringify(row))

        }

        return listeMusique

    });

    console.log(result.fields)
    client.end()

})

server.listen(process.env.PORT || 3000);