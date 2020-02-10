const playlist = []
let pseudo = ""
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


/**function showMusique(musique) {
    let content = "";
    musique.forEach(msq => content += `<div class="card">
            <div class="form-group">
                <h1 class="card-title">${msq.titre}</h1>
                <input type="hidden" value="${msq.chemin}" name="id_musique" >
                <input type="submit" value="ajouter"  class="btn btn-primary">
            </div>
            </form>
            </div>`)
    $("#playlist").html(content);

}*/



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
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <button class="btn btn-primary" text="ajouter" id="${msq["Titre_album"]}" onclick="ajouterMusique('${msq["Titre_album"].replace(/\n|\r/g,'')}, ${msq["Titre"]}, ${msq["Cover_album_big"]}')">ajouter</button>
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
    console.log(musique)
        $.ajax({
            url: "https://jukebox-musique.herokuapp.com/ajouterMusique",
            method: 'POST',
            data: {
                "musique": musique,
                "titre": titre,
                "image": image
            },
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
    pseudo = document.getElementById("pseudo").value
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
                playlist.push(jData)
            }).then(function() {
                showMusique(playlist)
            })
    )        
}

$(document).ready( () => {
    askPseudo() 
    


})