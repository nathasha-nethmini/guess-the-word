const submitbtn = document.getElementById("submit");
const useranswer = document.getElementById("answer");
const wrongSound = document.getElementById("wrong-sound");
const correctsound = document.getElementById("correct-sound");
const wonsound = document.getElementById("won-sound");
const homebtn = document.getElementById("home");
const congrats = document.getElementById("congrats");
const alllevels = [
    { hints: ["2️⃣", "Day"], answer: "today" },
    { hints: ["👂", "💍"], answer: "earring" },
    { hints: ["💡", "🏠"], answer: "lighthouse" },
    { hints: ["⭐", "🐟"], answer: "starfish" },
    { hints: ["🌲", "🍎"], answer: "pineapple" },
    { hints: ["🅱️", "4️⃣"], answer: "before" },
    { hints: ["N", "8️⃣"], answer: "night" },
    { hints: ["do", "🥜"], answer: "donut" },
    { hints: ["2️⃣", "🐝"], answer: "tobe" },
    { hints: ["🌞", "👓"], answer: "sunglass" },
    { hints: ["❄️", "👨"], answer: "snowman" },
    { hints: ["👂", "☎️"], answer: "earphone" },
    { hints: ["🧺", "⚽"], answer: "basketball" },
    { hints: ["👣", "🖨️"], answer: "footprint" },
    { hints: ["🔥", "🏢"], answer: "firehouse" },
    { hints: ["2️⃣", "🌃"], answer: "tonight" },
    { hints: ["🌞", "🌻"], answer: "sunflower" },
    { hints: ["❄️", "⚽"], answer: "snowball" },
    { hints: ["👁️", "📱"], answer: "iphone" },
    { hints: ["🔥", "👨"], answer: "fireman" },
    { hints: ["🫱", "💼"], answer: "handbag" },
    { hints: ["🌧️", "🧥"], answer: "raincoat" },
    { hints: ["🍳", "🎂"], answer: "pancake" },
    { hints: ["🛌", "⏰"], answer: "bedtime" },
    { hints: ["👄", "🥢"], answer: "lipstick" },
    { hints: ["🐄", "👦"], answer: "cowboy" },
    

];

let currentlevel = 0;
let wrongattempt = 0;
function changelevel(level) {
  document.getElementById("hint1").textContent = level.hints[0];
  document.getElementById("hint2").textContent = level.hints[1];
  useranswer.value = "";
}
homebtn.addEventListener("click", () => {
    window.location.href = "index.html";
});
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
const levels = shuffle(alllevels).slice(0, 10);
// Load first level
changelevel(levels[currentlevel]);

submitbtn.addEventListener("click", () => {
  const answer = useranswer.value.trim().toLowerCase();
  

    if (answer === levels[currentlevel].answer) {
    correctsound.play(); 
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
          wonsound.play();
          window.alert("congratulations..!🏆 You completed all levels!");
          setTimeout(() => {
            window.location.href = "index.html";
          }, 1500);
          
      }
    }, 3000); 

  } else {
      wrongSound.play(); // <-- plays the sound
    wrongattempt++;
        if (wrongattempt >= 3) {
            document.getElementById("congrats").textContent = "❌ Wrong answer. correctanswer is : " + levels[currentlevel].answer;
            wrongattempt = 0;
            setTimeout(() => {
            congrats.textContent = "";
            currentlevel++;

            if (currentlevel < levels.length) {
                changelevel(levels[currentlevel]);
            } else {
                wonsound.play();
                window.alert("congratulations..!🏆 You completed all levels!");
                window.location.href = "home.html";
            }
            }, 3000);
        }
        else {
            congrats.textContent = "❌ Wrong answer. Try again!";
            
        }
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
