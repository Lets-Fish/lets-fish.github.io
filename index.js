const scoreboard = document.getElementById("score");
var gamedata={
    score:0,
}
loadGame();
setInterval(loadGame(),5000);
//{}[]
//Debug
function addAfterHtmlID(id,str){
    const element = document.getElementById(id);
    element.outerHTML=element.outerHTML+str;
}
function addAfterHtmlName(name,str){
    const element = document.getElementsByTagName(name)[0];
    element.outerHTML=element.outerHTML+str;
}
function addInHtmlID(id,str){
    const element = document.getElementById(id);
    var end = element.outerHTML.indexOf(" ");
    if(element.outerHTML.indexOf(">")<end){
        end = element.outerHTML.indexOf(">");
    }
    const className = element.outerHTML.substring(1,end);
    element.outerHTML=element.outerHTML.substring(0,element.outerHTML.indexOf("</"+className+">"))+str+"</"+className+">";
}
function addInHtmlName(name,str){
    const element = document.getElementsByTagName(name)[0];
    var end = element.outerHTML.indexOf(" ");
    if(element.outerHTML.indexOf(">")<end){
        end = element.outerHTML.indexOf(">");
    }
    const className = element.outerHTML.substring(1,end);
    element.outerHTML=element.outerHTML.substring(0,element.outerHTML.indexOf("</"+className+">"))+str+"</"+className+">";
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