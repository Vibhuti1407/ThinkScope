// Detect quiz from URL
const params = new URLSearchParams(window.location.search);
const selectedQuiz = params.get("quiz") || "overthinker";

// QUIZ DATABASE
const quizzes = {
    overthinker: [
        {question:"You replay conversations in your mind after they end.",options:["Never","Sometimes","Often","Always"],score:[1,2,3,4]},
        {question:"You worry about making the wrong decision.",options:["Never","Sometimes","Often","Always"],score:[1,2,3,4]},
        {question:"You imagine worst-case scenarios.",options:["Never","Sometimes","Often","Always"],score:[1,2,3,4]},
        {question:"You struggle to sleep because your mind is busy.",options:["Never","Sometimes","Often","Always"],score:[1,2,3,4]},
        {question:"You seek reassurance before making decisions.",options:["Never","Sometimes","Often","Always"],score:[1,2,3,4]},
        {question:"You analyze small mistakes repeatedly.",options:["Never","Sometimes","Often","Always"],score:[1,2,3,4]},
        {question:"You delay decisions because you want perfection.",options:["Never","Sometimes","Often","Always"],score:[1,2,3,4]},
        {question:"You think about the future more than today.",options:["Never","Sometimes","Often","Always"],score:[1,2,3,4]},
        {question:"You find it difficult to let things go.",options:["Never","Sometimes","Often","Always"],score:[1,2,3,4]},
        {question:"You rewrite messages before sending them.",options:["Never","Sometimes","Often","Always"],score:[1,2,3,4]}
    ],
    creative:[
        {question:"You enjoy creating new ideas.",options:["Strongly Disagree","Disagree","Agree","Strongly Agree"],score:[1,2,3,4]},
        {question:"You enjoy drawing, writing or music.",options:["Never","Sometimes","Often","Always"],score:[1,2,3,4]},
        {question:"You imagine different ways to solve problems.",options:["Never","Sometimes","Often","Always"],score:[1,2,3,4]},
        {question:"You enjoy experimenting.",options:["Never","Sometimes","Often","Always"],score:[1,2,3,4]},
        {question:"You notice details others miss.",options:["Never","Sometimes","Often","Always"],score:[1,2,3,4]},
        {question:"You brainstorm frequently.",options:["Never","Sometimes","Often","Always"],score:[1,2,3,4]},
        {question:"You like thinking outside the box.",options:["Never","Sometimes","Often","Always"],score:[1,2,3,4]},
        {question:"People describe you as imaginative.",options:["Never","Sometimes","Often","Always"],score:[1,2,3,4]},
        {question:"You enjoy learning creative skills.",options:["Never","Sometimes","Often","Always"],score:[1,2,3,4]},
        {question:"You love innovation.",options:["Never","Sometimes","Often","Always"],score:[1,2,3,4]}
    ],
    logical:[
        {question:"You rely on facts more than emotions.",options:["Strongly Disagree","Disagree","Agree","Strongly Agree"],score:[1,2,3,4]},
        {question:"You enjoy solving puzzles.",options:["Never","Sometimes","Often","Always"],score:[1,2,3,4]},
        {question:"You analyze data before deciding.",options:["Never","Sometimes","Often","Always"],score:[1,2,3,4]},
        {question:"You like mathematics or logic games.",options:["Never","Sometimes","Often","Always"],score:[1,2,3,4]},
        {question:"You stay calm under pressure.",options:["Never","Sometimes","Often","Always"],score:[1,2,3,4]},
        {question:"You enjoy finding patterns.",options:["Never","Sometimes","Often","Always"],score:[1,2,3,4]},
        {question:"You think step by step.",options:["Never","Sometimes","Often","Always"],score:[1,2,3,4]},
        {question:"You verify information before believing it.",options:["Never","Sometimes","Often","Always"],score:[1,2,3,4]},
        {question:"You enjoy analytical discussions.",options:["Never","Sometimes","Often","Always"],score:[1,2,3,4]},
        {question:"You make decisions using evidence.",options:["Never","Sometimes","Often","Always"],score:[1,2,3,4]}
    ]
};

// LOAD SELECTED QUIZ
const questions = quizzes[selectedQuiz];
let currentQuestion = 0;
let answers = new Array(questions.length).fill(null);

