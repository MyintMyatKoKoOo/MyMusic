let playRange=document.querySelector("#playrange");
let btnPlay=document.querySelector("#btnplay");
let music=document.createElement("audio");
let btnNext=document.querySelector("#btnnext");
let chgimg=document.querySelector("#changeimg");
let btnPrev=document.querySelector("#btnpre");
let btnPlayIcon=document.querySelector("#btnplay>i");
let musicCurrentTime=document.querySelector("#currenttime");
let musicDurationTime=document.querySelector("#durationtime");
let index=0;
let musics=[{
    name:"first",
    path:"music/1.mp3",
    image:"img/img1.jpg",
    artist:"Justin"
},
{
    name:"second",
    path:"music/2.mp3",
    image:"img/img2.jpg",
    artist:"CardiB"

},{
    name:"third",
    path:"music/3.mp3",
    image:"img/img3.jpg",
    artist:"Tokyo Band"

}
];
   document.addEventListener("DOMContentLoaded",()=>{
    playRange.addEventListener("change",playingRange);
    btnPlay.addEventListener("click",control);
    btnNext.addEventListener("click",next);
    btnPrev.addEventListener("click",prev);
    loopmusiclist();
   });
function playingRange(){
    let currentTime=(playRange.value/playRange.attributes["max"]["value"])*music.duration;
        music.currentTime=currentTime; 
}
function loadMusic(index){
    music.src=musics[index].path;
    chgimg.src=musics[index].image;
    if(!btnPlayIcon.classList.contains("fa-play-circle")){
        btnPlayIcon.classList.remove("fa-pause-circle");
        btnPlayIcon.classList.add("fa-play-circle");
    }
    chgimg.classList.remove("play");
    document.querySelector("#musicname").innerText=musics[index].name;
}
function next(){
    if(index<musics.length-1){
        index++;
    }else{
        index=0;
    }
    loadMusic(index);
}
function prev(){
    if(index>0){
        index--;

    }else{
        index=musics.length-1;
    }
    loadMusic(index);
}
loadMusic(index);
function control(){
        if(btnPlayIcon.classList.contains("fa-play-circle")){
            btnPlayIcon.classList.remove("fa-play-circle");
            btnPlayIcon.classList.add("fa-pause-circle");
            chgimg.classList.add("play");
            music.play();
        }else{
            btnPlayIcon.classList.remove("fa-pause-circle");
            btnPlayIcon.classList.add("fa-play-circle");
            chgimg.classList.remove("play");
            music.pause();
        }
       let timeIntervale=setInterval(function(){
           musicCurrentTime.innerText="0"+(music.currentTime/60).toFixed(2).replace(".",":");
            playRange.value=music.currentTime/music.duration*playRange.attributes["max"]["value"];
            if(music.currentTime==music.duration){
                clearInterval(timeIntervale);
            }
        },500);
        musicDurationTime.innerText="0"+(music.duration/60).toFixed(2).replace(".",":");
}
function loopmusiclist(){
    let str="";
    musics.forEach((data) => {
        str+=` <div class="row my-0 p-3 border-bottom">
        <div class="col-2">
          <img class="img-fluid rounded-circle" src="${data.image}
          " alt="">
        </div>
        <div class="col-9">
          <h5 class="card-title">${data.name}</h5>
          <h6 class="card-subtitle">Subtitle</h6> 
        </div>
      </div>`;
     
        
    }); 
    document.querySelector("#musiclist").innerHTML=str;
}
