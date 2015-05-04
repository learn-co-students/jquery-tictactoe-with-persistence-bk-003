you must have a function called attachlisteners which I call in the tests to attach the click handlers to the page after I've mocked up the DOM

for reasons katie and i couldn't figure out you must wrap your handler in an anonymous function and manually call the function that handles the event
var attachListeners = function() {
  $("tbody").click(function(event) {
    doTurn(event)
  })
}

In the last version of this you had to only keep track of the state of the most current game.  This time you'll have to keep track of the game that was most recently played.  When someone wins, or ties, you should save the state of the game.  We're not going to tell you how to do this.  This SHOULD be hard and you might have to do some "hacky" stuff to get it to work.  The new tests this time only test that there's a button I can click that will pop up a view of the state of the board at the end of last game.  We're intentionally not going to guide or test HOW you implement that functionality.