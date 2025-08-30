const scoreboard = document.getElementById("score");
var gamedata={
    score:0,
}
loadGame();
setInterval(loadGame(),5000);
//{}
//Debug
function addAfterHtmlID(id,str){
    const element = document.getElementById(id);
    element.outerHTML=element.outerHTML+str;
}
function addAfterHtmlName(name,str){
    const element = document.getElementsByClassName(name);
    element.innerHTML=element.innerHTML+str;
}
function addInHtmlID(id,str){
    const element = document.getElementById(id);
    var end = element.outerHTML.indexOf(" ");
    if(element.outerHTML.indexOf(">")<end){
        end = element.outerHTML.indexOf(">");
    }
    const className = element.outerHTML.substring(1,element.outerHTML.indexOf(">"));
    element.innerHTML=element.outerHTML.substring(0,)+str;
}
function addInHtmlName(name,str){
    const element = document.getElementsByClassName(name);
    element.innerHTML=element.innerHTML+str;
}

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
    updateScore();
}