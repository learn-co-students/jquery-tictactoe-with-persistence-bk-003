'use strict';

describe('javascript', function() {
  beforeEach(function(){
    turn = 0;
  });

  describe( "#attachListeners", function() {
    it("should attach event listeners which call your turn function when someone clicks on a square", function() {
      setFixtures('<body><table border="1" cellpadding="40"><tr><td data-x="0", data-y="0"></td><td data-x="1", data-y="0"></td><td data-x="2", data-y="0"></td></tr><tr><td data-x="0", data-y="1"></td><td data-x="1", data-y="1"></td><td data-x="2", data-y="1"></td></tr><tr><td data-x="0", data-y="2"></td><td data-x="1", data-y="2"></td><td data-x="2", data-y="2"></td></tr></table></body>');
      attachListeners();
      var selector = '[data-x="0"][data-y="0"]';
      spyOn(window, "doTurn");
      $(selector).click();
      expect(window.doTurn).toHaveBeenCalled();
    });     
  });

  describe( "#doTurn", function() {
    var myEvent;
    beforeEach(function(){
      setFixtures('<body><table border="1" cellpadding="40"><tr><td data-x="0", data-y="0"></td><td data-x="1", data-y="0"></td><td data-x="2", data-y="0"></td></tr><tr><td data-x="0", data-y="1"></td><td data-x="1", data-y="1"></td><td data-x="2", data-y="1"></td></tr><tr><td data-x="0", data-y="2"></td><td data-x="1", data-y="2"></td><td data-x="2", data-y="2"></td></tr></table><div id="message"></div><button id="lastGame">Show Me Last Games Results!</button><div id="lastGameBox"></div></body>');
      attachListeners();
      myEvent = $('[data-x="0"][data-y="0"]').click();
    });

    it("should increment turn and call on `checkWinner()`, `updateState()`", function() {
      var turnCount = turn;
      spyOn(window, "checkWinner");
      spyOn(window, "updateState");
      doTurn(myEvent);
      expect(turn).toEqual(turnCount + 1);
      expect(window.updateState).toHaveBeenCalled;
      expect(window.checkWinner).toHaveBeenCalled;
    });     
  });

  describe( "#player", function() {
    it("should return the mark of the current player", function() {
      expect(player()).toEqual("X");
    });     
    it("should return the mark of the current player", function() {
      turn = 1;
      expect(player()).toEqual("O");
    });
  });

  describe( "#updateState", function() {
    it("adds the return value of `player()` to the clicked `td` on the board", function() {
      setFixtures('<body><table border="1" cellpadding="40"><tr><td data-x="0", data-y="0"></td><td data-x="1", data-y="0"></td><td data-x="2", data-y="0"></td></tr><tr><td data-x="0", data-y="1"></td><td data-x="1", data-y="1"></td><td data-x="2", data-y="1"></td></tr><tr><td data-x="0", data-y="2"></td><td data-x="1", data-y="2"></td><td data-x="2", data-y="2"></td></tr></table></body>');
      attachListeners();
      var selector = '[data-x="0"][data-y="0"]';
      $(selector).click();
      expect($(selector).html()).toEqual("X");
    }); 

    it("calls on `player()`", function() {
      setFixtures('<body><table border="1" cellpadding="40"><tr><td data-x="0", data-y="0"></td><td data-x="1", data-y="0"></td><td data-x="2", data-y="0"></td></tr><tr><td data-x="0", data-y="1"></td><td data-x="1", data-y="1"></td><td data-x="2", data-y="1"></td></tr><tr><td data-x="0", data-y="2"></td><td data-x="1", data-y="2"></td><td data-x="2", data-y="2"></td></tr></table></body>');
      attachListeners();
      spyOn(window, "player");
      var selector = '[data-x="1"][data-y="0"]';
      $(selector).click();
      expect(window.player).toHaveBeenCalled;
    });     
  });

  describe( "#message", function() {
    it("adds the string it's passed to the div with an id of message", function() {
      setFixtures('<body><table border="1" cellpadding="40"><tr><td data-x="0", data-y="0"></td><td data-x="1", data-y="0"></td><td data-x="2", data-y="0"></td></tr><tr><td data-x="0", data-y="1"></td><td data-x="1", data-y="1"></td><td data-x="2", data-y="1"></td></tr><tr><td data-x="0", data-y="2"></td><td data-x="1", data-y="2"></td><td data-x="2", data-y="2"></td></tr></table><div id="message"></div></body>');
      attachListeners();
      var string = "Player X Won!";
      message(string);
      expect($("#message").html()).toEqual(string);
    });     
  });

  describe( "#checkWinner", function() {
    it("should tell me if there is a winning combo on the board for the current player", function() {
      setFixtures('<body><table border="1" cellpadding="40"><tr><td data-x="0", data-y="0"></td><td data-x="1", data-y="0"></td><td data-x="2", data-y="0"></td></tr><tr><td data-x="0", data-y="1"></td><td data-x="1", data-y="1"></td><td data-x="2", data-y="1"></td></tr><tr><td data-x="0", data-y="2"></td><td data-x="1", data-y="2"></td><td data-x="2", data-y="2"></td></tr></table><div id="message"></div></body>');
      attachListeners()
      spyOn(window, "updateState");
      var selector = '[data-x="0"][data-y="0"]'
      $(selector).click()
      var selector = '[data-x="0"][data-y="1"]'
      $(selector).click()
      expect(checkWinner()).toEqual(false)   
    });     

    it("should tell me if there is a winning combo on the board for the current player (vertical)", function() {
      setFixtures('<body><table border="1" cellpadding="40"><tr><td data-x="0", data-y="0"></td><td data-x="1", data-y="0"></td><td data-x="2", data-y="0"></td></tr><tr><td data-x="0", data-y="1"></td><td data-x="1", data-y="1"></td><td data-x="2", data-y="1"></td></tr><tr><td data-x="0", data-y="2"></td><td data-x="1", data-y="2"></td><td data-x="2", data-y="2"></td></tr></table><div id="message"></div></body>');
      attachListeners();
      spyOn(window, "message");
      // x goes
      var selector = '[data-x="0"][data-y="0"]';
      $(selector).click();
      // y goes
      var selector = '[data-x="1"][data-y="0"]';
      $(selector).click();
      // x goes
      var selector = '[data-x="0"][data-y="1"]';
      $(selector).click();
      // y goes
      var selector = '[data-x="2"][data-y="0"]';
      $(selector).click();
      // x goes
      var selector = '[data-x="0"][data-y="2"]';
      $(selector).click();
      expect(window.message).toHaveBeenCalledWith("Player X Won!");
    });     

    it("should tell me if there is a winning combo on the board for the current player (diagonal)", function() {
      setFixtures('<body><table border="1" cellpadding="40"><tr><td data-x="0", data-y="0"></td><td data-x="1", data-y="0"></td><td data-x="2", data-y="0"></td></tr><tr><td data-x="0", data-y="1"></td><td data-x="1", data-y="1"></td><td data-x="2", data-y="1"></td></tr><tr><td data-x="0", data-y="2"></td><td data-x="1", data-y="2"></td><td data-x="2", data-y="2"></td></tr></table><div id="message"></div></body>');
      attachListeners()
      spyOn(window, "message");
      // x goes
      var selector = '[data-x="0"][data-y="0"]';
      $(selector).click();
      // y goes
      var selector = '[data-x="1"][data-y="0"]';
      $(selector).click();
      // x goes
      var selector = '[data-x="1"][data-y="1"]';
      $(selector).click();
      // y goes
      var selector = '[data-x="2"][data-y="0"]';
      $(selector).click();
      // x goes
      var selector = '[data-x="2"][data-y="2"]';
      $(selector).click();
      expect(window.message).toHaveBeenCalledWith("Player X Won!");
    });     
  });

  describe( "display the last game", function() {
    it("should print out the results of the last game in an alert", function() {
      setFixtures('<body><table border="1" cellpadding="40"><tr><td data-x="0", data-y="0"></td><td data-x="1", data-y="0"></td><td data-x="2", data-y="0"></td></tr><tr><td data-x="0", data-y="1"></td><td data-x="1", data-y="1"></td><td data-x="2", data-y="1"></td></tr><tr><td data-x="0", data-y="2"></td><td data-x="1", data-y="2"></td><td data-x="2", data-y="2"></td></tr></table><div id="message"></div><button id="lastGame">Show Me Last Games Results!</button><div id="lastGameBox"></div></body>');
      attachListeners();
      var selector = '[data-x="0"][data-y="0"]';
      $(selector).click();
      var selector = '[data-x="1"][data-y="0"]';
      $(selector).click();
      var selector = '[data-x="1"][data-y="1"]';
      $(selector).click();
      var selector = '[data-x="2"][data-y="0"]';
      $(selector).click();
      var selector = '[data-x="2"][data-y="2"]';
      $(selector).click();
      // _X_|_O_|_O_
      // ___|_X_|___
      //    |   | X
      expect($("#message").html()).toEqual("Player X Won!");
      // __|__|__
      // __|__|__
      //   |  | 
      $("td").each(function() {
        expect($(this).html()).toEqual("");
      });
      // ___|___|___
      // ___|___|___
      //    | X | O
      var selector = '[data-x="1"][data-y="2"]';
      $(selector).click();
      expect($(selector).html()).toEqual("X");
      var selector = '[data-x="2"][data-y="2"]';
      $(selector).click();
      expect($(selector).html()).toEqual("O");

      // Show Me Last Games Results! (gets clicked)
      $("#lastGame").click();

      // X O O
      // - X -
      // - - X
      expect($("#lastGameBox").html()).toEqual("XOO<br>-X-<br>--X");
    });

    it("should print out the results of the last game if last game was a tie", function() {
      setFixtures('<body><table border="1" cellpadding="40"><tr><td data-x="0", data-y="0"></td><td data-x="1", data-y="0"></td><td data-x="2", data-y="0"></td></tr><tr><td data-x="0", data-y="1"></td><td data-x="1", data-y="1"></td><td data-x="2", data-y="1"></td></tr><tr><td data-x="0", data-y="2"></td><td data-x="1", data-y="2"></td><td data-x="2", data-y="2"></td></tr></table><div id="message"></div><button id="lastGame">Show Me Last Games Results!</button><div id="lastGameBox"></div></body>');
      attachListeners();
      
      $('[data-x="0"][data-y="0"]').click();
      $('[data-x="1"][data-y="1"]').click();
      $('[data-x="1"][data-y="2"]').click();
      $('[data-x="0"][data-y="1"]').click();
      $('[data-x="2"][data-y="1"]').click();
      $('[data-x="2"][data-y="2"]').click();
      $('[data-x="0"][data-y="2"]').click();
      $('[data-x="1"][data-y="0"]').click();
      $('[data-x="2"][data-y="0"]').click();
      // _X_|_O_|_X_
      // _O_|_O_|_X_
      //  X | X | O
      expect($("#message").html()).toEqual("Tie game");
      // __|__|__
      // __|__|__
      //   |  | 
      $("td").each(function() {
        expect($(this).html()).toEqual("");
      });
      // ___|___|___
      // ___|___|___
      //    | X | O
      var selector = '[data-x="1"][data-y="2"]';
      $(selector).click();
      expect($(selector).html()).toEqual("X");
      var selector = '[data-x="2"][data-y="2"]';
      $(selector).click();
      expect($(selector).html()).toEqual("O");

      // Show Me Last Games Results! (gets clicked)
      $("#lastGame").click();

      // X O X
      // O O X
      // X X O
      expect($("#lastGameBox").html()).toEqual("XOX<br>OOX<br>XXO");
    });
  });
});
