const furryGame = require('./game').game;

document.addEventListener("DOMContentLoaded", function() {
  var g=null;
  const startBtn = document.getElementById("startButton");
  document.addEventListener("keydown", function(event) {
    if(!g){
      return;
    }
    g.turnFurry(event.keyCode);
  });
  startBtn.addEventListener('click', function(){
    if(g){
      g.dispose();
      g=null;
    }

    g = new furryGame(document.querySelectorAll("#board div"));
    g.startGame();
  });
});
