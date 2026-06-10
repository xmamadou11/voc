/**
 * ============================================================
 *  VOCSPACE — app.js
 *  Space-themed English vocabulary learning application
 *  Built for GitHub Pages · Three.js r128
 * ============================================================
 */

'use strict';

/* ============================================================
   DATA SOURCE CONFIGURATION
   ============================================================
   OPTION A (current): Uses DEMO_WORDS from data/demo-words.js
   OPTION B (production): Uncomment loadVocabularyJSON() below
     and comment out loadDemoWords().

   Your vocabulary JSON endpoint:
   https://xmamadou11.github.io/voc/vocabulary.json

   AUDIO BASE URL:
   https://xmamadou11.github.io/voc/audios/{word}.mp3
   (Update AUDIO_BASE_URL constant below)
============================================================ */

// ── Audio base URL ─────────────────────────────────────────
// TO CONNECT: Replace with your real audio folder URL
const AUDIO_BASE_URL = 'https://xmamadou11.github.io/voc/audios/';

// ── JSON data URL ───────────────────────────────────────────
// TO CONNECT: Uncomment and use in loadVocabularyJSON()
const VOCABULARY_JSON_URL = 'https://xmamadou11.github.io/voc/vocabulary.json';

/* ============================================================
   STATE
============================================================ */
const state = {
  words: [],
  queue: [],
  currentIndex: 0,
  isRevealed: false,
  streak: 0,
  score: 0,
  totalSeen: 0,
  isTransitioning: false,
};

/* ============================================================
   THREE.JS SPACE SCENE
============================================================ */
function initSpaceScene() {
  const canvas = document.getElementById('space-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 1;

  // ── Stars (two layers for depth) ──────────────────────────
  function createStarField(count, spread, size, color) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      size,
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    });
    return new THREE.Points(geometry, material);
  }

  const starsFar  = createStarField(3000, 80, 0.08, '#E8F4FF');
  const starsNear = createStarField(800,  30, 0.14, '#B0CCFF');
  const starsTiny = createStarField(5000, 120, 0.04, '#A0B8FF');
  scene.add(starsFar, starsNear, starsTiny);

  // ── Nebula clouds (large transparent spheres) ─────────────
  function createNebula(x, y, z, radius, color, opacity) {
    const geo = new THREE.SphereGeometry(radius, 16, 16);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    return mesh;
  }

  const nebulas = [
    createNebula(-8, 3, -20, 10, '#2A0E5A', 0.12),
    createNebula(10, -4, -25, 12, '#0A1A4A', 0.10),
    createNebula(2, 8, -18, 8,  '#1A0A3A', 0.08),
    createNebula(-5, -6, -15, 6, '#0D2040', 0.09),
  ];
  nebulas.forEach(n => scene.add(n));

  // ── Floating particles (slow drift) ───────────────────────
  const particleCount = 200;
  const particleGeo = new THREE.BufferGeometry();
  const pPositions = new Float32Array(particleCount * 3);
  const pVelocities = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    pPositions[i * 3]     = (Math.random() - 0.5) * 20;
    pPositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    pPositions[i * 3 + 2] = (Math.random() - 0.5) * 5 - 2;
    pVelocities[i * 3]     = (Math.random() - 0.5) * 0.002;
    pVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
    pVelocities[i * 3 + 2] = 0;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
  const particleMat = new THREE.PointsMaterial({
    size: 0.05,
    color: new THREE.Color('#4D9FFF'),
    transparent: true,
    opacity: 0.5,
    sizeAttenuation: true,
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // ── Mouse parallax ────────────────────────────────────────
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = (e.clientX / window.innerWidth  - 0.5) * 0.6;
    mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 0.4;
  });

  // Touch support for mobile parallax
  window.addEventListener('touchmove', (e) => {
    if (e.touches[0]) {
      mouse.targetX = (e.touches[0].clientX / window.innerWidth  - 0.5) * 0.3;
      mouse.targetY = (e.touches[0].clientY / window.innerHeight - 0.5) * 0.2;
    }
  }, { passive: true });

  // ── Resize handler ────────────────────────────────────────
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ── Animate ───────────────────────────────────────────────
  let clock = 0;

  function animate() {
    requestAnimationFrame(animate);
    clock += 0.005;

    // Smooth mouse follow
    mouse.x += (mouse.targetX - mouse.x) * 0.04;
    mouse.y += (mouse.targetY - mouse.y) * 0.04;

    // Camera drift + parallax
    camera.position.x = mouse.x * 0.5 + Math.sin(clock * 0.3) * 0.08;
    camera.position.y = -mouse.y * 0.3 + Math.cos(clock * 0.2) * 0.05;
    camera.rotation.z = mouse.x * 0.02;

    // Slow star rotation
    starsFar.rotation.y  = clock * 0.008;
    starsNear.rotation.y = clock * 0.012;
    starsTiny.rotation.y = clock * 0.005;
    starsFar.rotation.x  = clock * 0.003;

    // Particle drift
    const pos = particles.geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3]     += pVelocities[i * 3];
      pos[i * 3 + 1] += pVelocities[i * 3 + 1];
      // Wrap around
      if (pos[i * 3]     >  10) pos[i * 3]     = -10;
      if (pos[i * 3]     < -10) pos[i * 3]     =  10;
      if (pos[i * 3 + 1] >  10) pos[i * 3 + 1] = -10;
      if (pos[i * 3 + 1] < -10) pos[i * 3 + 1] =  10;
    }
    particles.geometry.attributes.position.needsUpdate = true;

    // Nebula pulse
    nebulas.forEach((n, i) => {
      n.material.opacity = 0.07 + Math.sin(clock * 0.5 + i * 1.2) * 0.03;
    });

    renderer.render(scene, camera);
  }
  animate();
}

