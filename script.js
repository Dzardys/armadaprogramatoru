const startDate = new Date("2026-05-28T00:00:00").getTime(); 
const nextMeetDate = new Date("2026-08-01T15:20:00").getTime(); 

const photos = [
    { src: "assets/images/foto1.jpg", caption: "Naše první společná fotka ❤️" },
    { src: "assets/images/foto2.jpg", caption: "Když jsme se prosmáli celou noc 🥂" },
    { src: "assets/images/foto3.jpg", caption: "Tvůj dokonalý úsměv na výletě 🏔️" },
    { src: "assets/images/foto4.jpg", caption: "Náš nejkrásnější západ slunce 🌅" },
    { src: "assets/images/foto5.jpg", caption: "Spolu zvládnem jakoukoliv dálku... 🤝" },
    { src: "assets/images/foto6.jpg", caption: "Moment, na který nikdy nezapomenu 🦄" }
];

const ldrActivities = [
    "🎬 Filmový večer: Dnes vybíráš film ty! Pustíme si ho přes Teleparty přesně ve stejný čas.",
    "🍝 Společná FaceTime večeře: Oba si uvaříme stejné jídlo a najíme se spolu přes kameru.",
    "Gaming: Zahrajeme si spolu online nějakou super mobilní nebo PC hru!",
    "🗺️ Plánování: Otevřeme Google Mapy a naplánujeme itinerář našeho příštího výletu.",
    "💬 20 Otázek: Budeme si střídavě pokládat hluboké otázky, na které musíme upřímně odpovědět."
];

const compliments = [
    "Jsi to nejlepší, co mě kdy potkalo! Bez tebe je svět černobílý. 💖",
    "Tvůj úsměv mi na dálku dokáže rozzářit i ten nejtemnější den. ✨",
    "Jsem na tebe neskutečně hrdý za to, jak všechno skvěle zvládáš. 🌸",
    "Nemůžu se dočkat, až tě znova pevně chytím za ruku a nepustím. 🤗",
    "Vzdálenost jen dokazuje, jak silná naše láska ve skutečnosti je. 💪❤️"
];

const quizData = [
    { question: "Co jsem měl na sobě oblečené na našem úplně prvním rande?", options: ["Modrou košili", "Černé tričko", "Bílou mikinu"], correct: 1 },
    { question: "Jaké je mé nejoblíbenější jídlo od tebe?", options: ["Palačinky", "Těstoviny", "Dortík"], correct: 0 },
    { question: "Kam poletíme na naši vysněnou dovolenou?", options: ["Paříž", "Maledivy", "Island"], correct: 0 }
];

const initialBucketList = ["Vidět společně polární záři", "Adoptovat si pejska", "Protančit noc v dešti", "Jet na spontánní roadtrip"];
const initialCoupons = ["30minutová masáž zad", "Uvařím ti tvoji vysněnou večeři", "Právo na výběr filmu", "Snídaně do postele"];

let letterTyped = false;
let currentPhotoIndex = 0;
let currentQuestionIndex = 0;
let quizScore = 0;
let firstCard = null, secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

window.onload = () => {
    typeLetter();
    startLoveClock();
    startNextMeetClock();
    initBucketList();
    initCoupons();
    loadNotes();
    setupPexeso();
    setupGlitterCursor();
};

function showSection(sectionId) {
    document.querySelectorAll('section').forEach(sec => {
        sec.classList.remove('active');
        sec.classList.add('hidden');
    });
    const activeSec = document.getElementById(sectionId);
    if (activeSec) {
        activeSec.classList.remove('hidden');
        activeSec.classList.add('active');
    }
    if(sectionId === 'letter' && !letterTyped) typeLetter();
    
    // Automatické zatvorenie menu na mobile po kliknutí na sekciu
    const mobileNav = document.querySelector('nav');
    if(mobileNav) mobileNav.classList.remove('mobile-open');
}

function setupGlitterCursor() {
    const container = document.getElementById('cursor-trail-container');
    if (!container) return; // Bezpečnostná poistka pre mobily
    
    window.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.15) return; 
        const particle = document.createElement('span');
        particle.classList.add('sparkle-particle');
        particle.innerText = Math.random() > 0.5 ? "✨" : "💖";
        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';
        container.appendChild(particle);
        setTimeout(() => { particle.remove(); }, 800);
    });
}

let isPlaying = false;
function toggleMusic() {
    const audio = document.getElementById('bgMusic');
    const btn = document.getElementById('musicBtn');
    if (isPlaying) {
        audio.pause();
        btn.innerText = "🎵 Zapnout naši písničku";
    } else {
        audio.play().then(() => { btn.innerText = "⏸️ Pozastavit hudbu"; })
        .catch(() => { alert("Vlož hudební soubor do složky! 😊"); });
    }
    isPlaying = !isPlaying;
}

