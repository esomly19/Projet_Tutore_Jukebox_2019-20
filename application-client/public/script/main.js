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
            <img src="cover.jpg" class="card-img" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
            <h5 class="card-title">${msq.titre}</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <button class="btn btn-primary" text="ajouter" id="${msq.chemin}" onclick="ajouterMusique('${msq.chemin} ')">ajouter</button>
            </div>
        </div>
        </div>
    </div>`)
    $("#playlist").html(content);

}

function ajouterMusique(musique) {

        let xhr = $.ajax({
            url: "https://jukebox-musique.herokuapp.com/ajouterMusique",
            method: 'POST',
            data: musique
        })
        console.log(xhr)
    

}

function askPseudo() {

}


$(document).ready( () => {

    let urlPlaylist = "https://projetjukebox.herokuapp.com/playlist/1";
    sendXhr(urlPlaylist).then(function (data) {
        return showMusique(data)
    })
})