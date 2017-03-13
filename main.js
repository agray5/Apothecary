/********** Object Constructors ***********/
        const Item = (name_, id_, desc_, inRoomDesc_ = "", value_ = 0, type_, subType_, sprite_, isTakeable_ = false, isExaminable_ = false, isEdible_ = false) => {
            let invCount = 0;
            let name = name_;
            let id = id_;
            let inRoomDesc = inRoomDesc_;
            let value = value_;
            let type = type_;
            let subType = subType_;
            let sprite = sprite_;
            let isTakeable = isTakeable_;
            let isExaminable = isExaminable_;
            let desc = desc_;
            let isEdible = isEdible_;
            
            //Needed varibles
            if(name === undefined){
                throw new Error("Error: Item must have name.");
            }
            if(id === undefined){
                throw new Error("Error: Item must have id.");
            }
            
            if(desc === undefined){
                throw new Error("Error: Item must have description.");
            }
            
            return{
                getName: () => {
                    return name;
                },
                getId: () => {
                    return id;
                },
                getDesc: () => {
                    return desc;
                },
                getInRoomDesc: () => {
                    return inRoomDesc;
                },
                getValue: () => {
                    return value;
                },
                getValue: () => {
                    return value;
                }
            }
        };
        const Room = (name_, bkg_, initDesc_, exits_, morningDesc_, noonDesc_ = morningDesc_, eveningDesc_ = morningDesc_, nightDesc_ = morningDesc_,  isOutside_ = false, npcs_ = [], takeableItems_ = [], examinableItems_) =>{
            let hasSeen = false;
            let savedText = [];
            let bkg = bkg_;
            let exits = exits_;
            let name = name_;
            let initDesc = initDesc_;
            let morningDesc = morningDesc_;
            let noonDesc = noonDesc_;
            let eveningDesc = eveningDesc_;
            let nightDesc = nightDesc_;
            let npcs = npcs_;
            let takeableItems = takeableItems_;
            let examinableItems = examinableItems_;
            let isOutside = isOutside_;
            
            if(noonDesc === undefined){
                noonDesc = morningDesc;
            }
            if(eveningDesc === undefined){
                eveningDesc = morningDesc;
            }
            if(nightDesc === undefined){
                nightDesc = morningDesc;
            }
            
            return {
                getName: () => {
                    return name;
                },
                getBkg: () => {
                    return bkg;
                },
                getInitDesc: () => {
                    return initDesc;
                },
                getExits: () =>{
                    return exits;
                },
                getMorningDesc: () => {
                    return morningDesc;
                },
                getNoonDesc: () => {
                    return noonDesc;
                },
                getEveningDesc: () => {
                    return eveningDesc;
                },
                getNightDesc: () => {
                    return nightDesc;
                },
                isOutside: () => {
                    return isOutside;
                },
                getNpcs: () => {
                    return npcs;
                },
                getTakeableItems: () => {
                    return takeableItems;
                },
                getExamineableItems: () => {
                    return examinableItems;
                },
                addExits: (e) => {
                    if(!Array.isArray(e)){
                        throw new Error("Error: Room exit must be an array.");
                    }
                    else
                        exits = e;
                }
                
            }
            
            
        
        };
        
        
        const Exit = (dir_, nextRoom_, exitMsg_ = null) => {
            let dir = dir_;
            let nextRoom = nextRoom_;
            let exitMsg = exitMsg_;
            
            return{
                getDir: () => {
                    return dir;
                }
            }
        };
        
        const Actor = (name_, startState_, cutOut_, states_ = [] ) => {
            let name = name_;
            let startState = startState_;
            let cutOut = cutOut_;
            let states = states_;
            
            return{
                getName: () => {
                    return name;
                },
                getStartState: () => {
                    return startState;
                },
                getCutOut: () => {
                    return cutOut;
                },
                getStates: () => {
                    return states;
                }
            }
        };
        
        const State = (pages_) => {
            let pages = pages_;
            
            return{
                getPages: () => {
                    return pages;
                }
            }
        };
        /********** Varibles ***********/
        let name = "Megiath";
        let gender = "female";
        //holds inventory items
        let inventory = [];
        let ingChest = [];
        let equipped = [];
        let equipment = [];
        let currentRoom;
        let munny = 0;
        let clock = 600;
        let timeOfDay = "morning";
        let rate = 0.5;
        let turns = 0;
        let isOutside = false;
        let N = "North";
        let S = "South";
        let E = "East";
        let W = "West";
        let NE = "NorthEast";
        let NW = "NorthWest";
        let SE = "SouthEast";
        let SW = "SouthWest";
        let ingShopCat = [];
        let resizeToggle = false;
        let talking = false;
        let state;
        let currentPage = 0;
        /********** Functions ***********/
        /* Handle Room as it appears on the page*/
        const updateRoomName = (name) => {
            $("#roomName").text(name);
        };
        const addText = (text) => {
            $(".textBox").append("<p>" + text + "</p>");
        };
        const flushTextBox = () => {
            $("ul.exit").empty();
            $(".textBox").empty();
            $(".action ul").empty();
        };
        const addExitsText = (exits) => {
            for (let e of exits) {
                $("ul.exit").append("<li id='" + e.getDir() + "'><a href='#'>" + e.getDir() + "</li>");
            }
        };
    
        const removeExits = (exits) => {
            for (let e of exits) {
                let str = "#" + e.getDir();
                $(str).remove();
            }
        };
        const addActionsBasedOnCurrRoom = () => {
            if(!talking){
                if (typeof currentRoom.getNpcs() != "undefined" && currentRoom.getNpcs() !== null && currentRoom.getNpcs().length > 0) {
                    $(".action ul").append('<li id="talk"><a href="#">Talk To</li>');
                }
                if (typeof currentRoom.getTakeableItems() != "undefined" && currentRoom.getTakeableItems() !== null && currentRoom.getTakeableItems().length > 0) {
                    $(".action ul").append('<li id="take"><a href="#">Take</li>');
                }
                if (typeof currentRoom.getExamineableItems() != "undefined" && currentRoom.getExamineableItems() !== null && currentRoom.getExaminableItems().length > 0) {
                    $(".action ul").append('<li id="examine"><a href="#">Examine</li>');
                }
                $(".action ul").append('<li id="look"><a href="#">Look Around</li>');
                if (currentRoom == ingredientshop) 
                    $(".action ul").append('<li id="shop"><a href="#">Shop</li>');
            }
        };
        
        const addAction = (id, name) => {
            $(".action ul").append('<li id="'+id+'"><a href="#">'+name+'</li>');
        };
        
        const removeAction = (id) => {
            $(".action #"+id).remove();
        };
        
        const displayItemsInRoom = () => {
            if (currentRoom.takeableItems != null && currentRoom.takeableItems.length > 0) {
                for (let i of currentRoom.takeableItems) {
                    addText('\n <span class="inTextBox" id="' + i.id + '">' + i.inRoomDesc + "</span>");
                }
            }
        };
        //based on current room, proper room connecter
        const changeRoom = (exit) => {
            takeTurn();
            $(".main").css("background", "url("+currentRoom.bkg+") center center/ cover no-repeat ");
            if (currentRoom.isOutside) {
                isOutside = true;
            }
            currentRoom.savedText = [];
            refreshRoom(exit);
            if(!currentRoom.hasSeen)
                currentRoom.hasSeen = true;
        };
        //only to refresh the room's state
        const refreshRoom = (exit) => {
            flushTextBox();
            updateRoomName(currentRoom.name);
            if (exit != null) {
                addText(exit.getExitMsg());
            }
            if(!currentRoom.hasSeen && !(currentRoom.getInitDesc() === null)){
                 addText(currentRoom.getInitDesc());
            }
            else{
                switch(timeOfDay){
                    case "morning": 
                        addText(currentRoom.morningDesc); break;
                    case "noon":
                        if(currentRoom.noonDesc == null)
                            addText(currentRoom.morningDesc);
                        else
                            addText(currentRoom.noonDesc);
                        break;
                    case "evening":
                        if(currentRoom.eveningDesc == null)
                            addText(currentRoom.morningDesc);
                        else
                            addText(currentRoom.eveningDesc);
                        break;
                    case "night":
                        if(currentRoom.nightDesc == null)
                            addText(currentRoom.morningDesc);
                        else
                            addText(currentRoom.nightDesc);
                        break;
                }
            }        
            displayItemsInRoom();
            addExitsText(currentRoom.getExits());
            addActionsBasedOnCurrRoom();
        };
        //used if we only want to refersh actions
        const refreshActions = () => {
            $(".action ul").empty();
            addActionsBasedOnCurrRoom();
        };
        /* Inventory*/
        const addInv = (item) => {
            console.log("adding: " + item.getName());
            if (item.invCount <= 0) {
                inventory.push(item);
                $(".inv ul").append("<li id=\"" + item.getId() + "\"><a class='pop' data-content='" + getInvLinks(item.getId()) + "'  data-toggle='popover' href='#' title='' data-original-title rel='popover'><span class='itemText'>" + item.getName() + '</span></a></li>');
                $(".pop").popover({
                        trigger: "manual",
                        html: true,
                        animation: false,
                        placement: 'right',
                        container: 'body',
                    })
                    .on("mouseenter", function() {
                        if(!talking){
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
            } else {
                let str = "#" + item.id + " .itemText";
                $(str).text("" + item.name + " x " + (item.invCount + 1));
            }
            item.invCount++;
        };
        const removeInv = (item) => {
            item.invCount--;
            if (item.invCount <= 0) {
                let index = inventory.indexOf(item);
                $('.pop').popover('hide');
                if (index != -1) {
                    inventory.splice(index, 1);
                }
                let str = "#" + item.id;
                $(str).remove();
            } else {
                if (item.invCount == 1) {
                    let str1 = "#" + item.id + " .itemText";
                    $(str1).text(item.name);
                } else {
                    let str1 = "#" + item.id + " .itemText";
                    $(str1).text("" + item.name + " x " + (item.invCount + 1));
                }
            }
        };
        //fix string
        const dropItem = (item) => {
            for (let i of inventory) {
                if (i.id == item) {
                    removeInv(i);
                    if (currentRoom.takeableItems == null) {
                        console.log("currentRoom.takeableItems is null");
                    }
                    currentRoom.takeableItems.push(i);
                    refreshActions();
                    lookAround();
                    //scrollText();
                }
            }
        };
        const takeItem = (item) => {
            if(item.type == "equip")
                equipment.push(item);
            else
                addInv(item);
            let index = currentRoom.takeableItems.indexOf(item);
            if (index != -1) {
                currentRoom.takeableItems.splice(index, 1);
            }
            let str = "#" + item.id + ".inTextBox";
            $(str).remove();
            str = "#" + item.id + ".takeable";
            $(str).remove();
        };
        const getInvLinks = (id) => {
            let obj = null;
            for (let o of inventory) {
                if (o.id == id) {
                    obj = o;
                }
            }
            let str = '';
            if (obj.isEdible) {
                str += '<a id=&quot;eat&quot; href=&quot;#&quot;>Eat</a><br>';
            }
            str += '<a id=&quot;examine&quot; href=&quot;javascript:examine(' + obj.id + ')&quot;>Examine</a><br>';
            str += '<a d=&quot;drop&quot; href=&quot;javascript:dropItem(' + obj.id + ')&quot;>Drop</a>';
            return str;
        };
        /* Munny */
        const addMunny = (amount) => {
            munny += amount;
            $(".munny").text(munny);
        };
        const subMunny = (amount) => {
            munny -= amount;
            $(".munny").text(munny);
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
                $("#buyTable").append('<tr id=' + i.id + 'BM><td>' + selectIcon(i.type) + "  " + i.name + '</td><td>' + i.value + '</td><td>X</td><td><span class="buyAmount"><button class="up" onclick="javascript:setQuantity(\'up\',' + i.id + ',' + i.value + ')">+</button>' +
                    '<input type="text" value="0" style="width: 20px"><button class="down" onclick="javascript:setQuantity(\'down\',' + i.id + ',' + i.value + ')">-</button></span></td><td><span class="buyItemTotal">0</td></tr>');
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
                let str = '#' + i.id + 'BM input';
                let str2 = '#' + i.id + 'BM .buyItemTotal';
                let itemTot = parseInt($(str).val());
                if (itemTot > 0) {
                    addInv(i);
                }
                $(str).val(0);
                $(str2).text(0);
            }
        });
    
    //Reset Ingredient shop varibles
        const resetIngBuyMenu = () => {
            $('#buyTotalAmount').text(0);
            for (let i of ingShopCat) {
                let str = '#' + i.id + 'BM input';
                let str2 = '#' + i.id + 'BM .buyItemTotal';
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
            $("#invTable").append("<tr><th>Name</th><th>Value</th><th>Amount</th><th>Total Value</th></tr>")
            for (let i of inventory) {    
                let total = i.invCount * i.value;
                $("#invTable").append('<tr id=' + i.id + 'IM><td>' + selectIcon(i.type) + "  " + i.name + '</td><td>' + i.value + '</td><td>'+i.invCount+'</td><td>'+ total +'</td><td><button class="myBtn" id="jInvDrop" onclick="javascript:jInvDrop('+ i.id +')">Drop</button></td></tr>');
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
                if(i.id == id){
                    equipped.push(i);
                    switch(i.subType){
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
                        default: console.log("Error: No equipable subtype for item");
                    }
                    console.log("sel= "+sel);
                    $(sel).empty();
                    $(sel2).empty();
                    $(sel).append("<img src="+i.sprite+" style='align:center; "+style1+"'>");    
                    $(sel2).append("<img src="+i.sprite+" class ='"+class_+"' style='"+style2+" position: absolute;'>");    
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
            let eLength = equipment.length;
            $('#equipmentChest').children().each(function(index, item) {
                if(eLength == 0)
                    return;
                console.log(this);
                $(this).empty();
                $(this).append("<img src="+equipment[eLength - 1].sprite+" class= '"+equipment[eLength - 1].subType+"' onclick='equip("+(equipment[eLength - 1].id)+"); equipDisplayInfo("+(equipment[eLength - 1].id)+");' onmouseover='equipDisplayInfo("+(equipment[eLength - 1].id)+");'>");    
                eLength--;
            });
        };
        
        const equipDisplayInfo = (id) => {
            for(let i of equipment){
                if(i.id == id){
                    $('#equipInfo').empty();
                    $('#equipInfo').append("<span class='cap'>"+i.name + "<br> value: "+i.value + " mun</span><br>"+ i.desc);
                }
            }
        };
        
        /* Talking */
        const toggleTalk = (actor) => {
            $(".bottomOfScreen").attr('id', ($(".bottomOfScreen").attr('id') == 'bottomText' ? 'talkingText' : 'bottomText'));
            $("#playerAvatar").toggle();
            $("#resizeBtn").toggle();
            $("#nameBox").toggle();
            console.log("toggle talk");
            if(!talking){
                talking = true;
                $("#nameBoxText").text(actor.name);
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
                talking = false;
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
            if(currentPage < state.getPages().length){
                currentPage++;
                $(".textBox").text(state.getPages()[currentPage]);
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
            if(currentPage > 0){
                currentPage--;
                $(".textBox").text(state.getPages()[currentPage]);
            }
            if(currentPage == 0){
                removeAction("prev");
            }
            else if(currentPage == state.getPages().length - 2){
                addAction("next", "Next");
            }
        }
        
        /* Actions */
        const lookAround = () => {
            addText(currentRoom.desc);
            displayItemsInRoom();
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
            if(!talking){
                let oldRoom = currentRoom;
                for (let e of currentRoom.exits) {
                    if (e.dir == this.id) {
                        currentRoom = e.nextRoom;
                        if (e.nextRoom == null) {
                            console.log(e.dir);
                            console.log("room is null");
                        } else {
                            if (currentRoom != oldRoom) {
                                if (e.exitMsg != null)
                                    changeRoom(e);
                                else
                                    changeRoom();
                            }
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
            for (let i of currentRoom.takeableItems) {
                $(".action ul").append('<li class = "takeable" id="' + i.id + '"><a href="#">' + i.name + '</a></li>');
            }
            $(".action ul").append('<li id="back"><button type="image" src="img/parch.png" class = "btn-custom" class="btn ">Back</button></li>');
        });
    
        /* Take.Item Click */
        $(".action").on("click", "li.takeable", function(event) {
            takeTurn();
            for (let i of currentRoom.takeableItems) {
                if (i.id == this.id) {
                    takeItem(i);
                }
            }
            if (currentRoom.takeableItems.length == 0) {
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
                console.log("down");
            }
        };
        
        const scrollTextUp = () => {
            let psconsole = $('.textBox');
            if(psconsole.length){
                psconsole.scrollTop(0);
                console.log("up");
            }
        };
        
        
        /* ToolTip Examine Click */
        const examine = (item) => {
            console.log('worked');
            for (let i of inventory) {
                if (i.id == item) {
                    addText("You remove the " + i.name + " from your bag and examine it. " + i.desc);
                    scrollText();
                }
            }
        }
        /* New Game Name Enter Click*/
        $("#nameEnter").on("click", function(event) {
        if($('#nameterm').val() != ''){
                enterName();
        });
        
        $('#nameterm').keypress(function (e) {
            let keyPress = e.which;
            if(keyPress == 13) {
                enterName();
                }
            }
        });   

        
        const enterName = () => {
                 if($('#nameterm').val() != ''){
                    name = $("#nameterm").val();
                    $("#startNewGame").toggle();
                    roamInit();
                    $("#roam").toggle();
                }
                else{
                    $("#nameterm").attr("placeholder", "Please enter a name");       
        }
        
        /* New Game Click */
        $("#NewGameBtn").on("click", function(event) {
            $("#mainMenu").toggle();
            $("#startNewGame").toggle();
            console.log("New game button click");
        });
        
        $('body').hover(function(event) {
            //find the element that dispatched the event
            let target = $(event.target);
            //make sure that the element that dispatched the event was NOT the .del-btn
            if (!target.hasClass('pop')) {
            //if ANY element on the body dispatched the event other than the .del-btn
            //hide any open popovers
            $('.pop').popover('hide');
                    }
         });
        
        
        const init = () => {
            // Get the element with id="defaultOpen" and click on it
            document.getElementById("defaultOpen").click();
            ingShopCat = [key, comb];
            $("#ingShop").toggle();
            $("#roam").toggle();
            //$("#mainMenu").toggle();
            $("#startNewGame").toggle();
            $("#nameBox").toggle(); 
            addMunny(100);
            currentRoom = bedRoom;
            changeRoom();
            currentRoom.hasSeen = false;
            equipment.push(brownShirt);
            equipment.push(blueSkirt);
            toggleTalk(Aierith);
        }
        const roamInit = () => {
            $(".Playername").text(name);
            state = AierithIntro;
            console("roamInit()");
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
        /********** Objects ***********/
        /* items */
        let key = Item("key", 1, "An old key.", "A small glinting object lays on the ground.", 2, "ing", null, null, true, true);
        let comb = Item("comb", 2, "Without this you'd always have a bad hairday.", "A small comb lays on the ground", 4, "none", null,  null, true, true);
        let brownShirt = Item("brown shirt", 3, "A floofy brown shirt", "A brown fluffy item lies scrunched up on the ground.", 10, "equip", "shirt","img/shirtBrown.png", true, true);
        let blueSkirt = Item("blue skirt", 4, "A short blue skirt.", "A blue fluffy item lies scrunched up on the ground.", 15, "equip", "skirt","img/skirtBlue.png", true, true);
        /* rooms */
        //west wing rooms
        let bedRoom = Room("Bedroom", "img/bedroom.png", "Your new mentor gives you a gentle smile as she turns to leave you to get settled in your new room. Suddenly exhausted you take a seat on your bed. "
            +"Waves of tension flow down your body. Sure you had known a lot would be expected out of you, working at the royal castle, but you hadn't expected to already be in charge of so much. Your right hand idly plays with your "
            +"bed coverings, fingers slowly kneading into them like a kitten searching for milk. This was life, the royality owned the commoners. They could only hope that their ruler's guidance lead to prosperity. You look around your room with a sigh. "
            +"Its true that its no smaller than what you use to back home, you did after all share a room of simular size with your sister, but its feels empty and lonely. "
            +"The bed is covered in a plain spread with white sheets and a brown thin looking blanket. Your new desk is unadorned, just waiting to be covered in knick nacks and work forms. You spend the rest of the day unpacking your megar belongings and end the day with "
            +"with a bath in your private wooden wash basin in the corner of the room. You apperciate the plain dividor hiding you from the view of the door.",
        "Your bedroom is on the small side but at least its been furnished with a desk and a bed along the east wall. In the opposite corner a plain dividor hides a wooden wash basin. A door to the north leads out into the hallway.");
        let hallway = Room("Hallway",  "img/hallway.jpg", null, "A narrow hallway lined with doors");
        let closet = Room("Closet",  "img/closet.jpg", null, "A walk in closet with plenty of room tp hang up clothes. The door out is to the northEast.");
        //east wing rooms
        //lobby rooms
        let platform = Room("Platform", "img/platform.jpg", null, "You stand on a  platform overlooking the first floor of the castle. To the west there is the door leading to the west wing and to the east is the door to the east wing. Below you are stairs going down.");
        let lobby = Room("Lobby", "img/lobby.jpg", null, "This room could easily fit hundered people all scurring to complete one task or another. It was rare to see any royalty come this way as this is considered to be an extension of the castle workers living quarters. " +
            " It would be hard to complain though. Rays of sunlight stream through the high widows and sometimes small birds would fly in, chirping a merry song. The smell of freshly made food could be smelt from the nearby kitchen.", null, null, "This room could easily fit hundered people all scurring to complete one task or another. It was rare to see any royalty come this way as this is considered to be an extension of the castle workers living quarters. " +
            " It would be hard to complain though. The hall looked breathtaking at night. Streams of cool moonlight filter in through the widows, while colorful laterns have been lit along the walls bathing the hall in a myriad of colors.");
        let shop = Room("Your Shop",  "img/shop.png", null, "A sparse shop with cabinets lined agianst the back wall holding your products. In front of the cabinets is a bar with comfy looking stools for patrons to sit at. Going through the employees only door will lead into the inner bar area while the door to the east leads out. ");
        let ingredientshop = Room("Ingredient Shop",  "img/ingShop.jpg", null, "A sparse shop with cabinets lined agianst the back wall holding your products. In front of the cabinets is a bar with comfy looking stools for patrons to sit at.");
        /* exits */
        bedRoom.addExits([Exit("Bedroom", bedRoom), Exit(E, platform)]);
        hallway.addExits([Exit("Bedroom", bedRoom), Exit(E, platform)]);
        closet.addExits([Exit(NE, bedRoom)]);
        platform.addExits([Exit(W, hallway), Exit("Down", lobby, "You walk down the stairway and into the lobby.")]);
        lobby.addExits([Exit("Up", platform, "You walk up the staircase and onto the platform."), Exit(shop.name, shop), Exit("Ingredient Shop", ingredientshop)]);
        shop.addExits([Exit("Employees Only Door", null), Exit("Out", lobby)]);
        ingredientshop.addExits([Exit("Out", lobby) ]);
        
        
        /* Actors */
        let AierithIntro = State(
        [`So you must be the famous ${name}. I am Aierith, the apothecary master of the castle. I am in charge of the apothecary room and making sure all the royal medicine needs are met. `,
         'As you can imagine this makes it diffcult to also attend to the needs of the workers and other residents of the castle. Thats where you come in. You will be my assistant, of sorts. ',
         'Don\'t look at me like that. I may of have heard good things about you but you just got here. You have to prove yourself first if you want full the privileges of the station.',
         'For now you will start off with the rank of apprentice. While the royal members do not worry about the expenses of the medicine, as the house settles those accounts, the other residents will pay you directly.',
         'To handle these operations you will be provided with a shop to operate out of. You will be fully responsible for your store, including making the medicines to stock it with and obtaining the herbs for the medicines themselves. ',
         'You will get paid a weekly stipend, but if you do not meet a certian quato of sales your pay will be docked. In the same return if you have a particularly good week you may recive a bonus. ',
         'You will also get to keep the coin from your patrons minus a tax deduction, of course. Once you are of a suffiecent rank you may even receive requests from nobels or even members of the royal family. Missives for these will be delivered to you at daybreak.',
         'You are not required to complete these, but they pay a higher amount and if you fail they may be required to seek help else where. This may inevitably hurt your reputation and negativly impact your status. ',
         'With enough negative reports I may be forced to lower your rank. I know that it may be a lot to take in right now but I am sure you will get the hang of it.'
         ])
        let Aierith = Actor("Aierith", AierithIntro, "img/Aierith.png");
        /********** Main ***********/
        window.onload = function () {
            init();
            addInv(comb);
            addInv(key);
            addInv(key);
            
            console.log("edit");
        }