const letterText = "Ahoj lásko, \n\nvím, že vztah na dálku není vždycky jednoduchý a že ty kilometry mezi námi občas bolí. Proto jsem pro tebe vytvořil toto speciální bezpečné místo. \n\nMísto, které patří jenom nám dva. Kdykoliv ti bude smutno, najdeš zde mé důvody, vzpomínky, pexeso z našich fotek nebo krabičku poslední záchrany. Miluji tě čím dál víc!\n\nTvůj milující programátor ❤️";
let letterIndex = 0;
function typeLetter() {
    const el = document.getElementById("typewriter-text");
    if (!el) return;
    if (letterIndex < letterText.length) {
        let char = letterText.charAt(letterIndex);
        el.innerHTML += (char === '\n') ? "<br>" : char;
        letterIndex++;
        setTimeout(typeLetter, 40);
    } else { letterTyped = true; }
}

function startLoveClock() {
    setInterval(() => {
        const el = document.getElementById("time-display");
        if (!el) return;
        const diff = new Date().getTime() - startDate;
        el.innerHTML = formatTime(diff);
    }, 1000);
}

function startNextMeetClock() {
    setInterval(() => {
        const el = document.getElementById("countdown-display");
        if (!el) return;
        const diff = nextMeetDate - new Date().getTime();
        if (diff <= 0) {
            el.innerHTML = "KONEČNĚ SPOLU! ❤️🎉";
            return;
        }
        el.innerHTML = formatTime(diff);
    }, 1000);
}

