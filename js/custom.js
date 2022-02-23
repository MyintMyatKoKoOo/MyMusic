let playRange = document.querySelector("#playrange");
let btnPlay = document.querySelector("#btnplay");
let music = document.createElement("audio");
let btnNext = document.querySelector("#btnnext");
let chgimg = document.querySelector("#changeimg");
let btnPrev = document.querySelector("#btnpre");
let btnPlayIcon = document.querySelector("#btnplay>i");
let musicCurrentTime = document.querySelector("#currenttime");
let musicDurationTime = document.querySelector("#durationtime");
let index = 0;
let musics = [{
        name: "countryroad",
        path: "music/countryroad.mp3",
        image: "img/countryroad.jpg",
        artist: "Jhon Denver"
    },
    {
        name: "hotarubi",
        path: "music/hotarubi.mp3",
        image: "img/hotarubi.jpg",
        artist: "Wagakki Band"

    }, {
        name: "lemon",
        path: "music/lemon.mp3",
        image: "img/lemon.jpg",
        artist: "Kenshi Yonezu"

    }, {
        name: "moonlightshadow",
        path: "music/moonlightshadow.mp3",
        image: "img/moonlightshadow.jpg",
        artist: "Mike Oldfield"

    }, {
        name: "sunflower",
        path: "music/sunflower.mp3",
        image: "img/sunflower.jpg",
        artist: "Post Malone"

    }
];
document.addEventListener("DOMContentLoaded", () => {
    playRange.addEventListener("change", playingRange);
    btnPlay.addEventListener("click", control);
    btnNext.addEventListener("click", next);
    btnPrev.addEventListener("click", prev);
    loopmusiclist();
});

function playingRange() {
    music.currentTime = (playRange.value / 100) * music.duration;
    playRange.value = music.currentTime / music.duration * 100;
}

function loadMusic(index) {
    music.src = musics[index].path;
    chgimg.src = musics[index].image;
    if (!btnPlayIcon.classList.contains("fa-play-circle")) {
        btnPlayIcon.classList.remove("fa-pause-circle");
        btnPlayIcon.classList.add("fa-play-circle");
    }
    chgimg.classList.remove("play");
    document.querySelector("#musicname").innerText = musics[index].name;
}

function next() {
    if (index < musics.length - 1) {
        index++;
    } else {
        index = 0;
    }
    loadMusic(index);
}

function prev() {
    if (index > 0) {
        index--;

    } else {
        index = musics.length - 1;
    }
    loadMusic(index);
}
loadMusic(index);

function control() {
    if (btnPlayIcon.classList.contains("fa-play-circle")) {
        btnPlayIcon.classList.remove("fa-play-circle");
        btnPlayIcon.classList.add("fa-pause-circle");
        chgimg.classList.add("play");
        music.play();
    } else {
        btnPlayIcon.classList.remove("fa-pause-circle");
        btnPlayIcon.classList.add("fa-play-circle");
        chgimg.classList.remove("play");
        music.pause();
    }
    let timeIntervale = setInterval(function() {
        playRange.value = music.currentTime / music.duration * 100;
        //    musicCurrentTime.innerText=(music.currentTime/60).toString().slice(0,1)+":"+(music.currentTime%60).toString().slice(0,2);
        let minute = ((music.currentTime / 60).toString().slice(0, 2)).replace(".", "");
        let second = ((music.currentTime % 60).toString().slice(0, 2)).replace(".", "");
        if (second < 10) {
            second = "0" + second;
        }
        if (minute < 10) {
            minute = "0" + minute;
        }
        musicCurrentTime.innerText = minute + ":" + second;

        // console.log((music.currentTime/60).toString().slice(0,1),(music.currentTime%60).toString());
        if (music.currentTime == music.duration) {
            clearInterval(timeIntervale);
            chgimg.classList.remove("play");
        }
    }, 1000);
    let durationMinute = (music.duration / 60).toString().slice(0, 2).replace(".", "");
    let durationSecond = (music.duration % 60).toString().slice(0, 2).replace(".", "");
    if (durationMinute < 10) {
        durationMinute = "0" + durationMinute;
    }
    if (durationSecond < 10) {
        durationSecond = "0" + durationSecond;
    }
    musicDurationTime.innerText = durationMinute + ":" + durationSecond;
}

function loopmusiclist() {
    let str = "";
    musics.forEach((data,index) => {
        str += ` <button class="rounded-0 border-0 p-0" onclick="loadMusic(${index})"> <div class="row my-0 p-3 border-bottom">
        <div class="col-2">
          <img class="img-fluid rounded-circle" src="${data.image}
          " alt="">
        </div>
        <div class="col-9 text-start">
         <h5 class="card-title">${data.name}</h5>
          <h6 class="card-subtitle">${data.artist}</h6>  
        
        </div>
      </div></button> `;


    });
    document.querySelector("#musiclist").innerHTML = str;
}