// HTML ELEMENTS
const quizTitle = document.getElementById("quizTitle");
const question = document.getElementById("question");
const optionButtons = document.querySelectorAll(".option-btn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const progress = document.getElementById("progress");
const questionNumber = document.getElementById("questionNumber");
const timer = document.getElementById("timer");

// TITLES
const titles = {
    overthinker:"Are You An Overthinker?",
    creative:"Creative Thinker Test",
    logical:"Logical Thinker Test"
};
quizTitle.innerText = titles[selectedQuiz];

// LOAD QUESTION
function loadQuestion(){
    question.innerText = questions[currentQuestion].question;
    questionNumber.innerText = `Question ${currentQuestion+1} / ${questions.length}`;
    progress.style.width = `${((currentQuestion+1)/questions.length)*100}%`;
    optionButtons.forEach((button,index)=>{
        button.innerText = questions[currentQuestion].options[index];
        button.classList.remove("active");
        if(answers[currentQuestion]===index){
            button.classList.add("active");
        }
    });
    prevBtn.disabled = currentQuestion===0;
}

// OPTION CLICK
optionButtons.forEach((button,index)=>{
    button.addEventListener("click",()=>{
        answers[currentQuestion]=index;
        optionButtons.forEach(btn=>{
            btn.classList.remove("active");
        });
        button.classList.add("active");
    });
});

// NEXT BUTTON
nextBtn.addEventListener("click",()=>{
    if(answers[currentQuestion]==null){
        alert("Please select an answer.");
        return; 
    }
    if(currentQuestion<questions.length-1){
        currentQuestion++;
        loadQuestion();
    }else{
        finishQuiz();
    }
});

// PREVIOUS BUTTON
prevBtn.addEventListener("click",()=>{
    if(currentQuestion>0){
        currentQuestion--;
        loadQuestion();
    }
});

// TIMER
let seconds = 300;
const countdown = setInterval(()=>{
    let min = Math.floor(seconds/60);
    let sec = seconds%60;
    timer.innerText = `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
    seconds--;
    if(seconds<0){
        clearInterval(countdown);
        finishQuiz();
    }
},1000);

// START QUIZ
loadQuestion();

// FINISH QUIZ
function finishQuiz() {
    clearInterval(countdown);
    let total = 0;
    answers.forEach((answer, index) => {
        if (answer !== null) {
            total += questions[index].score[answer];
        }
    });

    // Maximum score = 40
    const percentage = Math.round((total / 40) * 100);
    let title = "";
    let description = "";
    let strengths = [];
    let tips = [];

    // OVERTHINKER RESULT
    if (selectedQuiz === "overthinker") {
        if (percentage >= 80) {
            title = "Extreme Overthinker";
            description =
                "You analyze almost everything deeply and often imagine many possible outcomes. While this can help you prepare, it may also create unnecessary stress.";
            strengths = [
                "Highly Observant",
                "Excellent Planner",
                "Detail Oriented"
            ];
            tips = [
                "Practice mindfulness.",
                "Avoid chasing perfection.",
                "Trust your instincts.",
                "Take action sooner.",
                "Focus on the present."
            ];
        }
        else if (percentage >= 60) {
            title = "Moderate Overthinker";
            description =
                "You think carefully before making decisions but occasionally spend too much time analyzing situations.";
            strengths = [
                "Thoughtful",
                "Responsible",
                "Good Decision Maker"
            ];
            tips = [
                "Don't fear making mistakes.",
                "Set time limits for decisions.",
                "Relax your mind regularly.",
                "Take breaks.",
                "Trust yourself."
            ];
        }
        else {
            title = "Balanced Thinker";
            description =
                "You maintain a healthy balance between thinking and taking action.";
            strengths = [
                "Confident",
                "Balanced",
                "Calm Under Pressure"
            ];
            tips = [
                "Continue trusting yourself.",
                "Keep learning.",
                "Stay positive.",
                "Help others.",
                "Maintain your balance."
            ];
        }
    }

    // CREATIVE THINKER RESULT
    if (selectedQuiz === "creative") {
        if (percentage >= 80) {
            title = "Highly Creative Thinker";
            description =
                "Your imagination is one of your greatest strengths. You enjoy innovation, creativity and exploring new possibilities.";
        }
        else if (percentage >= 60) {
            title = "Creative Explorer";
            description =
                "You enjoy creative activities and often think outside the box.";
        }
        else {
            title = "Practical Thinker";
            description =
                "You prefer practical solutions but still have creative potential waiting to grow.";
        }
        strengths = [
            "Innovation",
            "Curiosity",
            "Problem Solving"
        ];
        tips = [
            "Read creative books.",
            "Learn a new hobby.",
            "Keep an idea journal.",
            "Challenge yourself.",
            "Experiment often."
        ];
    }

    // LOGICAL THINKER RESULT
    if (selectedQuiz === "logical") {
        if (percentage >= 80) {
            title = "Master Logical Thinker";
            description =
                "You naturally rely on evidence, reasoning and structured thinking when solving problems.";
        }
        else if (percentage >= 60) {
            title = "Logical Problem Solver";
            description =
                "You enjoy analyzing information before making decisions.";
        }
        else {
            title = "Balanced Decision Maker";
            description =
                "You combine logic with intuition when approaching problems.";
        }
        strengths = [
            "Critical Thinking",
            "Reasoning",
            "Decision Making"
        ];
        tips = [
            "Keep solving puzzles.",
            "Learn data analysis.",
            "Challenge assumptions.",
            "Practice strategic thinking.",
            "Continue learning."
        ];

    }

    // SAVE RESULT
    const result = {
        title: title,
        score: percentage,
        description: description,
        strengths: strengths,
        tips: tips
    };
    localStorage.setItem(
        "thinkScopeResult",
        JSON.stringify(result)
    );

    // Redirect
    window.location.href = "result.html";

}
