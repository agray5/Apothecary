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

/* Shop exit button click */
$("#buy_exit").on("click", function(event) {
    $("#buyTable").empty();
    loadRoom(player.getCurrentRoom());
    //$(".ingBackground").toggle();
});

/* Take.Item Click */
$(".action").on("click", "li.takeable", function(event) {
    takeTurn();
    for (let i of player.getCurrentRoom().getTakeableItems()) {
        if (player.findInvItem(i).getId(i) === this.getId()) {
            takeItem(i);
        }
    }
    if (player.getCurrentRoom().getTakeableItems().length === 0) {
        menuBack();
    }
});
/* Take.Back Click */
$(".action").on("click", "#back", function(event) {
    menuBack();
});

/* Back Action */
const menuBack = () => {
    refreshActions(player.getCurrentRoom());
};