/* ============================================================
   DATA LOADING
============================================================ */

/** OPTION A: Use built-in demo words (data/demo-words.js) */
function loadDemoWords() {
  state.words = [...DEMO_WORDS];
  state.queue = shuffle([...state.words]);
}

/**
 * OPTION B: Fetch real vocabulary from JSON
 * TO ACTIVATE: Call loadVocabularyJSON() in init() instead of loadDemoWords()
 *
 * async function loadVocabularyJSON() {
 *   try {
 *     const res = await fetch(VOCABULARY_JSON_URL);
 *     if (!res.ok) throw new Error('Network response was not ok');
 *     const data = await res.json();
 *     // Adapt based on your JSON structure:
 *     state.words = data.words ?? data;
 *     state.queue = shuffle([...state.words]);
 *   } catch (err) {
 *     console.error('Failed to load vocabulary JSON:', err);
 *     // Fallback to demo words
 *     loadDemoWords();
 *   }
 * }
 */

/* ============================================================
   AUDIO
============================================================ */

/**
 * AUDIO SOURCE:
 * Plays audio from: AUDIO_BASE_URL + word.id + '.mp3'
 * e.g. https://xmamadou11.github.io/voc/audios/abandon.mp3
 *
 * If the file doesn't exist, falls back to Web Speech API.
 */
function playAudio(word) {
  const btn = document.getElementById('btn-audio');
  const wordData = state.queue[state.currentIndex];
  const audioId = wordData?.id || word.toLowerCase();

  btn.classList.add('playing');
  setTimeout(() => btn.classList.remove('playing'), 1200);

  // Try fetching the audio file first
  const audioUrl = `${AUDIO_BASE_URL}${audioId}.mp3`;
  const audio = new Audio(audioUrl);

  audio.oncanplaythrough = () => {
    audio.play().catch(() => fallbackSpeech(word));
  };
  audio.onerror = () => {
    // File not found — use Web Speech API as fallback
    fallbackSpeech(word);
  };

  // Trigger load
  audio.load();
}

/** Web Speech API fallback for pronunciation */
function fallbackSpeech(word) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }
}

/* ============================================================
   CARD RENDERING
============================================================ */

