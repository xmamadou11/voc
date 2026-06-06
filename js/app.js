const app = {
    data: [],
    queue: [],
    currentCard: null,

    init() {
        this.theme.init();
        this.router.init();
        this.loadData();
        this.setupAudio();
    },

    async loadData() {
        try {
            const response = await fetch('/voc/data/oxford3000.json');
            const rawData = await response.json();
            
            const progress = JSON.parse(localStorage.getItem('oxford_progress')) || {};
            
            this.data = rawData.map(word => {
                const userProgress = progress[word.id] || { 
                    easeFactor: 2.5, interval: 0, repetitions: 0, nextReview: Date.now() 
                };
                return { ...word, ...userProgress };
            });

            this.updateStats();
            this.buildQueue();
        } catch (e) {
            console.error("Failed to load database", e);
        }
    },

    updateStats() {
        const mastered = this.data.filter(w => w.interval > 21).length;
        document.getElementById('stat-mastered').textContent = mastered;
        let xp = JSON.parse(localStorage.getItem('oxford_xp')) || 0;
        let level = Math.floor(xp / 1000) + 1;
        document.getElementById('stat-level').textContent = `Lvl ${level}`;
    },

    buildQueue() {
        const now = Date.now();
        this.queue = this.data.filter(w => w.nextReview <= now).sort(() => Math.random() - 0.5);
    },

    saveProgress(word) {
        let progress = JSON.parse(localStorage.getItem('oxford_progress')) || {};
        progress[word.id] = {
            easeFactor: word.easeFactor, interval: word.interval,
            repetitions: word.repetitions, nextReview: word.nextReview
        };
        localStorage.setItem('oxford_progress', JSON.stringify(progress));
        
        let xp = JSON.parse(localStorage.getItem('oxford_xp')) || 0;
        localStorage.setItem('oxford_xp', JSON.stringify(xp + 10));
        this.updateStats();
    },

    srs: {
        startSession() {
            if (app.queue.length === 0) {
                alert("You're all caught up for today! ð");
                app.router.navigate('dashboard');
                return;
            }
            app.currentCard = app.queue.shift();
            this.renderCard(app.currentCard);
        },
        renderCard(word) {
            document.getElementById('fc-word').textContent = word.word;
            document.getElementById('fc-ipa').textContent = word.ipa;
            document.getElementById('fc-category').textContent = `${word.category} â¢ ${word.level}`;
            document.getElementById('fc-translation').textContent = word.translation;
            document.getElementById('fc-ex-en').textContent = word.example;
            document.getElementById('fc-ex-fr').textContent = word.example_fr;

            document.getElementById('fc-back').classList.add('hidden');
            document.getElementById('fc-actions-front').classList.remove('hidden');
            document.getElementById('fc-actions-back').classList.add('hidden');
        },
        reveal() {
            document.getElementById('fc-back').classList.remove('hidden');
            document.getElementById('fc-actions-front').classList.add('hidden');
            document.getElementById('fc-actions-back').classList.remove('hidden');
        },
        processReview(quality) {
            let word = app.currentCard;
            if (quality < 3) {
                word.repetitions = 0; word.interval = 1;
            } else {
                if (word.repetitions === 0) word.interval = 1;
                else if (word.repetitions === 1) word.interval = 6;
                else word.interval = Math.round(word.interval * word.easeFactor);
                word.repetitions += 1;
            }
            word.easeFactor = Math.max(1.3, word.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
            word.nextReview = Date.now() + (word.interval * 24 * 60 * 60 * 1000);
            
            app.saveProgress(word);
            this.startSession();
        }
    },

    setupAudio() {
        document.getElementById('btn-play-audio').addEventListener('click', () => {
            if (!app.currentCard) return;
            const utterance = new SpeechSynthesisUtterance(app.currentCard.word);
            utterance.lang = 'en-US';
            window.speechSynthesis.speak(utterance);
        });

        const btnRecord = document.getElementById('btn-record');
        if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.lang = 'en-US';

            btnRecord.addEventListener('mousedown', () => { recognition.start(); btnRecord.style.background = "rgba(232, 117, 138, 0.4)"; });
            btnRecord.addEventListener('mouseup', () => { recognition.stop(); btnRecord.style.background = ""; });
            
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript.toLowerCase();
                const target = document.getElementById('speak-target').textContent.toLowerCase();
                const feedback = document.getElementById('speak-feedback');
                
                if (transcript.includes(target) || target.includes(transcript)) {
                    feedback.innerHTML = `â Excellent! You said: <em>${transcript}</em>`;
                    feedback.className = "text-green";
                } else {
                    feedback.innerHTML = `â Try again. I heard: <em>${transcript}</em>`;
                    feedback.className = "text-rose";
                }
            };
        }
    },

    router: {
        init() {
            document.querySelectorAll('.nav-item').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.navigate(e.currentTarget.getAttribute('data-target'));
                });
            });
            document.getElementById('btn-reveal').addEventListener('click', () => app.srs.reveal());
        },
        navigate(viewId) {
            document.querySelectorAll('.view').forEach(v => {
                v.classList.add('hidden');
                v.classList.remove('active');
            });
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            
            const view = document.getElementById(`view-${viewId}`);
            view.classList.remove('hidden');
            view.classList.add('active');

            const navBtn = document.querySelector(`.nav-item[data-target="${viewId}"]`);
            if (navBtn) navBtn.classList.add('active');

            if (viewId === 'flashcards') app.srs.startSession();
            if (viewId === 'speaking' && app.data.length > 0) {
                document.getElementById('speak-target').textContent = app.data[Math.floor(Math.random() * app.data.length)].word;
                document.getElementById('speak-feedback').textContent = "";
            }
        }
    },

    theme: {
        init() {
            const btn = document.getElementById('theme-toggle');
            document.documentElement.setAttribute('data-theme', localStorage.getItem('oxford_theme') || 'dark');
            btn.addEventListener('click', () => {
                const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', theme);
                localStorage.setItem('oxford_theme', theme);
            });
        }
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/voc/sw.js').then(() => console.log("SW Registered for /voc/"));
}
