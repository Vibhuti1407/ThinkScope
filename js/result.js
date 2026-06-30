// Default Result
const defaultResult = {
    title: "Logical Thinker",
    score: 84,
    description:
        "You carefully analyze situations before making decisions. Facts, evidence, and structured reasoning guide your choices.",
    strengths: [
        "Creative Problem Solving",
        "Analytical Mind",
        "Decision Making"
    ],
    tips: [
        "Trust your instincts occasionally.",
        "Avoid overanalyzing every situation.",
        "Balance logic with emotions.",
        "Challenge yourself with new experiences.",
        "Practice mindfulness."
    ]
};

// Load Result
let result = JSON.parse(localStorage.getItem("thinkScopeResult"));
if (!result) {
    result = defaultResult;
}

// UPDATE RESULT PAGE
const title = document.getElementById("resultTitle");
const score = document.getElementById("score");
const description = document.getElementById("resultDescription");
if (title) title.innerText = result.title;
if (score) score.innerText = result.score + "%";
if (description) description.innerText = result.description;

// UPDATE STRENGTHS
const strengthCards = document.querySelectorAll(".strengths .card");
strengthCards.forEach((card, index) => {
    const heading = card.querySelector("h3");
    if (result.strengths[index]) {
        heading.innerText = result.strengths[index];
    }
});

// UPDATE TIPS
const tipsList = document.querySelector(".tips ul");
if (tipsList) {
    tipsList.innerHTML = "";
    result.tips.forEach(tip => {
        const li = document.createElement("li");
        li.innerHTML = "✔ " + tip;
        tipsList.appendChild(li);
    });
}

// SHARE BUTTON
const shareBtn = document.querySelector(".shareBtn");
if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
        const shareData = {
            title: "ThinkScope",
            text:
                `I got "${result.title}" with a score of ${result.score}% on ThinkScope! What's your thinking style?`,
            url: window.location.href
        };
        if (navigator.share) {
            try {
                await navigator.share(shareData);

            } catch (err) {
                console.log(err);
            }

        } else {
            navigator.clipboard.writeText(
                `${shareData.text}\n${shareData.url}`
            );
            alert("Result copied to clipboard!");
        }
    });
}

// SIMPLE ANIMATION
const card = document.querySelector(".result-card");
if (card) {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    setTimeout(() => {
        card.style.transition = "0.7s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
    }, 300);
}

// CONSOLE
console.log("Result Loaded Successfully");