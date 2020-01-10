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
    musique.forEach(msq => content += `<div class="card">
            <form action="https://salty-tundra-73298.herokuapp.com/ajouterMusique" method="post">
            <div class="form-group">
                <label class="card-title">${msq.titre}</label>
                <input type="hidden" value="${msq.chemin}" name="id_musique" >
                <input type="submit" value="ajouter" class="btn btn-primary">
            </div>
            </form>
            </div>`)
    $("#playlist").html(content);

}
$(document).ready( () => {
    let urlPlaylist = "https://projetjukebox.herokuapp.com/playlist/1";
    sendXhr(urlPlaylist).then(function (data) {
        console.log(data)
        return showMusique(data)
    })
})