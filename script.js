// ==========================================
// 1. ADATOK
// ==========================================
const teljesLista = [
    "yay", 
    "mélyen szomorú", 
    "okaayy", 
    "Amugy valid", 
    "*Függvény nevében fog beszélni*", 
    "Én egy pointer vagyok", 
    "E/3", 
    "Amúgy Matróz, ez így most mi", 
    "előadás milyen volt", 
    "kiváló", 
    "gatyus/gatya", 
    "Ő ja", 
    "ó hát ez nagyon jó", 
    "*fikázza a rövidítéseket*", 
    "mit mondok", 
    "lol", 
    "67", 
    "sus", 
    "SZUPPPPI🥰", 
    "naaaa", 
    "egyébként igen", 
    "ez mélyen igaz", 
    "nagyjából érthető?", 
    "ajaj", 
    "*oli kiég/ragel*", 
    "és akkor mondanátok...", 
    "hop hop hop hop", 
    "*rajzol valamit a táblára a memóriával kapcsolatban*", 
    "bro", 
    "triviális", 
    "wow", 
    "jogos", 
    "ez durva", 
    "valami gyanús", 
    "fáj a lelkemnek", 
    "bumm", 
    "xd"
];

let aktualisMeret = 5; 

function ujJatek() {
    // Gomb eltüntetése
    document.getElementById("btnBingo").style.display = "none";
    // Overlay eltüntetése
    document.getElementById("winOverlay").classList.add("hidden");
    // Restart gomb elrejtése
    document.getElementById("btnRestart").style.display = "none";
    
    const select = document.getElementById("meret");
    aktualisMeret = parseInt(select.value);

    const tabla = document.getElementById("jatekater");
    tabla.style.gridTemplateColumns = `repeat(${aktualisMeret}, 1fr)`;
    tabla.innerHTML = ""; 

    let jatekSzavak = [];
    
    if (aktualisMeret === 5) {
        jatekSzavak = veletlenValogatas(teljesLista, 23);
        jatekSzavak.push("Egy bingó mező kétszer");
        keveres(jatekSzavak);
        jatekSzavak.splice(12, 0, "FREE SPACE"); 
    } else {
        let darab = aktualisMeret * aktualisMeret;
        jatekSzavak = veletlenValogatas(teljesLista, darab);
        keveres(jatekSzavak);
    }

    for (let i = 0; i < jatekSzavak.length; i++) {
        let mezo = document.createElement("div");
        mezo.className = "mezo";
        mezo.innerText = jatekSzavak[i];
        mezo.id = "cell-" + i;
        
        if (aktualisMeret === 5 && i === 12) {
            mezo.classList.add("free-space");
            mezo.classList.add("kivalasztva");
            mezo.innerText = "*hadar, és senki sem érti (free space)*";
        }

        mezo.onclick = function() {
            if (this.classList.contains("free-space")) {
                return;
            }
            this.classList.toggle("kivalasztva");
            ellenorzes();
        };

        tabla.appendChild(mezo);
    }
}

function veletlenValogatas(forrasLista, darab) {
    let masolat = [...forrasLista];
    keveres(masolat);
    return masolat.slice(0, darab);
}

function keveres(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// ==========================================
// 2. NYERÉS ELLENŐRZÉSE
// ==========================================
function ellenorzes() {
    let n = aktualisMeret;
    let vanBingo = false;

    const check = (index) => {
        let elem = document.getElementById("cell-" + index);
        return elem && elem.classList.contains("kivalasztva");
    };

    // Sorok
    for (let r = 0; r < n; r++) {
        let sorTeljes = true;
        for (let c = 0; c < n; c++) {
            if (!check(r * n + c)) sorTeljes = false;
        }
        if (sorTeljes) vanBingo = true;
    }

    // Oszlopok
    for (let c = 0; c < n; c++) {
        let oszlopTeljes = true;
        for (let r = 0; r < n; r++) {
            if (!check(r * n + c)) oszlopTeljes = false;
        }
        if (oszlopTeljes) vanBingo = true;
    }

    // Átló 1
    let atlo1Teljes = true;
    for (let i = 0; i < n; i++) {
        if (!check(i * n + i)) atlo1Teljes = false;
    }
    if (atlo1Teljes) vanBingo = true;

    // Átló 2
    let atlo2Teljes = true;
    for (let i = 0; i < n; i++) {
        if (!check(i * n + (n - 1 - i))) atlo2Teljes = false;
    }
    if (atlo2Teljes) vanBingo = true;

    const gomb = document.getElementById("btnBingo");
    if (vanBingo) {
        gomb.style.display = "inline-block"; 
    } else {
        gomb.style.display = "none";
    }
}

// ==========================================
// 3. GYŐZELMI EFFEKTEK
// ==========================================
function gyozelem() {
    document.getElementById("btnBingo").style.display = "none";
    document.getElementById("winOverlay").classList.remove("hidden");
    
    const restartBtn = document.getElementById("btnRestart");
    restartBtn.style.display = "none";

    var duration = 3 * 1000; 
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 200 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
        setTimeout(() => {
            restartBtn.style.display = "block";
        }, 500);
        return;
      }
      var particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

// Indulás
ujJatek();