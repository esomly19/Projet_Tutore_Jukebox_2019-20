let fileDattente = [];
let start = false;

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

/**function lireMusique(musique){
    console.log("creation en cours")
    let content = "";
    let rep = "musique/"+musique
     content =`
    <source src="${rep}">
    `
    $("#musique").html(content);
    return true
}*/

/**
 * Lance la lecture d'une nouvelle musique et créer l'element html
 * @param musique
 */
function lireMusique(musique){
    let content = `<div class="lecteur">
        <button class="control btn btn-primary" onclick="play(this)">Pause</button>
        <button class="control btn btn-danger" onclick="resume()">Restart</button>
        <span class="volume">
            <a class="stick1 btn badge-info" id="vol0" onclick="volume(0)"></a>
            <a class="stick2 btn badge-info" id="vol1" onclick="volume(0.3)"></a>
            <a class="stick3 btn badge-info"  id="vol2" onclick="volume(0.5)"></a>
            <a class="stick4 btn badge-info" id="vol3" onclick="volume(0.7)"></a>
            <a class="stick5 btn badge-info" id="vol4" onclick="volume(1)"></a>
        </span>
        <div>
            <div id="progressBarControl">
                 <div id="progressBar">Pas de lecture</div>
            </div>
                <span id="progressTime">00:00</span>
        </div>
</div>`
    $("#infoMusique").html(content)
    document.getElementById("musique").setAttribute('src', "musique/"+musique)
    $("#spinkit").html("");

}
/**
 * ajout d'une musique dans la file d'attente
 * @param musique
 */
function ajouterMusique(musique) {
    if(fileDattente.indexOf(musique) === -1){
        fileDattente.push(musique)
        if(fileDattente.length === 1) {
            lireFileDattente()
        }
        console.log(musique+" add ")
    }else {
        console.log("already add")
    }
}

/**
 * permet de lire la prochaine musique de la file d'attente
 * @returns {boolean}
 */
function lireFileDattente() {
    if(lireMusique(fileDattente[0])) {
        return true
    }
}

function play(control) {
    let player = document.getElementById("musique")

    if (player.paused) {
        player.play();
        control.textContent = 'Pause';
    } else {
        player.pause();
        control.textContent = 'Play';
    }
}

function resume() {
    let player = document.getElementById("musique")

    player.currentTime = 0;
    player.pause();
}

function volume(vol) {
    let player = document.getElementById("musique")
    player.volume = vol;
    let color = "#ff9607";
    let off = "#999"
    if(vol === 1){
        document.getElementById("vol0").style.background = color;
        document.getElementById("vol1").style.background = color;
        document.getElementById("vol2").style.background = color;
        document.getElementById("vol3").style.background = color;
        document.getElementById("vol4").style.background = color;
    }else {
        if(vol === 0.7) {
            document.getElementById("vol4").style.background = off;
            document.getElementById("vol0").style.background = color;
            document.getElementById("vol1").style.background = color;
            document.getElementById("vol2").style.background = color;
            document.getElementById("vol3").style.background = color;
        }else {
            if(vol ===0.5) {
                document.getElementById("vol3").style.background = off;
                document.getElementById("vol4").style.background = off;
                document.getElementById("vol0").style.background = color;
                document.getElementById("vol1").style.background = color;
                document.getElementById("vol2").style.background = color;
            }else {
                if (vol === 0.3){
                    document.getElementById("vol2").style.background = off;
                    document.getElementById("vol3").style.background = off;
                    document.getElementById("vol4").style.background = off;
                    document.getElementById("vol0").style.background = color;
                    document.getElementById("vol1").style.background = color;
                }else {
                    document.getElementById("vol0").style.background = off;
                    document.getElementById("vol1").style.background = off;
                    document.getElementById("vol2").style.background = off;
                    document.getElementById("vol3").style.background = off;
                    document.getElementById("vol4").style.background = off;
                }
            }
        }
    }
}

function update(player) {
    let duration = player.duration;    // Durée totale
    let time     = player.currentTime; // Temps écoulé
    let fraction = time / duration;
    let percent  = Math.ceil(fraction * 100);

    let progress = document.querySelector('#progressBar');

    progress.style.width = percent + '%';
    progress.textContent = percent + '%';
}

function formatTime(time) {
    let hours = Math.floor(time / 3600);
    let mins  = Math.floor((time % 3600) / 60);
    let secs  = Math.floor(time % 60);

    if (secs < 10) {
        secs = "0" + secs;
    }

    if (hours) {
        if (mins < 10) {
            mins = "0" + mins;
        }

        return hours + ":" + mins + ":" + secs; // hh:mm:ss
    } else {
        return mins + ":" + secs; // mm:ss
    }
    console.log(time)
    document.querySelector('#progressTime').textContent = formatTime(time);
}

$(document).ready( () => {
    let socket = io();
    socket.on('lireMusique', function (data) {
        ajouterMusique(data)
    })
    let player = document.getElementById("musique")
    player.addEventListener('canplaythrough', function () {
        player.play()
    })

    player.addEventListener('ended', function () {
        fileDattente.shift()
        lireFileDattente()
        player.play()
    })
    document.getElementById("on").addEventListener('click', function () {
        if (fileDattente.length == 0) {
            fileDattente=[]
            start = true
            if(start) {
                let content = `<div class='sk-wave'>
                                <div class='sk-rect sk-rect-1'></div>
                                <div class='sk-rect sk-rect-2'></div>
                                <div class='sk-rect sk-rect-3'></div>
                                <div class='sk-rect sk-rect-4'></div>
                                <div class='sk-rect sk-rect-5'></div>
                           </div>`
                $("#spinkit").html(content);
                let butOn = document.getElementById("on")
                butOn.className = "btn btn-danger start"
                butOn.textContent = "STOP"


            }else {
                console.log("nothing for the moment")
            }


        }
    })


})
