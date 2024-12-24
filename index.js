window.onload = function () {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingVideo = document.getElementById('loading-video');
    const mainContent = document.getElementById('main-content');
    const playRadio = document.getElementById('play-radio');
    const stopRadio = document.getElementById('stop-radio');
    const nextRadio = document.getElementById('next-radio');
    const soundBar = document.getElementById('sound-bar');
    const songTitleElement = document.getElementById('song-title');

    let audio = null; // Objet Audio
    let currentSongs = []; // Playlist courante
    let currentSongIndex = 0; // Index de la chanson courante

    const songs = [
        'https://www.dropbox.com/scl/fi/s86no7pve8uk09pji2ubn/SpotifyMate.com-Everybody-Wants-To-Rule-The-World-Tears-For-Fears.mp3?dl=1',
        'https://www.dropbox.com/scl/fi/z69alsg007x1ldip4huk3/SpotifyMate.com-Forever-Young-Alphaville.mp3?dl=1',
        'https://www.dropbox.com/scl/fi/u53sp8isr54wo3rwnphhm/SpotifyMate.com-Holding-Out-for-a-Hero-From-_Footloose_-Soundtrack-Bonnie-Tyler.mp3?dl=1',
        'https://www.dropbox.com/scl/fi/n1m2r0bicsa4d0zp1482e/SpotifyMate.com-I-Want-It-That-Way-Backstreet-Boys.mp3?dl=1',
        'https://www.dropbox.com/scl/fi/jqn3gx4dme0a623sqb4k6/SpotifyMate.com-We-Will-Rock-You-Queen.mp3?dl=1',
    ];
    const ads = [
        'https://www.dropbox.com/scl/fi/vjswy0yd499vx4v8k2hux/pub.mp3.mp4?rlkey=qyrp80ahskb0smxfagdpzyy8z&st=0h6xfig5&dl=1',
        'https://www.dropbox.com/scl/fi/7463kz8ztcttm3xe0kc6m/videoplayback-1.m4a?rlkey=4pw212fm2zlbp26u7972014br&st=83hcwgab&dl=1',
        'https://www.dropbox.com/scl/fi/v06kz8t77wbiyqwktiwst/videoplayback-2.m4a?rlkey=zzxge7gdnubv0n1mrvosurybt&st=88g8te8n&dl=1',
        'https://www.dropbox.com/scl/fi/t2n5mij67x6fsa5723pix/videoplayback-3.m4a?rlkey=w2y6lhcm7wgd3zetwnsxkoexr&st=15ralvje&dl=1',
        'https://www.dropbox.com/scl/fi/ontw4eikqroh4d6uo0k0w/videoplayback.m4a?rlkey=qdtg28wh32r4vxbywjujoy5is&st=rarn507s&dl=1',
    ];

    const videoDuration = 8; // Durée de la vidéo de chargement

    // Transition écran de chargement
    loadingVideo.oncanplay = function () {
        loadingVideo.play();
    };

    setTimeout(() => {
        loadingScreen.style.opacity = 0;
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
        }, 1000);
    }, videoDuration * 1000);

    // Chargement des fichiers audio
const playSound = new Audio('https://www.dropbox.com/scl/fi/vdbsxrrnhz5vcgh9ld3ls/buttons.mp4?rlkey=eee8mp6hdfzlnzjqcjpvd5vou&st=963ow3qq&dl=1');  // Remplace par le chemin de ton fichier audio Play
const stopSound = new Audio('https://www.dropbox.com/scl/fi/vdbsxrrnhz5vcgh9ld3ls/buttons.mp4?rlkey=eee8mp6hdfzlnzjqcjpvd5vou&st=963ow3qq&dl=1');  // Remplace par le chemin de ton fichier audio Stop
const nextSound = new Audio('https://www.dropbox.com/scl/fi/vdbsxrrnhz5vcgh9ld3ls/buttons.mp4?rlkey=eee8mp6hdfzlnzjqcjpvd5vou&st=963ow3qq&dl=1');  // Remplace par le chemin de ton fichier audio Next

// Bouton Play
playRadio.addEventListener('click', function () {
    if (!audio || audio.paused) {
        playSound.play(); // Joue le bruit du bouton Play
        startRadio();
    }
});

// Bouton Stop
stopRadio.addEventListener('click', function () {
    stopSound.play(); // Joue le bruit du bouton Stop
    stopRadioFunction();
});

// Bouton Next
nextRadio.addEventListener('click', function () {
    nextSound.play(); // Joue le bruit du bouton Next
    playNextSongOrAd();
});

    // Démarre la radio
    function startRadio() {
        soundBar.style.display = 'block';
        soundBar.style.animation = 'appear 1s ease-out forwards';
        currentSongs = shuffleArray(songs); // Mélanger les chansons
        currentSongIndex = 0;
        playCurrentSong();
    }

    // Arrête la radio
    function stopRadioFunction() {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        soundBar.style.animation = 'disappear 1s ease-out forwards';
        setTimeout(() => {
            soundBar.style.display = 'none';
        }, 1000);
    }

    // Joue la chanson courante
    function playCurrentSong() {
        if (!audio) {
            audio = new Audio();
        }
        audio.src = currentSongs[currentSongIndex];
        audio.play();
        updateSongTitle(audio.src);

        audio.onended = function () {
            playNextSongOrAd();
        };
    }

    // Passe à la chanson suivante ou à une publicité
    function playNextSongOrAd() {
        currentSongIndex++;
        if (currentSongIndex < currentSongs.length) {
            playCurrentSong();
        } else {
            playAd();
        }
    }

    // Joue une publicité
    function playAd() {
        const adIndex = Math.floor(Math.random() * ads.length);
        audio.src = ads[adIndex];
        audio.play();
        updateSongTitle('Publicité');

        audio.onended = function () {
            currentSongIndex = 0; // Redémarre la playlist
            playCurrentSong();
        };
    }

    // Mélange un tableau
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Met à jour le titre de la chanson
    function updateSongTitle(songPath) {
        const songName = songPath.split('/').pop().split('-').slice(1).join(' ');
        songTitleElement.innerHTML = `<span>${songName}</span>`;
    }
};
