const scoreboard = document.getElementById("score");
var gamedata={
    score:0,
}
loadGame();
setInterval(saveGame(),5000);
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
    console.log(className);
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
async function evalGrid(gridIndex){
    const canvas = document.getElementById("grid_"+gridIndex);
    for (let i = 0; i < 10; i++) {
        drawPoly(canvas,[0,0],[1,0],[1,1],[0,1],[0,0],[0.5*(i/10),0.5*(i/10)],[1-0.5*(i/10),0.5*(i/10)],[1-0.5*(i/10),1-0.5*(i/10)],[0.5*(i/10),1-0.5*(i/10)]);
    }
}
function drawPoly(canvas,...points){
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#999';
    
    ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
        const x = points[i][0]*canvas.clientWidth;
        const y = points[i][0]*canvas.clientHeight;
        if(i==0){
            ctx.moveTo(x,y);
        }else{
            ctx.lineTo(x,y);
        }
    }
    ctx.closePath();
    ctx.fill();
}