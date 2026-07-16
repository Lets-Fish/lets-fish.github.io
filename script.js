// JavaScript source code
var answer = "";
const poss = "abcdefg";
var row = 0;
var guess = "";
var guesses = {};
const cursed = "Ｈ0Ɍ$Ẹ";
const normal = "HORSE";
var over = false;
do {
    answer = "";
    for (var i = 0; i < 5; i++) {
        answer += poss[Math.ceil(Math.random() * poss.length-1)];
    }
}while(answer.search("c")==-1 || answer.split("g").length-1>1)

var mouseX = 0;
var mouseY = 0;
onmousemove = function (e) {
    mouseX = e.clientX-10;
    mouseY = e.clientY-10;
}
const re = /[HＨ][O0][RɌ][S$][EẸ]/;
const re_missed = /[Ｈ0Ɍ$Ẹ]/;
var projs = [];
var attack = [];
var darkness = 0;
var horse;

function rand(f,t){
    return Math.floor(Math.random()*(t-f+1))+f;
}

function generateRandomPermutation(n) {
    let permutation = Array
        .from({ length: n }, (_, i) => i );

    for (let i = n - 1; i > 0; i--) {
        const j = Math
            .floor(Math.random() * (i + 1));
        [permutation[i], permutation[j]]
            =
            [permutation[j], permutation[i]];
    }

    return permutation;
}

function guessSize(s) {
    var name = (s == "small" ? "guess_small" : "guess");
    let ch = document.getElementById("enter").children;
    for (var i = 0; i < ch.length; i++) {
        ch[i].className = name;
    }
}

function shuffle() {
    let ch = document.getElementById("enter").children;
    let perm = generateRandomPermutation(ch.length);
    for (var i = 0; i < ch.length; i++) {
        ch[i].style.order = perm[i];
    }
}

function unshuffle() {
    let ch = document.getElementById("enter").children;
    for (var i = 0; i < ch.length; i++) {
        ch[i].style.order = i;
    }
}

function submit() {
    if (guess.search(re)==-1) {
        alert("Guess wrong: Must be horse");
        return;
    }
    guessSize("normal");
    let cycle = 0;
    attack = [];
    darkness = 0;
    let correct = [];
    let ok = true;
    unshuffle();
    for (var i = 0; i < 5; i++) {
        if (guess[i].search(re_missed) != -1) {
            correct[i] = "missed";
        }
        else switch (answer[i]) {
            case 'a':
                correct[i] = "right";
                break;
            case 'b':
                correct[i] = (row % 2 == 1 ? "right" : "wrong");
                break;
            case 'c':
                if (row % 2 == 1) {
                    correct[i] = "right";
                } else {
                    correct[i] = "red";
                    let rect = document.getElementById("row"+row).getBoundingClientRect();
                    attack.push([rect.top + 40, rect.left + 22 + 70 * i]);
                    projectile(rect.top + 40, rect.left + 22 + 70 * i);
                }
                break;
            case 'd':
                if (row == 0) {
                    correct[i] = "wrong";
                    twitch_c(i);
                } else {
                    correct[i] = "right";
                }
                
                break;
            case 'e':
                if (row <= 2) {
                    correct[i] = "";
                    cycle++;
                } else {
                    correct[i] = "right";
                }
                
                break;
            case 'f':
                if (row % 3 == 2) {
                    correct[i] = "right";
                } else {
                    correct[i] = "dark";
                    darkness += 1;
                }
                break;
            case 'g':
                if (row % 3 == 2) {
                    correct[i] = "right";
                } else if (row % 3 == 1) {
                    correct[i] = "small";
                    guessSize("small");
                } else {
                    correct[i] = "white";
                    shuffle();
                }
                break;
        }
        if (correct[i] != "right") {
            ok = false;
        }
    }
    setGuess(correct);
    if (ok) {
        
        endGame(1);
        return;
    }
    answer = answer.substring(answer.length - cycle ) + answer.substring(0, answer.length  - cycle);
    row++;
    guess = "";
    if (row > 5)
        endGame(0);
}

function setGuess(correct = ["", "", "", "", ""]) {
    let s = guess.toUpperCase();
    while (s.length < 5) {
        s += " ";
    }
    let toInsert = `
    <td class="guess ${correct[0]}"><b class="letter">${s[0]}</b></td>
    <td class="guess ${correct[1]}"><b class="letter">${s[1]}</b></td>
    <td class="guess ${correct[2]}"><b class="letter">${s[2]}</b></td>
    <td class="guess ${correct[3]}"><b class="letter">${s[3]}</b></td>
    <td class="guess ${correct[4]}"><b class="letter">${s[4]}</b></td>
    `
    document.getElementById("row" + row).innerHTML = toInsert;
}

