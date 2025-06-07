document.addEventListener('DOMContentLoaded', () => {
    const consoleScreen = document.querySelector('.console-screen');
    const pageLinks = document.querySelectorAll('.page-links button');
    const startButton = document.getElementById('start-button');
    const mainPageContent = consoleScreen.innerHTML;

    const messages = ["Hello there!", "Happy Birthday!", "Hope you have a great day!", "Let's celebrate!"];
    let currentMessageIndex = 0;

    const galleryItems = [
        { type: 'image', src: 'placeholder1.jpg', caption: 'Photo 1' },
        { type: 'image', src: 'placeholder2.jpg', caption: 'Photo 2' },
    ];
    let currentGalleryItemIndex = 0;
    let galleryStarted = false;

    const playlist = [
        { title: "On Bended Knee", artist: "Boyz II Men", duration: "05:28", cover: "on_bended_knee.jpg" },
        { title: "(Everything I Do) I Do It For You", artist: "Bryan Adams", duration: "06:32", cover: "everything_i_do.jpg" },
    ];
    let currentTrackIndex = 0;

    // Tetris Page Data (Placeholders)
    let score = 0;
    let level = 1;
    let lines = 0;
    let gameRunning = false;

    pageLinks.forEach(button => {
        button.addEventListener('click', () => {
            const page = button.dataset.page;
            loadPageContent(page);
        });
    });

    if (startButton) {
        startButton.addEventListener('click', () => loadPageContent('message'));
    }

    function loadPageContent(page) {
        consoleScreen.innerHTML = '';
        currentMessageIndex = 0;
        currentGalleryItemIndex = 0;
        galleryStarted = false;
        // gameRunning = false; // Reset Tetris game state if needed, or maintain state

        const titleEl = document.createElement('h1');
        titleEl.textContent = page.charAt(0).toUpperCase() + page.slice(1);
        consoleScreen.appendChild(titleEl);

        if (page === 'home') {
            consoleScreen.innerHTML = mainPageContent;
            const newStartButton = document.getElementById('start-button');
            if (newStartButton) {
                newStartButton.addEventListener('click', () => loadPageContent('message'));
            }
            // Re-attach page link listeners using onclick for simplicity in avoiding duplicates
            document.querySelectorAll('.page-links button').forEach(button => {
                const pageName = button.dataset.page;
                button.onclick = () => loadPageContent(pageName);
            });
            return;
        }

        const contentArea = document.createElement('div');
        contentArea.className = 'page-content';
        consoleScreen.appendChild(contentArea);

        switch (page) {
            case 'message':
                displayMessage();
                break;
            case 'gallery':
                displayGallery();
                break;
            case 'music':
                displayMusicPlayer();
                break;
            case 'tetris':
                displayTetrisGame();
                break;
            default:
                contentArea.textContent = 'Content not found.';
                addNavigationButtons(['home', null, null]); // Default nav to home
        }
    }

    function displayMessage() {
        const contentArea = consoleScreen.querySelector('.page-content');
        if (!contentArea) return;
        contentArea.innerHTML = '';
        if (currentMessageIndex >= messages.length) {
            const endMessage = document.createElement('p');
            endMessage.textContent = "That's all the messages!";
            contentArea.appendChild(endMessage);
            addNavigationButtons(['message_end', 'gallery', 'home']);
            return;
        }
        const messageText = document.createElement('p');
        messageText.textContent = messages[currentMessageIndex];
        contentArea.appendChild(messageText);
        const skipButton = document.createElement('button');
        skipButton.textContent = 'SKIP';
        skipButton.addEventListener('click', () => {
            currentMessageIndex = messages.length;
            displayMessage();
        });
        const selanjutnyaButton = document.createElement('button');
        const kembaliButton = document.createElement('button');
        kembaliButton.textContent = '[2] KEMBALI';
        kembaliButton.addEventListener('click', () => {
            if (currentMessageIndex > 0) {
                currentMessageIndex--;
                displayMessage();
            } else {
                loadPageContent('home');
            }
        });
        if (currentMessageIndex < messages.length - 1) {
            selanjutnyaButton.textContent = '[1] SELANJUTNYA';
            selanjutnyaButton.addEventListener('click', () => {
                currentMessageIndex++;
                displayMessage();
            });
        } else {
            selanjutnyaButton.textContent = '[1] Next Section (Gallery)';
            selanjutnyaButton.addEventListener('click', () => {
                loadPageContent('gallery');
            });
        }
        const messageNavContainer = document.createElement('div');
        messageNavContainer.className = 'message-navigation';
        messageNavContainer.appendChild(skipButton);
        messageNavContainer.appendChild(selanjutnyaButton);
        messageNavContainer.appendChild(kembaliButton);
        contentArea.appendChild(messageNavContainer);
    }

    function displayGallery() {
        const contentArea = consoleScreen.querySelector('.page-content');
        if (!contentArea) return;
        contentArea.innerHTML = '';
        const galleryTitle = document.createElement('p');
        galleryTitle.textContent = "HEYTML PHOTOBOX";
        contentArea.appendChild(galleryTitle);
        if (!galleryStarted) {
            const initialText = document.createElement('p');
            initialText.textContent = "Photobox siap digunakan";
            contentArea.appendChild(initialText);
            const startPrintButton = document.createElement('button');
            startPrintButton.textContent = "MULAI CETAK";
            startPrintButton.addEventListener('click', () => {
                galleryStarted = true;
                currentGalleryItemIndex = 0;
                displayGallery();
            });
            contentArea.appendChild(startPrintButton);
            addNavigationButtons(['gallery_initial', 'music', 'message']);
        } else {
            if (currentGalleryItemIndex < galleryItems.length) {
                const item = galleryItems[currentGalleryItemIndex];
                const itemDisplay = document.createElement('div');
                itemDisplay.className = 'gallery-item';
                if (item.type === 'image') {
                    const imgPlaceholder = document.createElement('p');
                    imgPlaceholder.textContent = `[Image: ${item.caption} - ${item.src}]`;
                    itemDisplay.appendChild(imgPlaceholder);
                } else if (item.type === 'text') {
                    const text = document.createElement('p');
                    text.textContent = item.content;
                    itemDisplay.appendChild(text);
                }
                contentArea.appendChild(itemDisplay);
                const galleryNav = document.createElement('div');
                galleryNav.className = 'gallery-item-navigation';
                if (currentGalleryItemIndex > 0) {
                    const prevItemButton = document.createElement('button');
                    prevItemButton.textContent = "Previous Item";
                    prevItemButton.addEventListener('click', () => {
                        currentGalleryItemIndex--;
                        displayGallery();
                    });
                    galleryNav.appendChild(prevItemButton);
                }
                if (currentGalleryItemIndex < galleryItems.length - 1) {
                    const nextItemButton = document.createElement('button');
                    nextItemButton.textContent = "Next Item";
                    nextItemButton.addEventListener('click', () => {
                        currentGalleryItemIndex++;
                        displayGallery();
                    });
                    galleryNav.appendChild(nextItemButton);
                }
                contentArea.appendChild(galleryNav);
            } else {
                const endGalleryText = document.createElement('p');
                endGalleryText.textContent = "End of gallery items.";
                contentArea.appendChild(endGalleryText);
            }
            addNavigationButtons(['gallery_active', 'music', 'message']);
        }
    }

    function displayMusicPlayer() {
        const contentArea = consoleScreen.querySelector('.page-content');
        if (!contentArea) return;
        contentArea.innerHTML = '';
        const playerWrapper = document.createElement('div');
        playerWrapper.className = 'music-player';
        const coverArt = document.createElement('div');
        coverArt.className = 'cover-art';
        coverArt.textContent = `[Cover Art: ${playlist[currentTrackIndex].cover}]`;
        playerWrapper.appendChild(coverArt);
        const songInfo = document.createElement('div');
        songInfo.className = 'song-info';
        const songTitle = document.createElement('p');
        songTitle.className = 'song-title';
        songTitle.textContent = playlist[currentTrackIndex].title;
        const songArtist = document.createElement('p');
        songArtist.className = 'song-artist';
        songArtist.textContent = playlist[currentTrackIndex].artist;
        songInfo.appendChild(songTitle);
        songInfo.appendChild(songArtist);
        playerWrapper.appendChild(songInfo);
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.textContent = '0:00 / ' + playlist[currentTrackIndex].duration;
        playerWrapper.appendChild(progressBar);
        const controls = document.createElement('div');
        controls.className = 'music-controls';
        const prevButton = document.createElement('button');
        prevButton.textContent = '⏮';
        prevButton.addEventListener('click', () => {
            currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
            displayMusicPlayer();
        });
        const playPauseButton = document.createElement('button');
        playPauseButton.textContent = '▶️';
        playPauseButton.addEventListener('click', () => {
            playPauseButton.textContent = playPauseButton.textContent === '▶️' ? '⏸' : '▶️';
            console.log("Play/Pause clicked");
        });
        const nextButton = document.createElement('button');
        nextButton.textContent = '⏭';
        nextButton.addEventListener('click', () => {
            currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
            displayMusicPlayer();
        });
        const volumeButton = document.createElement('button');
        volumeButton.textContent = '🔊';
        volumeButton.addEventListener('click', () => console.log("Volume clicked"));
        controls.appendChild(prevButton);
        controls.appendChild(playPauseButton);
        controls.appendChild(nextButton);
        controls.appendChild(volumeButton);
        playerWrapper.appendChild(controls);
        const playlistEl = document.createElement('div');
        playlistEl.className = 'playlist';
        const playlistTitle = document.createElement('h3');
        playlistTitle.textContent = 'PLAYLIST:';
        playlistEl.appendChild(playlistTitle);
        const ol = document.createElement('ol');
        playlist.forEach((song, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${song.title} - ${song.duration}`;
            if (index === currentTrackIndex) {
                li.style.fontWeight = 'bold';
            }
            li.addEventListener('click', () => {
                currentTrackIndex = index;
                displayMusicPlayer();
            });
            ol.appendChild(li);
        });
        playlistEl.appendChild(ol);
        playerWrapper.appendChild(playlistEl);
        contentArea.appendChild(playerWrapper);
        addNavigationButtons(['music', 'tetris', 'gallery']);
    }

    function displayTetrisGame() {
        const contentArea = consoleScreen.querySelector('.page-content');
        if (!contentArea) return;
        contentArea.innerHTML = '';

        const gameWrapper = document.createElement('div');
        gameWrapper.className = 'tetris-game';

        const scoreboard = document.createElement('div');
        scoreboard.className = 'tetris-scoreboard';
        scoreboard.innerHTML = `Score: <span id="tetris-score">${score}</span> | Level: <span id="tetris-level">${level}</span> | Lines: <span id="tetris-lines">${lines}</span>`;
        gameWrapper.appendChild(scoreboard);

        const gameBoard = document.createElement('div');
        gameBoard.className = 'tetris-board-placeholder';
        gameBoard.style.width = '150px';
        gameBoard.style.height = '200px';
        gameBoard.style.backgroundColor = '#333';
        gameBoard.style.color = 'white';
        gameBoard.style.textAlign = 'center';
        gameBoard.style.padding = '10px';
        gameBoard.style.margin = '10px auto';
        gameBoard.textContent = gameRunning ? 'Game in Progress...' : 'Press START GAME';
        gameWrapper.appendChild(gameBoard);

        const gameControls = document.createElement('div');
        gameControls.className = 'tetris-controls';

        const leftButton = document.createElement('button');
        leftButton.textContent = '< (D-Pad Left)';
        leftButton.addEventListener('click', () => console.log("Tetris: Move Left (UI Button)"));

        const rotateButton = document.createElement('button');
        rotateButton.textContent = 'ROTATE (A Button)';
        rotateButton.addEventListener('click', () => console.log("Tetris: Rotate (UI Button)"));

        const rightButton = document.createElement('button');
        rightButton.textContent = '> (D-Pad Right)';
        rightButton.addEventListener('click', () => console.log("Tetris: Move Right (UI Button)"));

        gameControls.appendChild(leftButton);
        gameControls.appendChild(rotateButton);
        gameControls.appendChild(rightButton);
        gameWrapper.appendChild(gameControls);

        const startGameButton = document.createElement('button');
        startGameButton.id = 'tetris-start-game';
        startGameButton.textContent = gameRunning ? 'PAUSE GAME' : 'START GAME';
        startGameButton.addEventListener('click', () => {
            gameRunning = !gameRunning;
            startGameButton.textContent = gameRunning ? 'PAUSE GAME' : 'START GAME';
            const boardText = gameBoard.textContent = gameRunning ? 'Game in Progress...' : 'Game Paused.';
            if (gameRunning && score === 0) {
                 score = 0; level = 1; lines = 0;
                 document.getElementById('tetris-score').textContent = score;
                 document.getElementById('tetris-level').textContent = level;
                 document.getElementById('tetris-lines').textContent = lines;
            }
             if(gameRunning && boardText === 'Game Paused.'){ // if resuming after pause
                gameBoard.textContent = 'Game in Progress...';
            } else if (!gameRunning){
                 gameBoard.textContent = 'Game Paused. Press START GAME to resume.';
            }
            console.log(gameRunning ? "Tetris: Game Started/Resumed" : "Tetris: Game Paused");
        });
        gameWrapper.appendChild(startGameButton);

        contentArea.appendChild(gameWrapper);
        addNavigationButtons(['tetris', 'home', 'music']);
    }

    function addNavigationButtons(pageContext) {
        const navContainer = document.createElement('div');
        navContainer.className = 'page-navigation';
        const currentPage = pageContext[0];
        const nextPage = pageContext[1];
        const prevPage = pageContext[2];

        if (currentPage === 'message_end') {
            const nextSectBtn = document.createElement('button');
            nextSectBtn.textContent = '[1] Go to Gallery';
            nextSectBtn.addEventListener('click', () => loadPageContent(nextPage));
            navContainer.appendChild(nextSectBtn);
            const homeBtn = document.createElement('button');
            homeBtn.textContent = '[2] Back to Home';
            homeBtn.addEventListener('click', () => loadPageContent(prevPage));
            navContainer.appendChild(homeBtn);
        } else if (['gallery_initial', 'gallery_active', 'music'].includes(currentPage)) {
            const selanjutnyaBtn = document.createElement('button');
            selanjutnyaBtn.textContent = `[1] SELANJUTNYA (${nextPage.charAt(0).toUpperCase() + nextPage.slice(1)})`;
            selanjutnyaBtn.addEventListener('click', () => loadPageContent(nextPage));
            navContainer.appendChild(selanjutnyaBtn);
            const kembaliBtn = document.createElement('button');
            kembaliBtn.textContent = `[2] KEMBALI (${prevPage.charAt(0).toUpperCase() + prevPage.slice(1)})`;
            kembaliBtn.addEventListener('click', () => loadPageContent(prevPage));
            navContainer.appendChild(kembaliBtn);
        } else if (currentPage === 'tetris') {
            const kembaliBtn = document.createElement('button');
            kembaliBtn.textContent = '[1] KEMBALI';
            kembaliBtn.addEventListener('click', () => loadPageContent('home'));
            navContainer.appendChild(kembaliBtn);
        } else if (currentPage === 'home') {
             return; // No general nav buttons on home page itself from this function
        }

        const currentContentArea = consoleScreen.querySelector('.page-content');
        if (currentContentArea) {
            const screenTitle = consoleScreen.querySelector('h1');
            if (screenTitle && screenTitle.textContent.toLowerCase() === currentPage.split('_')[0]) {
                 currentContentArea.appendChild(navContainer);
            } else if (!screenTitle && currentPage === 'home') {
                // This case should not happen if home is handled above, but as safety
                consoleScreen.appendChild(navContainer);
            } else if (screenTitle) {
                 // If titles don't match (e.g. after quick navigation), it might be safer to append to consoleScreen
                 // or ensure DOM is fully updated before this runs. For now, appending to consoleScreen.
                 consoleScreen.appendChild(navContainer);
            }
        } else {
            consoleScreen.appendChild(navContainer); // Fallback
        }
    }

    document.querySelectorAll('.console-controls button').forEach(button => {
        // Exclude page-link buttons and the main start button from this generic listener
        if (!button.dataset.page && button.id !== 'start-button' && !button.classList.contains('start')) {
             // The system start button is class 'start', main is id 'start-button'
            button.addEventListener('click', (e) => {
                let buttonName = e.target.textContent || e.target.classList[0] || 'Unknown Button';

                // Attempt to get a more specific name
                const classList = e.target.classList;
                if (classList.contains('up')) buttonName = 'D-Pad Up';
                else if (classList.contains('down')) buttonName = 'D-Pad Down';
                else if (classList.contains('left')) buttonName = 'D-Pad Left';
                else if (classList.contains('right')) buttonName = 'D-Pad Right';
                else if (classList.contains('a')) buttonName = 'Action A';
                else if (classList.contains('b')) buttonName = 'Action B';
                else if (classList.contains('select')) buttonName = 'Select';
                // System start button is class 'start', but should have its own logic if needed outside page navigation
                // For now, it will also log here if not handled by specific page logic.

                console.log(`${buttonName} button pressed.`);
                // TODO: If on Tetris page, map D-Pad and A/B to game actions
                // Example: if (consoleScreen.querySelector('.tetris-game') && gameRunning) { ... }
            });
        }
    });
});
