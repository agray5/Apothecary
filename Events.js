/* New Game Click */
$("#NewGameBtn").on("click", function(event) {
    $("#mainMenu").toggle();
    $("#startNewGame").toggle();
});
        
$('body').hover(function(event) {
    //find the element that dispatched the event
    let target = $(event.target);
    if (!target.hasClass('pop')) {
        $('.pop').popover('hide');
    }
});
        