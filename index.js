const scoreboard = document.getElementById("score");
var gamedata={
    score:0,
}
loadGame();
setInterval(loadGame(),5000);

function updateScore(){
    scoreboard.innerText = "Score: "+gamedata.score;
}
function increaseScore(){
    gamedata.score++;
    updateScore();
}
function saveGame(){
    const str = JSON.stringify(gamedata);
    localStorage.setItem("gamedata",str);
}
function loadGame(){
    gamedata = JSON.parse(localStorage.getItem("gamedata"))??gamedata;
}