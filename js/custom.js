let playRange=document.querySelector("#playrange");
let music=document.querySelector("#music");
let btnPlay=document.querySelector("#btnplay");
let btnPlayIcon=document.querySelector("#btnplay>i");
let musicCurrentTime=document.querySelector("#currenttime");
let musicDurationTime=document.querySelector("#durationtime");
document.addEventListener("DOMContentLoaded", function(event) {
    musicDurationTime.innerText="0"+(music.duration/60).toFixed(2).replace(".",":");
    playRange.addEventListener("change",()=>{
        let currentTime=(playRange.value/playRange.attributes["max"]["value"])*music.duration;
        music.currentTime=currentTime;
    });
    btnPlay.addEventListener("click",()=>{
        if(btnPlayIcon.classList.contains("fa-play-circle")){
            btnPlayIcon.classList.remove("fa-play-circle");
            btnPlayIcon.classList.add("fa-pause-circle");
            music.play();
        }else{
            btnPlayIcon.classList.remove("fa-pause-circle");
            btnPlayIcon.classList.add("fa-play-circle");
            music.pause();
        }
       let timeIntervale=setInterval(function(){
           musicCurrentTime.innerText="0"+(music.currentTime/60).toFixed(2).replace(".",":");
            playRange.value=music.currentTime/music.duration*playRange.attributes["max"]["value"];
            if(music.currentTime==music.duration){
                clearInterval(timeIntervale);
            }
        },500);
        
    })
});

