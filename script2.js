const submitbtn = document.getElementById("submit");
const useranswer = document.getElementById("answer");
const wrongSound = document.getElementById("wrong-sound");
const correctsound = document.getElementById("correct-sound");
const wonsound = document.getElementById("won-sound");
const homebtn = document.getElementById("home");
const congrats = document.getElementById("congrats");
const logic = document.getElementById("logic");
// IMAGE ELEMENT (must exist in HTML)
const hintImage = document.getElementById("hint-image");

// ---------------- LEVEL DATA ----------------
const alllevels = [
  {
    image: 1,
    answer: "oneinamillion",
    logic: "The word 'one' is placed inside the word 'million', showing something extremely rare."
  },
  {
    image: 2,
    answer: "brokenpromise",
    logic: "A promise is shown cracked or split, representing something that was not kept."
  },
  {
    image: 3,
    answer: "misunderstood",
    logic: "The word 'understood' appears wrongly or flipped, meaning not understood correctly."
  },
  {
    image: 4,
    answer: "firstaid",
    logic: "The word 'aid' comes after 'first', meaning immediate medical help."
  },
  {
    image: 5,
    answer: "mixedemotions",
    logic: "Different emotions are blended together, showing confusion or mixed feelings."
  },
  {
    image: 6,
    answer: "onceinabluemoon",
    logic: "The word 'once' appears inside a blue-colored moon, meaning something very rare."
  },
  {
    image: 7,
    answer: "crossroads",
    logic: "Two roads cross each other, representing a decision point in life."
  },
  {
    image: 8,
    answer: "ibelieveinyou",
    logic: "The words emphasize trust and faith directed towards someone."
  },
  {
    image: 9,
    answer: "timeismoney",
    logic: "Time and money are shown as equal or interchangeable, meaning time is valuable."
  },
  {
    image: 10,
    answer: "uptonogood",
    logic: "The word 'up' is positioned over 'no good', suggesting mischievous behavior."
  },
  {
    image: 11,
    answer: "goodlooking",
    logic: "The word 'good' visually looks attractive, representing physical attractiveness."
  },
  {
    image: 12,
    answer: "stepfather",
    logic: "The word 'father' is shown one step above, indicating a stepfather."
  }
];


// ---------------- GAME STATE ----------------
let currentlevel = 0;
let wrongattempt = 0;
let logicshow = 0;

// ---------------- HELPERS ----------------
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[\s-]/g, ""); // remove spaces and hyphens
}

const levels = shuffle(alllevels).slice(0, 10);

// ---------------- LOAD LEVEL ----------------
function changelevel(level) {
  hintImage.src = `images/${level.image}.jpg`;
  hintImage.alt = "level image";
  useranswer.value = "";
  wrongattempt = 0;
}

// Load first level
changelevel(levels[currentlevel]);

// ---------------- HOME BUTTON ----------------
homebtn.addEventListener("click", () => {
  window.location.href = "index.html";
});
logic.addEventListener("click", () => {
    if (logicshow < 3) {
        logic.textContent = levels[currentlevel].logic;
        logicshow++;
    }
    else {
        logic.textContent ="OMG! No more logic hints left!";
    }
    
});
// ---------------- SUBMIT ANSWER ----------------
submitbtn.addEventListener("click", () => {
  const answer = normalize(useranswer.value);

  if (answer === levels[currentlevel].answer) {
    correctsound.play();
    congrats.textContent = "🎉 Correct! Well done!";
    showConfetti();

    setTimeout(() => {
      congrats.textContent = "";
      currentlevel++;

        if (currentlevel < levels.length) {
            changelevel(levels[currentlevel]);
            logic.textContent ="💡";
      } else {
            wonsound.play();
            logicshow = 0;
        alert("🏆 Congratulations! You completed level 2!");
        window.location.href = "index.html";
      }
    }, 2500);

  } else {
    wrongSound.play();
    wrongattempt++;

    if (wrongattempt >= 3) {
      congrats.textContent =
        "❌ Wrong! Correct answer is: " + levels[currentlevel].answer;

      setTimeout(() => {
        congrats.textContent = "";
        currentlevel++;

        if (currentlevel < levels.length) {
            changelevel(levels[currentlevel]);
            logic.textContent ="💡";
        } else {
            wonsound.play();
            logicshow = 0;
            alert("🏆 Congratulations! You completed level 2!");
          window.location.href = "index.html";
        }
      }, 3000);
    } else {
      congrats.textContent = "❌ Wrong answer. Try again!";
    }
  }
});

// ---------------- ENTER KEY SUPPORT ----------------
useranswer.addEventListener("keypress", (e) => {
  if (e.key === "Enter") submitbtn.click();
});

// ---------------- CONFETTI ----------------
function showConfetti() {
  const container = document.getElementById("confetti-container");

  for (let i = 0; i < 200; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.top = Math.random() * 100 + "vh";
    confetti.style.animationDuration =
      Math.random() * 2 + 1.5 + "s";
    confetti.style.backgroundColor = randomColor();

    container.appendChild(confetti);
    setTimeout(() => confetti.remove(), 3000);
  }
}

function randomColor() {
  const colors = ["#ff0", "#f0f", "#0ff", "#0f0", "#f00", "#00f"];
  return colors[Math.floor(Math.random() * colors.length)];
}
