// ===============================
// SPOTIFY CLONE - JAVASCRIPT
// ===============================


// Select elements
const playButton = document.querySelector(".play-main");
const playIcon = playButton.querySelector("i");

const progressFill = document.querySelector(".progress-fill");

const currentTime = document.querySelector(".progress span:first-child");
const totalTime = document.querySelector(".progress span:last-child");

const songTitle = document.querySelector(".song-info h4");
const artistName = document.querySelector(".song-info p");
const songImage = document.querySelector(".song-info img");


// ===============================
// SONG DATA
// ===============================

const songs = [
    {
        title: "Night Changes",
        artist: "One Direction",
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500",
        duration: "3:46"
    },

    {
        title: "Blinding Lights",
        artist: "The Weeknd",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500",
        duration: "3:20"
    },

    {
        title: "Starboy",
        artist: "The Weeknd",
        image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500",
        duration: "3:50"
    },

    {
        title: "Chill Vibes",
        artist: "Lo-Fi Beats",
        image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500",
        duration: "4:12"
    }
];


// Current song
let currentSong = 0;

// Playing status
let isPlaying = false;

// Progress
let progress = 0;

// Timer
let timer;


// ===============================
// PLAY / PAUSE
// ===============================

playButton.addEventListener("click", function () {

    if (isPlaying) {

        pauseSong();

    } else {

        playSong();

    }

});


function playSong() {

    isPlaying = true;

    // Change icon
    playIcon.classList.remove("fa-play");
    playIcon.classList.add("fa-pause");

    startProgress();

}


function pauseSong() {

    isPlaying = false;

    // Change icon
    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");

    clearInterval(timer);

}


// ===============================
// PROGRESS BAR
// ===============================

function startProgress() {

    clearInterval(timer);

    timer = setInterval(function () {

        progress += 0.5;

        if (progress >= 100) {

            progress = 0;

            nextSong();

        }

        progressFill.style.width = progress + "%";

        updateTime();

    }, 500);

}


// ===============================
// UPDATE TIME
// ===============================

function updateTime() {

    let seconds = Math.floor((progress / 100) * 226);

    let minutes = Math.floor(seconds / 60);

    seconds = seconds % 60;

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    currentTime.textContent = minutes + ":" + seconds;

}


// ===============================
// NEXT SONG
// ===============================

function nextSong() {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);

    progress = 0;

    progressFill.style.width = "0%";

    if (isPlaying) {
        startProgress();
    }

}


// ===============================
// PREVIOUS SONG
// ===============================

function previousSong() {

    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);

    progress = 0;

    progressFill.style.width = "0%";

}


// ===============================
// LOAD SONG
// ===============================

function loadSong(index) {

    const song = songs[index];

    songTitle.textContent = song.title;

    artistName.textContent = song.artist;

    songImage.src = song.image;

    totalTime.textContent = song.duration;

}


// ===============================
// NEXT / PREVIOUS BUTTONS
// ===============================

const nextButton = document.querySelector(
    ".controls button:nth-child(4)"
);

const previousButton = document.querySelector(
    ".controls button:nth-child(2)"
);


nextButton.addEventListener("click", function () {

    nextSong();

});


previousButton.addEventListener("click", function () {

    previousSong();

});


// ===============================
// MUSIC CARD PLAY BUTTONS
// ===============================

const musicCards = document.querySelectorAll(".music-card");

musicCards.forEach(function (card, index) {

    const button = card.querySelector(".play-button");

    if (button) {

        button.addEventListener("click", function (event) {

            event.stopPropagation();

            currentSong = index % songs.length;

            loadSong(currentSong);

            progress = 0;

            progressFill.style.width = "0%";

            playSong();

        });

    }

});


// ===============================
// QUICK PLAY BUTTONS
// ===============================

const quickCards = document.querySelectorAll(".quick-card");

quickCards.forEach(function (card, index) {

    const button = card.querySelector("button");

    button.addEventListener("click", function () {

        currentSong = index % songs.length;

        loadSong(currentSong);

        progress = 0;

        progressFill.style.width = "0%";

        playSong();

    });

});


// ===============================
// PROGRESS BAR CLICK
// ===============================

const progressBar = document.querySelector(".progress-bar");

progressBar.addEventListener("click", function (event) {

    const width = progressBar.clientWidth;

    const clickPosition = event.offsetX;

    progress = (clickPosition / width) * 100;

    progressFill.style.width = progress + "%";

    updateTime();

});


// ===============================
// VOLUME CONTROL
// ===============================

const volumeBar = document.querySelector(".volume-bar");

const volumeFill = document.querySelector(".volume-bar div");


volumeBar.addEventListener("click", function (event) {

    const width = volumeBar.clientWidth;

    const clickPosition = event.offsetX;

    const volume = (clickPosition / width) * 100;

    volumeFill.style.width = volume + "%";

});


// ===============================
// LIKE BUTTON
// ===============================

const heart = document.querySelector(".song-info > i");

heart.addEventListener("click", function () {

    if (heart.classList.contains("fa-regular")) {

        heart.classList.remove("fa-regular");

        heart.classList.add("fa-solid");

        heart.style.color = "#1ed760";

    } else {

        heart.classList.remove("fa-solid");

        heart.classList.add("fa-regular");

        heart.style.color = "#aaa";

    }

});


// ===============================
// SHUFFLE BUTTON
// ===============================

const shuffleButton = document.querySelector(
    ".controls button:first-child"
);

shuffleButton.addEventListener("click", function () {

    currentSong = Math.floor(Math.random() * songs.length);

    loadSong(currentSong);

    progress = 0;

    progressFill.style.width = "0%";

    playSong();

});


// ===============================
// INITIAL SONG
// ===============================

loadSong(currentSong);