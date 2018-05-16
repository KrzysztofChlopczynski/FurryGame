const coin = require("./coin").coin;
const furry = require("./furry").furry;

module.exports = {
  game: function(board) {
    var self = this;
    self.furry;
    self.coin;
    self.score = 0;
    self.intervalTime = 700;

    function index(x, y) {
      return x + y * 10;
    }
    function showFurry() {
      hideVisibleFurry();
      board[index(self.furry.x, self.furry.y)].classList.add("furry");
    }
    function hideVisibleFurry() {
      var visibleFurry = document.querySelector(".furry");
      if (!visibleFurry) return;
      visibleFurry.classList.remove("furry");
    }

    function showCoin(coin) {
      board[index(coin.x, coin.y)].classList.add("coin");
    }
    function hideVisibleCoin() {
      var visibleCoin = document.querySelector(".coin");
      if (!visibleCoin) return;
      visibleCoin.classList.remove("coin");
    }

    function isCollision(furry, coin) {
      return furry.x === coin.x && furry.y === coin.y;
    }

    function createNewCoin(furry) {
      let _coin;
      do {
        _coin = new coin();
      } while (isCollision(furry, _coin));
      showCoin(_coin);
      return _coin;
    }

    function init() {
      self.furry = new furry();
      showFurry();
      self.coin = createNewCoin(self.furry);
    }

    function increaseScore() {
      self.score += 1;
      document.getElementById("scorevalue").innerText = self.score;

      if (self.intervalTime === 100) return;

      self.intervalTime = Math.max(self.intervalTime - self.score * 10, 100);
      refreshInterval();
    }

    function move() {
      if (self.furry.direction === "right") {
        self.furry.x = self.furry.x + 1;
      } else if (self.furry.direction === "left") {
        self.furry.x = self.furry.x - 1;
      } else if (self.furry.direction === "up") {
        self.furry.y = self.furry.y - 1;
      } else if (self.furry.direction === "down") {
        self.furry.y = self.furry.y + 1;
      }
      if (gameOver()) {
        return;
      }

      showFurry();

      if (isCollision(self.furry, self.coin)) {
        hideVisibleCoin();
        self.coin = createNewCoin(self.furry);
        increaseScore();
      }
    }

    self.turnFurry = function(keyCode) {
      switch (keyCode) {
        case 37:
          self.furry.direction = "left";
          break;
        case 38:
          self.furry.direction = "up";
          break;
        case 39:
          self.furry.direction = "right";
          break;
        case 40:
          self.furry.direction = "down";
          break;
      }
    };

    self.startGame = function() {
      init();
      refreshInterval();
    };

    function refreshInterval() {
      if (self.interval) {
        clearInterval(self.interval);
      }
      self.interval = setInterval(move, self.intervalTime);
    }

    function gameOver() {
      if (
        self.furry.x < 0 ||
        self.furry.x > 9 ||
        self.furry.y < 0 ||
        self.furry.y > 9
      ) {
        clearInterval(self.interval);
        self.interval = null;
        hideVisibleFurry();
        return true;
      }
      return false;
    }

    self.dispose=function(){
        clearInterval(self.interval);
        self.interval = null;
        hideVisibleFurry();
        hideVisibleCoin();
    }
  }
};
