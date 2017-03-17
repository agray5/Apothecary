        /********** Varibles ***********/      
        let clock = 600;
        let timeOfDay = "morning";
        const rate = 0.5;
        let turns = 0;
        let resizeToggle = false;
        let player;

        /********** Functions ***********/
        
        
        
        //based on current room, proper room connecter
        const changeRoom = (room, exitMsg) => {
            takeTurn();
            //Is the player outside?
            player.updateOutsideFlag();
            //blank saved text
            currentRoom.setSavedText([]);
            //Player has seen the room
            if(!currentRoom.getHasSeen())
                currentRoom.seenRoom();
            //Load the room
            loadRoom(room, exitMsg);
        };


        /* Back Action */
        const menuBack = () => {
            $(".action ul").empty();
            addActionsBasedOnCurrRoom();
        };
        /* Time */
        const turnsToTime = () => {
            let rateXturns = rate * turns;
            let hour = Math.floor(rateXturns) * 100;
            let minutes = Math.floor((rateXturns % 1) * 100);
            if (minutes < 60) {
                let extractHours = minutes / 60;
                let tmpHours = Math.floor((extractHours));
                hour += tmpHours * 100;
                minutes = Math.floor((extractHours % 1) * 100);
            }
            clock = hour + minutes;
        }
        const takeTurn = () => {
            //take a turn when soing a action or leaving a room
            let oldTime = timeOfDay;
            turns++;
            turnsToTime();
            if (clock >= 2400) {
                turns = 0;
                clock = 0;
            } else if (clock >= 2200) {
                timeOfDay = "night";
            } else if (clock >= 1800) {
                timeOfDay = "evening";
            } else if (clock >= 1200) {
                timeOfDay = "noon";
            } else if (turns >= 600) {
                timeOfDay = "morning";
            }
            if (time != oldTime) {
                $("#time").text(timeOfDay);
            }
        };
        /* Ingredient Shop */
        $("#buy_exit").on("click", function(event) {
            $("#buyTable").empty();
            $("#roam").toggle();
            $("#ingShop").toggle();
            //$(".ingBackground").toggle();
        });
        const loadShopMenu = () => {
            for (let i of ingShopCat) {
                $("#buyTable").append('<tr id=' + i.getId() + 'BM><td>' + selectIcon(i.getType()) + "  " + i.getName() + '</td><td>' + i.getValue() + '</td><td>X</td><td><span class="buyAmount"><button class="up" onclick="javascript:setQuantity(\'up\',' + i.getId() + ',' + i.getValue() + ')">+</button>' +
                    '<input type="text" value="0" style="width: 20px"><button class="down" onclick="javascript:setQuantity(\'down\',' + i.getId() + ',' + i.getValue() + ')">-</button></span></td><td><span class="buyItemTotal">0</td></tr>');
            }
        }
        const setQuantity = (upordown, id, cost) => {
            let str = '#' + id + 'BM input';
            let str2 = '#' + id + 'BM .buyItemTotal';
            let value = parseInt($(str).val());
            let total = parseInt($('#buyTotalAmount').text());
            let itemTotal;
            if (upordown == 'up' && !((total + cost) > munny)) {
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
        };
        //icons from http://game-icons.net
        const selectIcon = (type) => {
            switch (type) {
                case "ing":
                    return "<img src='img/tree-branch.png'>";
                default:
                    return "<img src='img/locked-chest.png'>";
            }
        };
        $("#IngBuyButton").click(function() {
            let total = parseInt($('#buyTotalAmount').text());
            subMunny(total);
            $('#buyTotalAmount').text(0);
            for (let i of ingShopCat) {
                let str = '#' + i.getId() + 'BM input';
                let str2 = '#' + i.getId() + 'BM .buyItemTotal';
                let itemTot = parseInt($(str).val());
                if (itemTot > 0) {
                    i.add()
                }
                $(str).val(0);
                $(str2).text(0);
            }
        });
    
    //Reset Ingredient shop varibles
        const resetIngBuyMenu = () => {
            $('#buyTotalAmount').text(0);
            for (let i of ingShopCat) {
                let str = '#' + i.getId() + 'BM input';
                let str2 = '#' + i.getId() + 'BM .buyItemTotal';
                $(str).val(0);
                $(str2).text(0);
            }
        };
        
        /* Journal */
        const openJournal = () => {
            $("#journal").css("width", "100%");
            resetInvMenu();
            loadInvMenu();
            loadEquipment();
        };
        const closeJournal = () => {
            $("#journal").css("width", "0%");
        };
        
        const openTab = (name) => {
            let i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            document.getElementById(name).style.display = "block";
            //evt.currentTarget.className += " active";
        }
        
        /* Journal Inventory */
        
        const loadInvMenu = () => {
            let inventory = player.getInv();
            $("#invTable").append("<tr><th>Name</th><th>Value</th><th>Amount</th><th>Total Value</th></tr>")
            for (let i of inventory) {    
                let total = i.getInvCount() * i.getValue();
                $("#invTable").append('<tr id=' + i.getId() + 'IM><td>' + selectIcon(i.getType()) + "  " + i.getName() + '</td><td>' + i.getValue() + '</td><td>' + i.getInvCount() + '</td><td>'+ total +'</td><td><button class="myBtn" id="jInvDrop" onclick="javascript:jInvDrop('+ i.getId() +')">Drop</button></td></tr>');
            }
        }
        const resetInvMenu = () => {
            $("#invTable").empty();
        }
        
        const jInvDrop = (item) => {
            dropItem(item);
            resetInvMenu();
            loadInvMenu();
        }
        
        /* Journal Equipment*/
        const equip = (id) => {
            console.log("equipping,,");
            let sel, sel2, style1, style2, class_;
            for(let i of equipment){
                if(i.getId() == id){
                    equipped.push(i);
                    switch(i.getSubType()){
                        case "hat": 
                            sel = "#hatE"; 
                            sel2 = "#playerHat";
                            break;
                        case "shirt": 
                            sel = "#shirtE"; 
                            sel2 = "#playerShirt";
                            style1= "width:90px; height:80px";
                            style2 = "bottom: 90px;";
                            class_ = "secondLayer";
                            break;
                        case "pants": 
                            sel = "#pantsE";
                            sel2 = "#playerPants";  
                            break;
                        case "skirt": 
                            sel = "#pantsE";
                            sel2 = "#playerPants"; 
                            style1= "width:90px; height:80px; padding-top: 30px;";
                            style2 = "bottom: 40px;";
                            class_ = "firstLayer";
                            break;
                        case "handR": 
                            sel = "#handRE"; 
                            sel2 = "#playerHandR"; 
                            break;
                        case "handL": 
                            sel = "#handLE";
                            sel2 = "#playerHandL";  
                            break;
                        case "shoes":
                            sel = "#shoesE"; 
                            sel2 = "#playerShoes";
                            break;
                        default: throw new Error("Error: No equippable subtype for item");
                    }
                    console.log("sel= "+sel);
                    $(sel).empty();
                    $(sel2).empty();
                    $(sel).append("<img src="+i.getSprite()+" style='align:center; "+style1+"'>");    
                    $(sel2).append("<img src="+i.getSprite()+" class ='"+class_+"' style='"+style2+" position: absolute;'>");    
                    loadAvatar();
                }
            }
        }
        
        const loadAvatar = () => {
            $("#playerAvatar").empty();
            let shirt = $("#playerShirt").clone();
            shirt.find('*').removeAttr('style');
            shirt.prop('id', 'avatarShirt' );
            $("#playerAvatar").append("<img src='img/playerBase.png'>");
            $("#playerAvatar").append(shirt);
        }
        
        
        const loadEquipment = () => {
            let equipment = player.getEquipment();
            let eLength = equipment.length;
            $('#equipmentChest').children().each(function(index, item) {
                if(eLength == 0)
                    return;
                console.log(this);
                $(this).empty();
                $(this).append("<img src="+equipment[eLength - 1].getSprite()+" class= '"+equipment[eLength - 1].getSubType()+"' onclick='equip("+(equipment[eLength - 1].getId())+"); equipDisplayInfo("+(equipment[eLength - 1].getId())+");' onmouseover='equipDisplayInfo("+(equipment[eLength - 1].getId())+");'>");    
                eLength--;
            });
        };
        
        const equipDisplayInfo = (id) => {
            let equipment = player.getEquipment();
            for(let i of equipment){
                if(i.getId() == id){
                    $('#equipInfo').empty();
                    $('#equipInfo').append("<span class='cap'>"+i.getName() + "<br> value: "+i.getValue() + " mun</span><br>"+ i.getDesc());
                }
            }
        };
        
        /* Talking */
        const toggleTalk = (actor) => {
            let talking = player.isTalking();
            $(".bottomOfScreen").attr('id', ($(".bottomOfScreen").attr('id') == 'bottomText' ? 'talkingText' : 'bottomText'));
            $("#playerAvatar").toggle();
            $("#resizeBtn").toggle();
            $("#nameBox").toggle();
            console.log("toggle talk");
            if(!talking){
                talking = true;
                $("#nameBoxText").text(actor.getName());
                $(".textBox").text(actor.getStartState().getPages()[0]);
                $("#npcCutOut").append("<img src='"+actor.getCutOut()+"'>");
                $(".action ul").empty();
                if(actor.getStartState().getPages().length > 1)
                    addAction("next", "Next");
                $(".textBox").css("font-size", "26px");
                $(".textBox").css("bottom", "");
                $(".textBox").css("top", "");
            }
            else{
                $("#npcCutOut").empty();
                $(".textBox").css("font-size", "18px");
                if(!resizeToggle)
                    $(".textBox").css("bottom", "10px");
                else
                    $(".textBox").css("top", "10px");
                refreshRoom(null);
                scrollTextUp();
            }
        }
        
        const turnPageFwd = () => {
            let state = player.getInteractingWith().getCurrentState();
            let currentPage = player.getInteractingWith().getCurrentState().getCurrentPage();
            if(currentPage < state.getPages().length){
                state.pageFwd();
                $(".textBox").text(state.readPage());
            }
            if(currentPage == state.getPages().length - 1){
                removeAction("next");
                addAction("endConvo", "Goodbye");
            }
            else if(currentPage == 1){
                addAction("prev", "Previous");
                removeAction("next");
                addAction("next", "Next");
            }
        }
        
        const turnPagePre = function(){
            let state = player.getInteractingWith().getCurrentState();
            let currentPage = player.getInteractingWith().getCurrentState().getCurrentPage();
            if(currentPage > 0){
                state.pagePev();
                $(".textBox").text(state.readPage());
            }
            if(currentPage == 0){
                removeAction("prev");
            }
            else if(currentPage == state.getPages().length - 2){
                addAction("next", "Next");
            }
        }
        
        /* Actions */
        const lookAround = (room) => {
            addText(room.getDesc());
            //displayItemsInRoom(room);
        };
        
        $(".inv ul").find("a").on("click", function(event){
            scrollText();
        });
        /* Next Click */
        $(".action").on("click", "#next", function(event) {
            turnPageFwd();
            console.log(currentPage);
        });
        
        /* Previous Click */
        $(".action").on("click", "#prev", function(event) {
            turnPagePre();
            console.log(currentPage);
        });
        
        /* EndConvo Click */
        $(".action").on("click", "#endConvo", function(event) {
            toggleTalk();
        });
        
        /* Resize Click */
        $("#resizeBtn").on("click", function(event) {
             $(this).toggleClass('glyphicon-resize-full').toggleClass('glyphicon-resize-small');
            if(!resizeToggle){
                $(".bottomOfScreen").css("top", "25%");
                $(".textBox").css("top", "10px");
                $(".textBox").css("bottom", "");
                resizeToggle = true;
            }
            else{
                $(".bottomOfScreen").css("top", "");
                $(".textBox").css("bottom", "10px");
                $(".textBox").css("top", "");
                resizeToggle = false;
            }
        });
        /* Exit Click */
        $(".exit").on("click", "li", function(event) {
            if(!player.isTalking()){
                for (let e of player.getCurrentRoom().getExits()) {
                    if (e.getDir() === this.getId()) {
                        if (e.getNextRoom() == null) {
                            throw new Error("Error: cannot go direction: "+e.getDir()+". The next room is null");
                        } 
                        else {
                            player.setCurrentRoom(e.getNextRoom());
                            if (e.getExitMsg() != null)
                                changeRoom(e);
                            else
                                changeRoom();
                            }
                        }
                    }
                }
        });
    
        /*action click */
        $(".action").on("click", function(event) {
            scrollText();
        });
    
        /* Look Click */
        $(".action").on("click", "#look", function(event) {
            lookAround();
        });
    
        /* Take Click */
        $(".action").on("click", "#take", function(event) {
            $(".action ul").empty();
            for (let i of currentRoom.getTakeableItems()) {
                $(".action ul").append('<li class = "takeable" id="' + i.getId() + '"><a href="#">' + i.getName() + '</a></li>');
            }
            $(".action ul").append('<li id="back"><button type="image" src="img/parch.png" class = "btn-custom" class="btn ">Back</button></li>');
        });
    
        /* Take.Item Click */
        $(".action").on("click", "li.takeable", function(event) {
            takeTurn();
            for (let i of currentRoom.getTakeableItems()) {
                if (i.getId() == this.getId()) {
                    takeItem(i);
                }
            }
            if (currentRoom.getTakeableItems().length == 0) {
                menuBack();
            }
        });
        /* Take.Back Click */
        $(".action").on("click", "#back", function(event) {
            menuBack();
        });
        
        /* Shop Click */
        $(".action").on("click", "#shop", function(event) {
            ingShopInit ();
            $("ingShopBackgound")
            $("#ingShop").toggle();
            $("#roam").toggle();
        });
        //test button
        $("button").click(function() {
            //let win = window.open();
            //win.document.write(inventory[0].name) ;
            //$( "#roam" ).toggle();
            //$( "#ingShop" ).toggle();
            //win.document.write(inventory[0].name) ;
            //win.document.close();
        });
        
        const scrollText = () => {
            let psconsole = $('.textBox');
            if(psconsole.length){
                psconsole.scrollTop(psconsole[0].scrollHeight - psconsole.height());
                console.log("Scroll Textbox down");
            }
        };
        
        const scrollTextUp = () => {
            let psconsole = $('.textBox');
            if(psconsole.length){
                psconsole.scrollTop(0);
                console.log("Scroll Text Box up");
            }
        };
        
        
        /* ToolTip Examine Click */
        const examine = (item) => {
            console.log('worked');
            for (let i of inventory) {
                if (i.getId() == item) {
                    addText("You remove the " + i.getName() + " from your bag and examine it. " + i.getDesc());
                    scrollText();
                }
            }
        }
        /* New Game Name Enter Click*/
        $("#nameEnter").on("click", function(event) {
                if($('#nameterm').val() != ''){
                        enterName();
                }
        });
        
        $('#nameterm').keypress(function (e) {
            let keyPress = e.which;
            if(keyPress == 13) {
                enterName();
            }
        });   

        
        const enterName = () => {
                 if($('#nameterm').val() != ''){
                    let name = $("#nameterm").val();
                    $("#startNewGame").toggle();
                    startGameInit(name);
                    $("#roam").toggle();
                }
                else{
                    $("#nameterm").attr("placeholder", "Please enter a name");     
                }
        }

        
        const preGameinit = () => {
            // Get the element with id="defaultOpen" and click on it
            document.getElementById("defaultOpen").click();
            ingShopCat = [key, comb];
            $("#ingShop").toggle();
            //$("#roam").toggle();
            $("#mainMenu").toggle();
            $("#startNewGame").toggle();
            $("#nameBox").toggle();            
        }
        const roamInit = () => {
            $(".Playername").text(player.getName());
        }
        const startGameInit = (name) => {
            player = Player(name, bedRoom, 100);
            player.getCurrentRoom().setHasSeen(false);
            player.addToInv(brownShirt);
            player.addToInv(blueSkirt);
            player.addToInv(comb);
            player.addToInv(key, 2);
            changeRoom(); 
            roamInit();
            state = AierithIntro;
            toggleTalk(Aierith);
        }
        const ingShopInit = () => {
            resetIngBuyMenu();
            loadShopMenu();
        } 
        
        $('body').keyup(function(e){
            if(e.keyCode == 13){
                $(this).trigger("enterKey");
            }
        });
        
        /********** Main ***********/
        window.onload = function () {
            ginit();
            loadRoom(shop);
            let player = Player("me", shop, 100);
            player.addToInv(comb);
            player.drop(comb);
            //preGameinit();
        }
