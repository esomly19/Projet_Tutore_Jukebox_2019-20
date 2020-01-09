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
    musique.forEach(msq => content += `<p>${msq.titre}</p>`)
    console.log(musique)
    console.log(content)
    $("#playlist").html(content);

}

/**Appelé lorsque le DOM est chargé
document.addEventListener("DOMContentLoaded", function () {
    let path = window.location.pathname.split('/');
    console.log(path)
    let play = sendXhr("https://projetjukebox.herokuapp.com/playlist/1")
    console.log("coucou")
    console.log(play.data)
});*/

$(document).ready( () => {
    let urlPlaylist = "https://projetjukebox.herokuapp.com/playlist/1";
    sendXhr(urlPlaylist).then(function (data) {
        console.log(data)
        return showMusique(data)
    })
})