function renderCard(wordData) {
  if (!wordData) return;

  const card = document.getElementById('vocab-card');

  // Reset flip
  card.classList.remove('revealed');
  state.isRevealed = false;

  // Populate front
  document.getElementById('card-word').textContent     = wordData.word.toUpperCase();
  document.getElementById('card-phonetic').textContent = wordData.phonetic || '';
  document.getElementById('card-level').textContent    = wordData.level   || '—';

  // Populate back
  document.getElementById('card-word-back').textContent    = wordData.word.toUpperCase();
  document.getElementById('card-translation').textContent  = wordData.translation;
  document.getElementById('card-level-back').textContent   = wordData.level || '—';

  // Entrance animation
  card.classList.remove('entering', 'exiting');
  void card.offsetWidth; // reflow
  card.classList.add('entering');
  card.addEventListener('animationend', () => card.classList.remove('entering'), { once: true });

  // Progress
  updateProgress();
}

function updateProgress() {
  const total   = state.queue.length;
  const current = state.currentIndex + 1;
  const pct     = total > 0 ? ((state.currentIndex) / total) * 100 : 0;

  document.getElementById('progress-fill').style.width  = `${pct}%`;
  document.getElementById('progress-label').textContent = `${current} / ${total}`;
  document.getElementById('stat-streak').textContent    = `🔥 ${state.streak}`;
  document.getElementById('stat-score').textContent     = `⚡ ${state.score}`;
}

/* ============================================================
   CARD INTERACTIONS
============================================================ */

function revealCard() {
  if (state.isRevealed) return;
  state.isRevealed = true;

  const card = document.getElementById('vocab-card');
  card.classList.add('revealed');

  // Accessibility
  document.getElementById('card-back').removeAttribute('aria-hidden');
  document.getElementById('card-front').setAttribute('aria-hidden', 'true');
}

function rateCard(rating) {
  if (!state.isRevealed || state.isTransitioning) return;
  state.isTransitioning = true;

  // Update score & streak
  switch (rating) {
    case 'again': state.streak = 0;                     break;
    case 'hard':  state.streak = 0; state.score += 1;   break;
    case 'good':  state.streak++; state.score += 2;     break;
    case 'easy':  state.streak++; state.score += 3;     break;
  }

  // Exit animation, then advance
  const card = document.getElementById('vocab-card');
  card.classList.add('exiting');

  card.addEventListener('animationend', () => {
    card.classList.remove('exiting');
    state.currentIndex++;
    state.isTransitioning = false;

    if (state.currentIndex >= state.queue.length) {
      showSessionComplete();
    } else {
      renderCard(state.queue[state.currentIndex]);
    }
  }, { once: true });
}

/* ============================================================
   SESSION COMPLETE
============================================================ */

function showSessionComplete() {
  document.getElementById('card-scene').style.display    = 'none';
  document.getElementById('session-complete').classList.remove('hidden');
}

function restartSession() {
  state.queue        = shuffle([...state.words]);
  state.currentIndex = 0;
  state.streak       = 0;
  state.score        = 0;

  document.getElementById('session-complete').classList.add('hidden');
  document.getElementById('card-scene').style.display = '';

  renderCard(state.queue[0]);
}

/* ============================================================
   NAVIGATION
============================================================ */

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.setAttribute('aria-hidden', 'true');
  });
  const screen = document.getElementById(id);
  screen.classList.add('active');
  screen.removeAttribute('aria-hidden');
}

function startMission() {
  if (state.isTransitioning) return;
  state.isTransitioning = true;

  // 1. Warp effect
  const warp = document.getElementById('warp-overlay');
  warp.classList.add('warping');

  setTimeout(() => {
    // 2. Switch screen mid-warp
    showScreen('mission');

    // 3. Reset card state
    document.getElementById('card-front').removeAttribute('aria-hidden');
    document.getElementById('card-back').setAttribute('aria-hidden', 'true');

    // 4. Load first card
    state.queue        = shuffle([...state.words]);
    state.currentIndex = 0;
    state.streak       = 0;
    state.score        = 0;
    document.getElementById('session-complete').classList.add('hidden');
    document.getElementById('card-scene').style.display = '';
    renderCard(state.queue[0]);

    // 5. Remove warp
    setTimeout(() => {
      warp.classList.remove('warping');
      state.isTransitioning = false;
    }, 500);
  }, 700);
}

