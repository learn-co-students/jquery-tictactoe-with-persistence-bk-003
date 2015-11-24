var turn = 0;
var winningCombos = [[[0,0],[1,0],[2,0]], [[0,1],[1,1],[2,1]], [[0,2],[1,2],[2,2]], [[0,0],[1,1],[2,2]], [[0,0],[0,1],[0,2]], [[2,0],[2,1],[2,2]], [[1,0],[1,1],[1,2]], [[2,0],[1,1],[0,2]]];

var checkWinner = function() {
  var players = ["X", "O"];
  var p1 = false;
  var p2 = false;
  players.forEach(function(pVal) {
    var won = false;
    winningCombos.forEach(function(ele) {
      var ax = ele[0][0];
      var ay = ele[0][1];
      var bx = ele[1][0];
      var by = ele[1][1];
      var cx = ele[2][0];
      var cy = ele[2][1];
      var e1 = $('td[data-x="' + ax + '"][data-y="' + ay + '"]');
      var e2 = $('td[data-x="' + bx + '"][data-y="' + by + '"]');
      var e3 = $('td[data-x="' + cx + '"][data-y="' + cy + '"]');
      won = won || [e1.text(), e2.text(), e3.text()].every(function(n) {
        return n == pVal
      });
    });
    if (won) {
      if (pVal == "X") p1 = true;
      if (pVal == "O") p2 = true;
    }
  });
  if (p1 || p2) {
    turn = 1;
    var val;
    if (p1) val = "X";
    if (p2) val = "O";
    message("Player " + val + " Won!");
    clearBoard();
  } else {

    if ($('td').filter(function(){return $(this).text()==""}).length<1) {
      clearBoard();
      turn = 1;
      message("Tie game");
       $('td').text("");
    }

    return false;
  }
}

var tie = function() {
  message('Tie game')
  return true
}

var player = function() {
  return (turn%2)?"O":"X";
}

var clearBoard = function() {
  var s = ''
  $("td").each(function(index, elem) {
    var html = $(this).html();
    (html)? s += html : s += '-';
    index!=8 && (!((index+1)%3)) && (s += '<br>');
    $(this).html("");
  });
  $("#lastGameBox").html(s);
}

var doTurn = function(event){
  updateState(event);
  checkWinner();
  ++turn;
}

var message = function(message) {
  $('#message').text(message);
}

var updateState = function(event) {
  event.target.innerText = player();
}

var attachListeners = function() {
  $("tbody").click(function(event) {
    doTurn(event);
  });

  $("#lastGame").click(function() {
    // your code here
  });
}
