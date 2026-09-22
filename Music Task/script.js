
const songs = [
    {
        title: "Blinding Lights",
        artist: "The Weeknd",
        src: "./music/music.mp3",
        image: "https://picsum.photos/300/300?random=1"
    },
    {
        title: "Song 2",
        artist: "Artist 2",
        src: "./music/music2.mp3",
        image: "https://picsum.photos/300/300?random=2"
    }
];

let currentSong = 0;

const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songTitle = document.getElementById("song-title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const totalDurationEl = document.getElementById("total-duration");
const volume = document.getElementById("volume");

function loadSong(index) {
    const song = songs[index];

    songImage.src = song.image;
    songTitle.textContent = song.title;
    artist.textContent = song.artist;

    audio.src = song.src;
    audio.load();
}

function togglePlay() {
    if (audio.paused) {
        audio.play()
            .then(() => {
                playBtn.textContent = "⏸️";
            })
            .catch((error) => {
                console.log("Audio error:", error);
                alert("Song file nahi mil rahi. music folder check karo.");
            });
    } else {
        audio.pause();
        playBtn.textContent = "▶️";
    }
}

function nextSong() {
    currentSong = (currentSong + 1) % songs.length;

    loadSong(currentSong);

    audio.play()
        .then(() => {
            playBtn.textContent = "⏸️";
        })
        .catch(() => {});
}

function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;

    loadSong(currentSong);

    audio.play()
        .then(() => {
            playBtn.textContent = "⏸️";
        })
        .catch(() => {});
}

function formatTime(seconds) {
    if (isNaN(seconds)) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const secondsPart = Math.floor(seconds % 60);

    return `${minutes}:${secondsPart < 10 ? "0" + secondsPart : secondsPart}`;
}

audio.addEventListener("loadedmetadata", () => {
    progress.max = audio.duration;
    totalDurationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    progress.value = audio.currentTime;
    currentTimeEl.textContent = formatTime(audio.currentTime);
});

progress.addEventListener("input", () => {
    audio.currentTime = progress.value;
});

volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

audio.addEventListener("ended", () => {
    nextSong();
});

audio.addEventListener("error", () => {
    console.log("Audio file load nahi hui:", audio.src);
});

playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

loadSong(currentSong);