function returnToBase() {
  showScreen('landing');
}

/* ============================================================
   ANIMATED COUNTER (landing)
============================================================ */
function animateCounter(target, duration = 2000) {
  const el      = document.getElementById('animated-count');
  const start   = performance.now();
  const easeOut = (t) => 1 - Math.pow(1 - t, 4);

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const value    = Math.floor(easeOut(progress) * target);
    el.textContent = value.toLocaleString('fr-FR');
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString('fr-FR');
  }
  requestAnimationFrame(update);
}

/* ============================================================
   HUD COORDINATES (cosmetic)
============================================================ */
function startHudTick() {
  const latEl = document.getElementById('hud-lat');
  const lonEl = document.getElementById('hud-lon');
  const altEl = document.getElementById('hud-alt');
  if (!latEl) return;

  let lat = 42.3601, lon = -71.0589, alt = 420;

  setInterval(() => {
    lat += (Math.random() - 0.5) * 0.001;
    lon += (Math.random() - 0.5) * 0.001;
    alt += (Math.random() - 0.5) * 2;
    latEl.textContent = lat.toFixed(3);
    lonEl.textContent = lon.toFixed(3);
    altEl.textContent = Math.round(alt);
  }, 800);
}

/* ============================================================
   UTILITIES
============================================================ */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* ============================================================
   KEYBOARD SHORTCUTS
============================================================ */
document.addEventListener('keydown', (e) => {
  const missionActive = document.getElementById('mission').classList.contains('active');
  if (!missionActive) return;

  switch (e.key) {
    case ' ':
    case 'Enter':
      e.preventDefault();
      if (!state.isRevealed) revealCard();
      break;
    case '1': rateCard('again'); break;
    case '2': rateCard('hard');  break;
    case '3': rateCard('good');  break;
    case '4': rateCard('easy');  break;
    case 'p':
    case 'P': {
      const w = state.queue[state.currentIndex];
      if (w) playAudio(w.word);
      break;
    }
  }
});

/* ============================================================
   INIT
============================================================ */
function init() {
  // Three.js background
  initSpaceScene();

  // Load data
  // ── TO SWITCH TO PRODUCTION DATA: replace line below with:
  //    await loadVocabularyJSON();
  loadDemoWords();

  // Landing screen active by default
  showScreen('landing');

  // Animate counter after a short delay
  setTimeout(() => animateCounter(10825), 300);

  // HUD cosmetic ticker
  startHudTick();

  // ── EVENT LISTENERS ────────────────────────────────────────

  // Start Mission CTA
  document.getElementById('btn-start')
    .addEventListener('click', startMission);

  // Back to base
  document.getElementById('btn-back')
    .addEventListener('click', returnToBase);

  // Reveal button
  document.getElementById('btn-reveal')
    .addEventListener('click', revealCard);

  // Audio button
  document.getElementById('btn-audio')
    .addEventListener('click', () => {
      const wordData = state.queue[state.currentIndex];
      if (wordData) playAudio(wordData.word);
    });

  // Rating buttons
  document.querySelectorAll('.rate-btn').forEach(btn => {
    btn.addEventListener('click', () => rateCard(btn.dataset.rating));
  });

  // Restart session
  document.getElementById('btn-restart')
    .addEventListener('click', restartSession);

  // Tap card front to reveal (mobile UX)
  document.getElementById('card-front')
    .addEventListener('click', (e) => {
      // Don't intercept button clicks
      if (e.target.closest('button')) return;
      if (!state.isRevealed) revealCard();
    });
}

// ── Bootstrap ───────────────────────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
