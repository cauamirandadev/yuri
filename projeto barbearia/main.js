/* main.js */
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    // Check local storage for theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('ph-moon');
            themeIcon.classList.add('ph-sun');
        } else {
            themeIcon.classList.remove('ph-sun');
            themeIcon.classList.add('ph-moon');
        }
    }

    // Audio Toggle
    const audioToggleBtn = document.getElementById('audio-toggle');
    const audioIcon = document.getElementById('audio-icon');
    const bgMusic = document.getElementById('bg-music');
    const audioControlContainer = document.querySelector('.audio-control');

    let isPlaying = false;

    // Set default volume
    bgMusic.volume = 0.3;

    // Attempt autoplay if allowed (browsers require interaction usually, but let's try)
    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            // Autoplay started!
            isPlaying = true;
            updateAudioUI();
        }).catch(error => {
            // Autoplay was prevented.
            console.log("Autoplay prevented by browser, waiting for user interaction.");
            isPlaying = false;
            updateAudioUI();
        });
    }

    audioToggleBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            isPlaying = false;
        } else {
            bgMusic.play().then(() => {
                isPlaying = true;
            }).catch(e => {
                console.error("Error playing audio:", e);
            });
            isPlaying = true; // Optimistic update
        }
        updateAudioUI();
    });

    function updateAudioUI() {
        if (isPlaying) {
            audioIcon.classList.remove('ph-speaker-slash');
            audioIcon.classList.add('ph-speaker-high');
            audioControlContainer.classList.add('playing');
        } else {
            audioIcon.classList.remove('ph-speaker-high');
            audioIcon.classList.add('ph-speaker-slash');
            audioControlContainer.classList.remove('playing');
        }
    }
});
