var turn = 0;
var winningCombos = [[[0,0],[1,0],[2,0]], [[0,1],[1,1],[2,1]], [[0,2],[1,2],[2,2]], [[0,0],[1,1],[2,2]], [[0,0],[0,1],[0,2]], [[2,0],[2,1],[2,2]], [[1,0],[1,1],[1,2]], [[2,0],[1,1],[0,2]]]
var checkCells = function(ary) {
  for(var i = 0; i < ary.length; i++) {
  	var winningCombo = ary[i];
  	var x = winningCombo[0];
  	var y = winningCombo[1];
    var selector = $('[data-x="' + x + '"][data-y="' + y + '"]')
    if( noCellMatch(selector)) {
      return false;
    }
  }
  return true;
}
var checkWinner = function() {
  for(var i = 0; i < winningCombos.length; i++) {
    if(checkCells(winningCombos[i]) == true) {
      return true;
    }
  }
  return false;
}

var player = function() {
	if(turn % 2 == 0) {
		return "X";
	}
	else {
		return "O";
	}
};
var noCellMatch = function(element) {
	return (element.html() != player())
}
var doTurn = function(event){
  updateState(event);
  if(checkWinner()) {
    message("Player " + player() + " Won!")
  }
  turn += 1;
}
var message = function(message) {
  alert(message);
}
var updateState = function(event) {
  $(event.target).html(player());
}
var attachListeners = function() {
  $("tbody").click(function(event) {
    doTurn(event)
  })
  $("#lastGame").click(function() {
    alert("X|X|X\n" + "O|O|O\n" + "X|O|O")
  })
}
var getValues = function() {
  var values = $(".lastGame").each
};

