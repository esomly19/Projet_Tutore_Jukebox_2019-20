const playlist = []
let pseudo = ""
let id = ""
let socket;

//envoie une requête asynchrone XHR
//params : urlSend = URL de l'api, success = fonction a appeler en cas de succés (callback)
//return une promesse
function sendXhr(urlSend) {
    return new Promise(((resolve, reject) => {
        let xhr = $.ajax({
            url: urlSend,
            method: 'GET',
            dataType: 'json'
        }).done(data => {
            resolve(data);
        }).fail(error => {
            reject("Problème de données")
        })
    }))
}

function showMusique(musique) {
    let content = "";
    musique.forEach(msq => content += `
    <div class="card mb-3">
        <div class="row no-gutters">
        <div class="col-md-2">
            <img src="${msq["Cover_album_big"]}" class="card-img" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
            <h5 class="card-title">${msq["Titre"]}</h5>
            <button class="btn btn-primary" text="ajouter" id="${msq["Titre_album"]}" onclick="ajouterMusique('${msq["Titre_album"].replace(/\n|\r/g,'').replace("'", "")}, ${msq["Titre"]}, ${msq["Cover_album_big"]}')" onclick="this.disabled = 'disabled'">ajouter</button>
            </div>
        </div>
        </div>
    </div>`)
    $("#playlist").html(content);

}

/**
 * permet d'envoyer une musique au jukebox
 * en fonction du message de retour renvoyer par le serveur un message est envoyé pour tous les utilisateurs 
 * en ligne ou en cas d'erreur un message d'erreur uniquement a la personne ayant mis le msg
 * @param {*} musique 
 */
function ajouterMusique(musique, titre, image) {
        $.ajax({
            url: "https://jukebox-musique.herokuapp.com/ajouterMusique",
            method: 'POST',
            data: {
                "musique": musique,
                "titre": titre,
                "image": image,
                "pseudo": pseudo
            },
        }).then(function(data) {
           if(data === "true") {
                $.notify("Votre musique a été envoyé", "info")
           }else{
                $.notify("Un problème est survenu", "error")
           }
        })
}

function askPseudo() {
    let content = `
    <div>
        <label class="h1">Entrer un pseudo</label>
        <input type=text id="pseudo" class="input-group-text"></input>
        <button onclick="connection()" class="btn btn-primary">valider</button>
    </div>
    `;
    $("#playlist").html(content);
}

function connection() {
    socket = io.connect("https://projetjukebox.herokuapp.com/")
    pseudo = document.getElementById("pseudo").value
    let content = `
            <div class="card mb-3">
                <div class="row no-gutters">
                    <div class="card-body">
                        <h5 class="card-title">information JukeBox</h5>
                        <div>
                            <h6>Musique actuelle : </h4><p id="titrejuke"></p>
                            <h7>Nombre de musique dans la file d'attente : </h7><p id="nbFile">0</p>
                        </div>
                    </div>
                </div>
            </div>`
    $("#infoJuke").html(content)

    id = generateUUID()
    socket.on('connect', function() {
        alert('marche')
        socket.emit('user', {'pseudo': pseudo, 'id_user': id})
        $.notify(pseudo+" vous êtes avec nous !", "success")

        socket.on('NewMusique', function (data) {
            data = JSON.stringify(Object.values(data)).replace("]",'').replace("[",'').replace('"', '').split(',')
            $.notify(data[1]+" est ajouté dans la file grace a "+data[3], "success")
            document.getElementById("nbFile").innerText = data[4].replace('"', "");
            
        })
        socket.on('currentMusique', function(data) {
            data = JSON.stringify(Object.values(data)).replace("]",'').replace("[",'').replace('"', '').split(',')
            $.notify("Musique joué : "+data[1], 'info')
            document.getElementById("titrejuke").innerText = data[1]
        })

    })

    document.getElementById("nav").innerHTML = "Jukebox - "+pseudo
    let urlPlaylist = "https://projetjukebox.herokuapp.com/playlist/1";
    sendXhr(urlPlaylist).then(function (data) {
        musiqueInformation(data)
    })
}

function musiqueInformation(data) {
    data.forEach(musique =>
        $.ajax({
            url: "https://jukebox-admin.herokuapp.com/getMusic",
            method: 'GET',
            headers: {


                "Musicname": musique.titre,
                "chemin": musique.chemin
            }
            }).then(function(data) {
                let jData = JSON.parse(data)
                jData['Titre_album'] = musique.chemin
                jData['Titre'] = jData['Titre'].replace("'", " ").replace("n'", "n")
                playlist.push(jData)
            }).then(function() {
                showMusique(playlist)
            })
    )        
}

function generateUUID()
{
	let d = new Date().getTime();
	
	if( window.performance && typeof window.performance.now === "function" )
	{
		d += performance.now();
	}
	
	let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c)
	{
		var r = (d + Math.random()*16)%16 | 0;
		d = Math.floor(d/16);
		return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	});

return ""+uuid;
}


$(document).ready( () => {
    askPseudo()
    
})
