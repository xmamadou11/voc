// ======================================
// VOCSPACE APP
// ======================================

const VOCAB_URL =
  "https://xmamadou11.github.io/voc/vocabulary.json";

let words = [];
let currentIndex = 0;

// ======================================
// CHARGEMENT JSON
// ======================================

async function loadVocabulary() {
  try {
    const response = await fetch(VOCAB_URL);

    if (!response.ok) {
      throw new Error(
        `Erreur HTTP : ${response.status}`
      );
    }

    const data = await response.json();

    // Si ton JSON est directement un tableau
    if (Array.isArray(data)) {
      words = data;
    }

    // Si ton JSON est { words: [...] }
    else if (data.words) {
      words = data.words;
    }

    console.log("Mots chargés :", words.length);

    const counter = document.getElementById("animated-count");

    if (counter) {
      counter.textContent = words.length.toLocaleString("fr-FR");
    }

  } catch (error) {
    console.error("Erreur JSON :", error);
  }
}

// ======================================
// AFFICHAGE MOT
// ======================================

function showWord(index) {

  if (!words.length) return;

  const word = words[index];

  document.getElementById("card-word").textContent =
    word.word || word.english || "UNKNOWN";

  document.getElementById("card-word-back").textContent =
    word.word || word.english || "UNKNOWN";

  document.getElementById("card-translation").textContent =
    word.translation ||
    word.french ||
    "Traduction";

  document.getElementById("card-level").textContent =
    word.level || "A1";

  document.getElementById("card-level-back").textContent =
    word.level || "A1";

  document.getElementById("card-phonetic").textContent =
    word.phonetic || "";
}

// ======================================
// START MISSION
// ======================================

function startMission() {

  if (!words.length) {
    alert("Le vocabulaire n'est pas encore chargé.");
    return;
  }

  document
    .getElementById("landing")
    .classList.remove("active");

  document
    .getElementById("mission")
    .classList.add("active");

  currentIndex = 0;

  showWord(currentIndex);
}

// ======================================
// REVEAL
// ======================================

function revealCard() {

  document
    .getElementById("vocab-card")
    .classList.add("revealed");
}

// ======================================
// NEXT WORD
// ======================================

function nextWord() {

  currentIndex++;

  if (currentIndex >= words.length) {
    alert("Session terminée !");
    return;
  }

  document
    .getElementById("vocab-card")
    .classList.remove("revealed");

  showWord(currentIndex);
}

// ======================================
// AUDIO
// ======================================

function playAudio() {

  const word = words[currentIndex];

  if (!word) return;

  const filename =
    (word.id || word.word || "")
      .toLowerCase()
      .replace(/\s+/g, "_");

  const url =
    `https://xmamadou11.github.io/voc/audios/${filename}.mp3`;

  const audio = new Audio(url);

  audio.play().catch(err => {
    console.log(err);
  });
}

// ======================================
// INIT
// ======================================

window.addEventListener("DOMContentLoaded", async () => {

  await loadVocabulary();

  document
    .getElementById("btn-start")
    ?.addEventListener("click", startMission);

  document
    .getElementById("btn-reveal")
    ?.addEventListener("click", revealCard);

  document
    .getElementById("btn-audio")
    ?.addEventListener("click", playAudio);

  document
    .querySelectorAll(".rate-btn")
    .forEach(btn => {
      btn.addEventListener("click", nextWord);
    });

  console.log("VOCSPACE READY");
});