function formatTime(diff) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${days} dní, ${hours} hodin, ${minutes} minut, ${seconds} sekund`;
}

function changePhoto(direction) {
    currentPhotoIndex = (currentPhotoIndex + direction + photos.length) % photos.length;
    const img = document.getElementById("galleryPhoto");
    const cap = document.getElementById("photoCaption");
    if(!img || !cap) return;
    img.style.opacity = 0.2;
    setTimeout(() => {
        img.src = photos[currentPhotoIndex].src;
        cap.innerText = photos[currentPhotoIndex].caption;
        img.style.opacity = 1;
    }, 200);
}

const moodResponses = {
    happy: "To mě neskutečně hřeje u srdíčka! Udržuj si tenhle krásný úsměv, posílám ti k tomu pusu na dálku! 😘💋",
    sad: "Zlatíčko, nebuď smutná. Kilometry nás nerozdělí. Zavři oči, mysli na moje objetí a pusť si naši písničku. Jsem tu s tebou. 🥺❤️",
    tired: "Pracovala jsi moc tvrdě, viď? Udělej si teplý čaj, zabal se do deky a odpočívej. Dneska ti zakazuji jakýkoliv stres! 😴☕",
    angry: "Nadechni se, vydechni... Kdo tě naštval? Chceš, abych na něj poslal armádu programátorů? Pamatuj, že já tě bezpodmínečně miluju. 😤❤️"
};
function selectMood(mood) {
    const respBox = document.getElementById("mood-response");
    if(!respBox) return;
    respBox.innerText = moodResponses[mood];
    respBox.classList.remove("hidden-msg");
    createHeartRain();
}

function revealReason(el, txt) { el.innerHTML = txt; el.style.background = "#ff7675"; el.style.color = "white"; }
function generateLdrActivity() {
    const box = document.getElementById("ldr-activity-box");
    if(!box) return;
    box.innerText = ldrActivities[Math.floor(Math.random() * ldrActivities.length)];
    box.classList.remove("hidden-msg");
    createHeartRain();
}

function breakCookie() {
    const cookie = document.getElementById("cookie-graphic");
    if(!cookie || cookie.classList.contains('broken')) return;
    cookie.classList.add('broken');
    setTimeout(() => {
        const box = document.getElementById("compliment-box");
        if(!box) return;
        box.innerText = compliments[Math.floor(Math.random() * compliments.length)];
        box.classList.remove("hidden-msg");
        createHeartRain();
    }, 400);
}

function setupPexeso() {
    const board = document.getElementById("pexesoBoard");
    if(!board) return;
    board.innerHTML = "";
    matchedPairs = 0;
    const winBox = document.getElementById("pexeso-win-box");
    if(winBox) winBox.classList.add("hidden-msg");

    let pexesoArray = [];
    photos.forEach((p, index) => {
        pexesoArray.push({ id: index, src: p.src });
        pexesoArray.push({ id: index, src: p.src });
    });

    pexesoArray.sort(() => Math.random() - 0.5);

    pexesoArray.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("pexeso-card");
        card.dataset.id = item.id;

        card.innerHTML = `
            <div class="card-face card-front">❤️</div>
            <div class="card-face card-back"><img src="${item.src}"></div>
        `;
        card.onclick = flipPexesoCard;
        board.appendChild(card);
    });
}

function flipPexesoCard() {
    if (lockBoard || this === firstCard || this.classList.contains('flipped')) return;
    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }
    secondCard = this;
    lockBoard = true;

    if (firstCard.dataset.id === secondCard.dataset.id) {
        matchedPairs++;
        firstCard = null; secondCard = null; lockBoard = false;
        if (matchedPairs === photos.length) {
            const winBox = document.getElementById("pexeso-win-box");
            if(winBox) winBox.classList.remove("hidden-msg");
            createHeartRain();
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard = null; secondCard = null; lockBoard = false;
        }, 1000);
    }
}

function resetQuiz() { currentQuestionIndex = 0; quizScore = 0; document.getElementById("quiz-container").classList.remove("hidden-msg"); document.getElementById("quiz-result-container").classList.add("hidden-msg"); loadQuestion(); }
function loadQuestion() {
    const q = quizData[currentQuestionIndex];
    const qEl = document.getElementById("quiz-question");
    const optCont = document.getElementById("quiz-options");
    const prog = document.getElementById("quiz-progress");
    if(!qEl || !optCont || !prog) return;

    qEl.innerText = q.question;
    optCont.innerHTML = "";
    q.options.forEach((o, i) => {
        const b = document.createElement("button"); b.classList.add("quiz-opt-btn"); b.innerText = o; b.onclick = () => { if(i===q.correct) {quizScore++; createHeartRain();} currentQuestionIndex++; if(currentQuestionIndex<quizData.length){loadQuestion();}else{showQuizResults();} };
        optCont.appendChild(b);
    });
    prog.innerText = `Otázka ${currentQuestionIndex+1} z ${quizData.length}`;
}
function showQuizResults() {
    document.getElementById("quiz-container").classList.add("hidden-msg");
    const res = document.getElementById("quiz-result-container"); res.classList.remove("hidden-msg");
    document.getElementById("quiz-score-text").innerHTML = `Skóre: <strong>${quizScore} z ${quizData.length}</strong>!<br>` + (quizScore===quizData.length ? "Dokonalé! Ty mě znáš nejlíp! 😍" : "Skoro! Příště to dáš na plný počet! 😜");
}

function initBucketList() {
    const cont = document.getElementById("bucketListContainer");
    if(!cont) return;
    let saved = JSON.parse(localStorage.getItem('loveBucketList')) || initialBucketList.map(t => ({text:t, checked:false}));
    localStorage.setItem('loveBucketList', JSON.stringify(saved));
    cont.innerHTML = "";
    saved.forEach((item, i) => {
        const lbl = document.createElement("label"); if(item.checked) lbl.classList.add("checked");
        const chk = document.createElement("input"); chk.type = "checkbox"; chk.checked = item.checked;
        chk.onchange = () => { saved[i].checked = !saved[i].checked; localStorage.setItem('loveBucketList', JSON.stringify(saved)); initBucketList(); if(saved[i].checked) createHeartRain(); };
        lbl.append(chk, " " + item.text); cont.appendChild(lbl);
    });
}
function initCoupons() {
    const cont = document.getElementById("couponsContainer");
    if(!cont) return;
    let saved = JSON.parse(localStorage.getItem('loveCoupons')) || initialCoupons.map(t => ({text:t, used:false}));
    localStorage.setItem('loveCoupons', JSON.stringify(saved));
    cont.innerHTML = "";
    saved.forEach((item, i) => {
        const div = document.createElement("div"); div.classList.add("coupon");
        if(item.used) { div.classList.add("used"); div.innerText = item.text + " (VYUŽITO)"; }
        else { div.innerText = item.text; div.onclick = () => { if(confirm("Chceš uplatnit kupón teď?")) { saved[i].used = true; localStorage.setItem('loveCoupons', JSON.stringify(saved)); initCoupons(); alert("Aktivováno! Ozvi se mi a splním ti to. 🥰"); } }; }
        cont.appendChild(div);
    });
}
function saveNote() {
    const input = document.getElementById("noteInput"); if(!input) return;
    const txt = input.value.trim(); if(!txt) return;
    let notes = JSON.parse(localStorage.getItem('loveNotes')) || []; notes.push(txt);
    localStorage.setItem('loveNotes', JSON.stringify(notes)); input.value = ""; loadNotes(); createHeartRain();
}
function loadNotes() {
    const board = document.getElementById("notesBoard"); if(!board) return;
    board.innerHTML = "";
    let notes = JSON.parse(localStorage.getItem('loveNotes')) || [];
    notes.forEach((n, i) => {
        const div = document.createElement("div"); div.classList.add("saved-note"); div.innerText = n;
        const btn = document.createElement("button"); btn.classList.add("delete-note-btn"); btn.innerText = "❌"; btn.onclick = () => { notes.splice(i,1); localStorage.setItem('loveNotes', JSON.stringify(notes)); loadNotes(); };
        div.appendChild(btn); board.appendChild(div);
    });
}

function createHeartRain() {
    for (let i = 0; i < 35; i++) {
        setTimeout(() => {
            const heart = document.createElement("div"); heart.classList.add("falling-heart");
            heart.innerText = Math.random() > 0.5 ? "❤️" : "💖";
            heart.style.left = Math.random() * 100 + "vw";
            heart.style.animationDuration = (Math.random() * 2 + 2) + "s";
            document.body.appendChild(heart);
            setTimeout(() => { heart.remove(); }, 4500);
        }, i * 60);
    }
}

function toggleMenu() {
    const nav = document.querySelector('nav');
    if(nav) nav.classList.toggle('mobile-open');
}