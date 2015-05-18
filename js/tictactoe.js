var turn = 0;
var winningCombos = [[[0,0],[1,0],[2,0]], [[0,1],[1,1],[2,1]], [[0,2],[1,2],[2,2]], [[0,0],[1,1],[2,2]], [[0,0],[0,1],[0,2]], [[2,0],[2,1],[2,2]], [[1,0],[1,1],[1,2]], [[2,0],[1,1],[0,2]]];

var checkWinner = function() {
  // your code here
}

var tie = function() {
  // your code here
}

var player = function() {
  // your code here
}

var clearBoard = function() {
  // your code here
}

var doTurn = function(event){
  // your code here
}

var message = function(message) {
  // your code here
}

var updateState = function(event) {
  // your code here
}

var attachListeners = function() {
  $("tbody").click(function(event) {
    doTurn(event);
  });

  $("#lastGame").click(function() {
    // your code here
  });
}
