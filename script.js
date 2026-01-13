const submitbtn = document.getElementById("submit");
const useranswer = document.getElementById("answer");

const levels = [
  { hints: ["2️⃣", "Day"], answer: "today" },
  { hints: ["👂", "💍"], answer: "earring" },
  { hints: ["💡", "🏠"], answer: "lighthouse" },
  { hints: ["⭐", "🐟"], answer: "starfish" },
  { hints: ["🌲", "🍎"], answer: "pineapple" },
  { hints: ["🅱️", "4️⃣"], answer: "before" },
  { hints: ["N", "8️⃣"], answer: "night" },
  { hints: ["👁️", "🤝"], answer: "ideal" },
  { hints: ["do", "🥜"], answer: "donut" },
  { hints: ["2️⃣", "🐝"], answer: "tobe" }
];

let currentlevel = 0;

function changelevel(level) {
  document.getElementById("hint1").textContent = level.hints[0];
  document.getElementById("hint2").textContent = level.hints[1];
  useranswer.value = "";
}

// Load first level
changelevel(levels[currentlevel]);

submitbtn.addEventListener("click", () => {
  const answer = useranswer.value.trim().toLowerCase();
  const congrats = document.getElementById("congrats");

  if (answer === levels[currentlevel].answer) {
    // show message
    congrats.textContent = "🎉 Correct! Well done!";
    showConfetti();

    // wait before next level
    setTimeout(() => {
      congrats.textContent = "";
      currentlevel++;

      if (currentlevel < levels.length) {
        changelevel(levels[currentlevel]);
      } else {
          window.alert("congratulations..!🏆 You completed all levels!");
          currentlevel = 0;
          changelevel(levels[currentlevel]);
      }
    }, 2000);

  } else {
    alert("❌ Wrong answer. Try again!");
  }
});


// Enter key support
useranswer.addEventListener("keypress", (e) => {
  if (e.key === "Enter") submitbtn.click();
});


function showConfetti() {
  const container = document.getElementById("confetti-container");

  for (let i = 0; i < 200; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.top = Math.random()*100+"vh";
    confetti.style.animationDuration = (Math.random() * 2 + 1.5) + "s";
    confetti.style.backgroundColor = randomColor();

    container.appendChild(confetti);

    setTimeout(() => confetti.remove(), 3000);
  }
}

function randomColor() {
  const colors = ["#ff0", "#f0f", "#0ff", "#0f0", "#f00", "#00f"];
  return colors[Math.floor(Math.random() * colors.length)];
}
