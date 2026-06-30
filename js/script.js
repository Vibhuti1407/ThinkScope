// DARK MODE
const themeBtn = document.getElementById("themeBtn");
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    if (themeBtn) {
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
}
if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
            themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            localStorage.setItem("theme", "light");
            themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    });
}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// SCROLL REVEAL
const revealElements = document.querySelectorAll(
    ".quiz-card, .feature-box, .review, .stat-card"
);
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0px)";
        }
    });
}, {
    threshold: 0.2
});

revealElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(40px)";
    element.style.transition = "0.7s ease";
    observer.observe(element);
});

// ANIMATED COUNTERS
const counters = document.querySelectorAll(".stat-card h2");
counters.forEach(counter => {
    const target = parseInt(counter.innerText);
    if (isNaN(target)) return;
    let count = 0;
    const updateCounter = () => {
        count += Math.ceil(target / 50);
        if (count >= target) {
            counter.innerText = target + "+";
        } else {
            counter.innerText = count + "+";
            requestAnimationFrame(updateCounter);
        }
    };
    updateCounter();
});

// BUTTON HOVER EFFECT
const buttons = document.querySelectorAll(".btn, .card-btn");
buttons.forEach(button => {
    button.addEventListener("mouseenter", () => {
        button.style.transform = "translateY(-5px)";
    });
    button.addEventListener("mouseleave", () => {
        button.style.transform = "translateY(0px)";
    });
});

// PAGE LOADED
window.addEventListener("load", () => {
    console.log("ThinkScope Loaded Successfully!");
});

// BACK TO TOP BUTTON
// Create Button
const topBtn = document.createElement("button");
topBtn.innerHTML = "↑";
topBtn.id = "topBtn";
document.body.appendChild(topBtn);

// Styling
topBtn.style.position = "fixed";
topBtn.style.right = "25px";
topBtn.style.bottom = "25px";
topBtn.style.width = "50px";
topBtn.style.height = "50px";
topBtn.style.border = "none";
topBtn.style.borderRadius = "50%";
topBtn.style.background = "#5b4bff";
topBtn.style.color = "#fff";
topBtn.style.fontSize = "22px";
topBtn.style.cursor = "pointer";
topBtn.style.display = "none";
topBtn.style.boxShadow = "0 10px 20px rgba(0,0,0,.2)";
topBtn.style.transition = ".3s";

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});

topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});