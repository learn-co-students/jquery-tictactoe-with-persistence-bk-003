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
var clearBoard = function() {
  $("td").text("")
}
var resetGame = function() {
  clearBoard();
  var turn = 0;
}
var doTurn = function(event){
  updateState(event);
  if(checkWinner()) {
    saveGameState();
    resetGame();
    message("Player " + player() + " Won!");
  }
  turn += 1;
}
var saveGameState = function() {
  $("#lastGameBox").empty();
  $("td").each(function(element) {
    $('#lastGameBox').append($('<div>', {class: 'lastGame', "data-x": $(this).data("x"), "data-y": $(this).data("y"), style: "display: none;", text:getValue($(this)) }));
  })
}
var getValue = function(element) {
  return element.text() ? element.text() : "-"
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
    showLastGame();
  })
}

var showLastGame = function() {
  alert(firstRow() + secondRow() + thirdRow())
}
var firstRow = function() {
  return getValues().slice(0,3).join("") + "\n";
}
var secondRow = function() {
  return getValues().slice(3,6).join("") + "\n";
}
var thirdRow = function() {
  return getValues().slice(6,9).join("") + "\n";
}
var getValues = function() {
  var values = [];
  $(".lastGame").each(function() {
    values.push($(this).text())
  })
  return values;
};