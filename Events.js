const Events = (player, gcon) => {
    /* New Game Click */
    $("#NewGameBtn").on("click", function (event) {
        gcon.update("mode", "startNewGame");
    });

    /* New Game Name Enter Click*/
    $("#nameEnter").on("click", function (event) {
        if ($('#nameterm').val() != '') {
            enterName();
        }
    });

    $('#nameterm').keypress(function (e) {
        let keyPress = e.which;
        if (keyPress == 13) { //Enter is pressed
            enterName();
        }
    });


    const enterName = () => {
        if ($('#nameterm').val() != '') {
            let name = $("#nameterm").val();
            startGameInit(name);
        } else {
            $("#nameterm").attr("placeholder", "Please enter a name");
        }
    }


    $('body').hover(function (event) {
        //find the element that dispatched the event
        let target = $(event.target);
        if (!target.hasClass('pop')) {
            $('.pop').popover('hide');
        }
    });

    /* Shop exit button click */
    $("#buy_exit").on("click", function (event) {
        $("#buyTable").empty();
        loadRoom(player.getRoom());
        //$(".ingBackground").toggle();
    });

    /* Take.Item Click */
    $(".action").on("click", "li.takeable", function (event) {
        takeTurn();
        let items = player.getRoom().getTakeableItems();
        for (let i in items) {
            if (items[i].getId() === parseInt($(this).attr('id'))) {
                player.take(items[i]);
            }
        }
        if (player.getRoom().getTakeableItems().length === 0) {
            menuBack();
        }
    });
    /* Take.Back Click */
    $(".action").on("click", "#back", function (event) {
        menuBack();
    });

    /* Back Action */
    const menuBack = () => {
        refreshActions(player.getRoom());
    };

    /* Next Click */
    $(".action").on("click", "#next", function (event) {
        gcon.update("talking", "next"); //Turns page forward
    });

    /* Previous Click */
    $(".action").on("click", "#prev", function (event) {
        gcon.update("talking", "prev"); //Turns page back
    });

    /* EndConvo Click */
    $(".action").on("click", "#endConvo", function (event) {
        toggleTalk();
    });

    /* Resize Click */
    $("#resizeBtn").on("click", function (event) {
        gcon.update("toggle_textArea");
    });

    /* Exit Click */
    $(".exit").on("click", "li", function (event) {
        if (!player.isTalking()) {
            for (let e of player.getRoom().getExits()) {
                if (e.getDir() === this.id) {
                    if (e.getNextRoom() == null) {
                        warning("Warning: cannot go direction: " + e.getDir() + ". The next room is null");
                    } else {
                        player.setRoom(e.getNextRoom());
                        if (e.getExitMsg() != null)
                            changeRoom(e.getNextRoom(), e.getExitMsg());
                        else
                            changeRoom(e.getNextRoom());
                    }
                }
            }
        }
    });

    /*action click */
    $(".action").on("click", function (event) {
        scrollText();
    });

    /* Look Click */
    $(".action").on("click", "#look", function (event) {
        gcon.update("refresh_textArea");
        //TODO
    });

    /* Take Click */
    $(".action").on("click", "#take", function (event) {
        $(".action ul").empty();
        for (let i of player.getRoom().getTakeableItems()) {
            $(".action ul").append('<li class = "takeable" id="' + i.getId() + '"><a href="#">' + i.getName() + '</a></li>');
        }
        $(".action ul").append('<li id="back"><button type="image" src="img/parch.png" class = "btn-custom" class="btn ">Back</button></li>');
    });


    /* Shop Click */
    $(".action").on("click", "#shop", function (event) {
        ingShopInit();
        $("ingShopBackgound")
        $("#ingShop").toggle();
        $("#roam").toggle();
    });

}