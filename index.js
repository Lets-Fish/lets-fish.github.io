const scoreboard = document.getElementById("score");
var score = 0;
function updateScore(){
    scoreboard.innerText = "Score: "+score;
}
function increaseScore(){
    score++;
    updateScore();
}