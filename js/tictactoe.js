var turn = 0;
var winningCombos = [[[0,0],[1,0],[2,0]], [[0,1],[1,1],[2,1]], [[0,2],[1,2],[2,2]], [[0,0],[1,1],[2,2]], [[0,0],[0,1],[0,2]], [[2,0],[2,1],[2,2]], [[1,0],[1,1],[1,2]], [[2,0],[1,1],[0,2]]];
var lastGame = ''

var checkWinner = function() {
    var endgame = false
  winningCombos.forEach(function(elem){
    var count = 0
    elem.forEach(function(m){
      $('td[data-x="'+m[0]+'"][data-y="'+m[1]+'"]').html() == player() ? count++ : '';
    })
    if (count == 3) {
      message('Player '+ player()+' Won!')
      endgame = true
    }
  })
  return (turn==8) ? tie() : endgame
}

var tie = function() {
  message('Tie game')
  return true
}

var player = function() {
  return turn % 2 == 0 ? 'X' : 'O';
}

var clearBoard = function() {
  var string = ''
  $("td").each(function(index, elem) {
        var content = $(this).html()
        if (content != '') {
          string = string + content;
        } else {
          string = string + '-'
        }
        (index == 2 || index == 5) ? string = string + '<br>' : '';
        $(this).html("")
    });
  lastGame = string;
}

var doTurn = function(event){
  // your code here
  updateState(event);
  if (checkWinner()){
    turn = 0;
    clearBoard() 
  } else {
    turn++
  }
}

var message = function(message) {
   $('#message').html(message)
}

var updateState = function(event) {
  $(event).html(player())
}

var attachListeners = function() {
  $("td").click(function(event) {
    doTurn(this);
  });

  $("#lastGame").click(function() {
    // your code here
    $('#lastGameBox').html(lastGame)
  });
}
