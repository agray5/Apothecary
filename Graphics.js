const screen = (player_) => {
    let mode; //Mode determines what div to effect
    const divs = ["roam", "shop"]; //Divs to toggle betwwen visbility
    const player = player_;

    //Will load a rooms actions based on context of room
    const loadActionsBasedOnRoom = (room) => {
        if (mode = "roam") {
            if (room.getNpcs() !== null && room.getNpcs().length > 0) { //Only get talk option if npcs are in room
                $(".action ul").append('<li id="talk"><a href="#">Talk To</li>');
            }
            if (room.getTakeableItems() !== null && room.getTakeableItems().length > 0) { //Only get take option if takable items are in room
                $(".action ul").append('<li id="take"><a href="#">Take</li>');
            }
            if (room.getExamineableItems() !== null && room.getExamineableItems().length > 0) { //Only get examine option if examinable objects are in room
                $(".action ul").append('<li id="examine"><a href="#">Examine</li>');
            }
            if (room.isShop()) //Only get shop option if the room connects to a shop
                $(".action ul").append('<li id="shop"><a href="#">Shop</li>');

            $(".action ul").append('<li id="look"><a href="#">Look Around</li>'); //The player should always have the option to look around if in a room
        }
    }
    //Allows us to switch on only the appropriate div
    const changeMode = (mode_) => {
        let str = "#" + mode;

        mode = mode_;
        $(str).removeClass("dontDisplay");

        for (let d of divs) {
            if (mode !== d) {
                str = "#" + d;
                if (!$(str).hasClass('dontDisplay'))
                    $(str).addClass('dontDisplay');
            }
        }
    }

    //Loads background based on mode
    const updateBkg = (bkg) => {
        let element;
        if (mode === "roam")
            element = ".main";
        else if (mode === "shop")
            element = "#shop"

        $(element).css("background", "url(" + bkg + ") center center/ cover no-repeat ");
    }

    const flushMainScreen = () => {
        $("ul.exit").empty();
        $(".textBox").empty();
        $(".action ul").empty();
    }

    const addText = (text) => {
        $(".textBox").append("<p>" + text + "</p>");
    }

    return {
        loadActionsBasedOnRoom,
        ginit: () => {
            changeMode("roam");
        },
        loadRoom: (room = null, exitMsg = null) => { //Handles loading a rooms graphics
            if (room === null) {
                throw new Error("Error: could not load room. Room cannot be null");
                return false;
            }
            changeMode("roam");
            //Set background
            updateBkg(room.getBkg());
            //Set Room Name
            $("#roomName").text(room.getName());
            //Flush Main Screen
            flushMainScreen();
            //Add exit msg if there is one
            if (exitMsg !== null) {
                addText(exitMsg);
            }
            //Add Room Desc
            if (!room.getHasSeen() && room.getInitDesc() !== null) {
                addText(room.getInitDesc());
            } else {
                addText(room.getDesc());
            }
            //Add Takeable items to description
            if (room.getTakeableItems() != null && room.getTakeableItems().length > 0) {
                for (let i of room.getTakeableItems()) {
                    addText('\n <span class="inTextBox" id="' + i.getId() + 'inRoom">' + i.getInRoomDesc() + "</span>");
                }
            }

            //Set Exits
            for (let e of room.getExits()) {
                $("ul.exit").append("<li id='" + e.getDir() + "'><a href='#'>" + e.getDir() + "</li>");
            }

            //Load the action bar
            loadActionsBasedOnRoom(room);
        },
        addAction: (id, name) => {
            if (mode = "roam") {
                $(".action ul").append('<li id="' + id + '"><a href="#">' + name + '</li>');
            }
        },
        removeAction: (id) => {
            if (mode = "roam") {
                $(".action #" + id).remove();
            }
        },
        refreshActions: (room) => { //used if we only want to refersh actions
            $(".action ul").empty();
            loadActionsBasedOnRoom(room);
        },
        removeFromInvCol: (item) => {
            $('.pop').popover('hide');
            itemText = "#" + item.getId();
            $(itemText).remove(); //Remove item from displayed inventory
        },
        updateInvColItem: (item, amount = 1, isNew = false) => {
            let actionLinks = "";
            let element = "";
            let itemText = "";

            element = "#" + item.getId() + " .itemText";
            //Check if item is singular
            if (amount > 1) {
                itemText += item.getName() + " x " + amount //Display item amount if greater than 1
            } else {
                itemText += item.getName();
            }
            //Create new listing if it is not inventory
            if (!isNew) {
                $(element).text(itemText);
            } else {
                //Fill in action links
                if (item.isEdible()) {
                    actionLinks += '<a id=&quot;eat&quot; href=&quot;#&quot;>Eat</a><br>';
                }
                actionLinks += '<a id=&quot;examine&quot; href=&quot;javascript:examine(' + item.getId() + ')&quot;>Examine</a><br>';
                actionLinks += '<a d=&quot;drop&quot; href=&quot;javascript:dropItem(' + item.getId() + ')&quot;>Drop</a>';
                //Create popover for new listing
                $(".inv ul").append("<li id=\"" + item.getId() + "\"><a class='pop' data-content='" + actionLinks + "'  data-toggle='popover' href='#' title='' data-original-title     rel='popover'><span class='itemText'>" + itemText + '</span></a></li>');
                //Set up popover for inventory item
                $(".pop").popover({
                        trigger: "manual",
                        html: true,
                        animation: false,
                        placement: 'right',
                        container: 'body',
                    })
                    .on("mouseenter", function() {
                        if (!talking) {
                            let _this = this;
                            $(this).popover("show");
                            $(".popover").on("mouseleave", function() {
                                $(_this).popover('hide');
                            });
                        }
                    }).on("mouseleave", function() {
                        let _this = this;
                        setTimeout(function() {
                            if (!$(".popover:hover").length) {
                                $(_this).popover("hide");
                            }
                        }, 30);
                    });
            }
        },
        loadShop: (room) => { //Handles loading a shops graphics
            if (!room.isShop()) {
                console.warn("Warning: Cannot load room as a shop. It is not a shop");
                return false;
            }
            changeMode("shop");
            for (let i of room.getShopInv()) {
                $("#buyTable").append('<tr id=' + i.getId() + 'BM><td>' + selectIcon(i.getType()) + "  " + i.getName() + '</td><td>' + i.getValue() + '</td><td>X</td><td><span class="buyAmount"><button class="up" onclick="javascript:setQuantity(\'up\',' + i.getId() + ',' + i.getValue() + ')">+</button>' +
                    '<input type="text" value="0" style="width: 20px"><button class="down" onclick="javascript:setQuantity(\'down\',' + i.getId() + ',' + i.getValue() + ')">-</button></span></td><td><span class="buyItemTotal">0</td></tr>');
            }
            //TODO
        },
        setQuantity: (upordown, id, cost) => {
            let str = '#' + id + 'BM input';
            let str2 = '#' + id + 'BM .buyItemTotal';
            let value = parseInt($(str).val());
            let total = parseInt($('#buyTotalAmount').text());
            let itemTotal;
            if (upordown == 'up' && !((total + cost) > player.getMunny())) {
                value++;
                total += cost;
            } else if (upordown == 'down') {
                if (value <= 0)
                    value = 0;
                else {
                    value--;
                    total -= cost;
                }
            }
            itemTotal = value * cost;
            $(str).val(value);
            $(str2).text(itemTotal);
            $('#buyTotalAmount').text(total);
        },
        selectIcon: (type) => { //icons from http://game-icons.net
            switch (type) {
                case "ing":
                    return "<img src='img/tree-branch.png'>";
                default:
                    return "<img src='img/locked-chest.png'>";
            }
        }

    }
}