function pressed(s) {
    if (over) {
        return;
    }
        
    if (s === 'n') {
        submit();
        return;
    }
    if (s === 'f') {
        removefrank();
        return;
    }
    if (s === 'b') {
        if (guess.length >0) {
            guess = guess.substring(0,guess.length-1)
        }
    } else {
        if (guess.length < 5) {
            guess += document.getElementById("input"+s).innerText;
        }
    }
    setGuess();
}

function endGame(b) {
    over = true;
    for (var i = 0; i < projs.length; i++) {
        if (projs[i] == null)
            continue;
        projs[i][0].remove();
        delete projs[i];
        projs[i] = null;
    }
    projs = [];
    if (b) {
        alert("You Won!");
    } else {
        alert("You Lost!");
        guess = "";
        setGuess();
    }
    
    
}

const delay = ms => new Promise(res => setTimeout(res, ms));
async function twitch_c(n) {
    if (over)
        return;
    document.getElementById("input" + n).innerText = cursed[n];
    setTimeout(twitch_n, Math.ceil(Math.random() * 1000 + 2000), n);
}

async function twitch_n(n) {
    document.getElementById("input" + n).innerText = normal[n];
    setTimeout(twitch_c, Math.ceil(Math.random() * 100 + 300),n);
}
var w = window.innerWidth;
var h = window.innerHeight;
const buffer = 200;
async function move() {
    for (var i = 0; i < projs.length; i++) {
        if (projs[i] == null)
            continue;
        var x = Number(projs[i][0].style.left.substring(0, projs[i][0].style.left.length - 2));
        x += projs[i][1];
        projs[i][0].style.left = x + "px";
        var y = Number(projs[i][0].style.top.substring(0, projs[i][0].style.top.length - 2));
        y += projs[i][2];
        projs[i][0].style.top = y + "px";
        var dx = mouseX - x;
        var dy = mouseY - y;
        let mult = 1 / Math.sqrt(dx ** 2 + dy ** 2);
        projs[i][1] += dx * mult * 0.1;
        projs[i][2] += dy * mult * 0.1;
        projs[i][1] *= 0.995;
        projs[i][2] *= 0.995;
        if (1 / mult < 15) {
            endGame(false);
        }
    }
    setTimeout(move, 10);
}

function projectile(x,y) {
    if(projs.length>50)
        return;
    var insert = document.createElement('span');
    insert.className = "projectile";
    insert.style.top = x + "px";
    insert.style.left = y + "px";
    document.body.appendChild(insert)
    projs.push([insert, 0, 0]);
}

async function spawn() {
    if (over) {
        return;
    }
        
    for (var i = 0; i < attack.length;i++) {
        projectile(attack[i][0], attack[i][1]);
    }
    setTimeout(spawn, 5000/Math.max(1,attack.length));
}

async function blind() {
    if(darkness>0 && !over)
        splash(0);
    setTimeout(blind, (Math.random() * 10000+3000) / Math.max(1, darkness));
}

async function splash(a) {
    document.getElementById("blackscreen").style.opacity = a/100
    if(a<100)
        setTimeout(splash, 5, a + 1);
    else
        setTimeout(desplash, 500, 100);
}
async function desplash(a) {
    document.getElementById("blackscreen").style.opacity = a / 100
    if (a > 0)
        setTimeout(desplash, 5, a -1);
}
async function horse_s() {
    if (over)
        return;
    if(guess.length>0){
        let ho = document.createElement('img');
        ho.className = "horse";
        ho.src = "horse.png";
        document.body.appendChild(ho);
        ho.onclick = function () {
            removeHorse();
        };
        ho.style.left = rand(100,w-100)+"px";
        ho.style.top = rand(100,h-100)+"px";
        horse = ho;
        setTimeout(horse_e, Math.round(Math.random()*400)+1000);
    }else{
        setTimeout(horse_s, 5000);
    }
}

function removeHorse(){
    horse.remove();
    horse = null;
}

async function horse_e() {
    if (over)
        return;
    if(horse!=null){
        var index = Math.floor(Math.random() * guess.length);
        if (guess.length > 0) {
            guess = guess.slice(0, index) + guess.slice(index+1, guess.length)
            setGuess();
        }
        removeHorse();
    }
    setTimeout(horse_s, Math.round(Math.random()*5000)+10000);
}

move();
spawn();
blind();
setTimeout(horse_s, Math.round(Math.random()*5000)+10000);
