        /********** Varibles ***********/
        let clock = 600;
        let timeOfDay = "morning";
        const rate = 0.5;
        let turns = 0;
        let graphics; //graphics
         let player; //player variable
        //let gCon; //graphics controller

        /********** Functions ***********/



        //based on current room, proper room connecter
        const changeRoom = (room, exitMsg) => {
            let currentRoom = player.getCurrentRoom();
            //A turn is taken when changing rooms
            takeTurn();
            //Update players current room
            player.setCurrentRoom(room);
            //Is the player outside?
            player.updateOutsideFlag();
            //blank saved text
            currentRoom.setSavedText([]);
            //Load the room
            gcon.update("load_page", [room, exitMsg]);
            //Player has seen the room
            if (!currentRoom.getHasSeen())
                currentRoom.seenRoom();
            //loadRoom(room, exitMsg);
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



        $("#IngBuyButton").click(function () {
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
                $("#invTable").append('<tr id=' + i.getId() + 'IM><td>' + selectIcon(i.getType()) + "  " + i.getName() + '</td><td>' + i.getValue() + '</td><td>' + i.getInvCount() + '</td><td>' + total + '</td><td><button class="myBtn" id="jInvDrop" onclick="javascript:jInvDrop(' + i.getId() + ')">Drop</button></td></tr>');
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
            for (let i of equipment) {
                if (i.getId() == id) {
                    equipped.push(i);
                    switch (i.getSubType()) {
                        case "hat":
                            sel = "#hatE";
                            sel2 = "#playerHat";
                            break;
                        case "shirt":
                            sel = "#shirtE";
                            sel2 = "#playerShirt";
                            style1 = "width:90px; height:80px";
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
                            style1 = "width:90px; height:80px; padding-top: 30px;";
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
                        default:
                            throw new Error("Error: No equippable subtype for item");
                    }
                    console.log("sel= " + sel);
                    $(sel).empty();
                    $(sel2).empty();
                    $(sel).append("<img src=" + i.getSprite() + " style='align:center; " + style1 + "'>");
                    $(sel2).append("<img src=" + i.getSprite() + " class ='" + class_ + "' style='" + style2 + " position: absolute;'>");
                    loadAvatar();
                }
            }
        }

        const loadAvatar = () => {
            $("#playerAvatar").empty();
            let shirt = $("#playerShirt").clone();
            shirt.find('*').removeAttr('style');
            shirt.prop('id', 'avatarShirt');
            $("#playerAvatar").append("<img src='img/playerBase.png'>");
            $("#playerAvatar").append(shirt);
        }


        const loadEquipment = () => {
            let equipment = player.getEquipment();
            let eLength = equipment.length;
            $('#equipmentChest').children().each(function (index, item) {
                if (eLength == 0)
                    return;
                console.log(this);
                $(this).empty();
                $(this).append("<img src=" + equipment[eLength - 1].getSprite() + " class= '" + equipment[eLength - 1].getSubType() + "' onclick='equip(" + (equipment[eLength - 1].getId()) + "); equipDisplayInfo(" + (equipment[eLength - 1].getId()) + ");' onmouseover='equipDisplayInfo(" + (equipment[eLength - 1].getId()) + ");'>");
                eLength--;
            });
        };

        const equipDisplayInfo = (id) => {
            let equipment = player.getEquipment();
            for (let i of equipment) {
                if (i.getId() == id) {
                    $('#equipInfo').empty();
                    $('#equipInfo').append("<span class='cap'>" + i.getName() + "<br> value: " + i.getValue() + " mun</span><br>" + i.getDesc());
                }
            }
        };

        /* Talking */
        const toggleTalk = (actor) => {
            if (player.isTalking()) {
                player.stopInteraction();
                gcon.update("talking", null);
            } else {
                player.startInteraction(actor, "talking");
                gcon.update("talking", actor);
            }
        }


        /* Actions */
        const lookAround = (room) => {
            addText(room.getDesc());
            //displayItemsInRoom(room);
        };

        $(".inv ul").find("a").on("click", function (event) {
            scrollText();
        });

        //test button
        $("button").click(function () {
            //let win = window.open();
            //win.document.write(inventory[0].name) ;
            //$( "#roam" ).toggle();
            //$( "#ingShop" ).toggle();
            //win.document.write(inventory[0].name) ;
            //win.document.close();
        });

        const scrollText = () => {
            let psconsole = $('.textBox');
            if (psconsole.length) {
                psconsole.scrollTop(psconsole[0].scrollHeight - psconsole.height());
                console.log("Scroll Textbox down");
            }
        };

        const scrollTextUp = () => {
            let psconsole = $('.textBox');
            if (psconsole.length) {
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
            player.setName(name);
            player.addToInv(comb);
            player.addToInv(brownShirt);
            player.addToInv(blueSkirt);
            player.addToInv(key, 2);
            gcon.update("mode", "roam");
            changeRoom(bedRoom);
            roamInit();
            toggleTalk(Aierith);
        }
        const ingShopInit = () => {
            resetIngBuyMenu();
            loadShopMenu();
        }

        $('body').keyup(function (e) {
            if (e.keyCode == 13) {
                $(this).trigger("enterKey");
            }
        });
 
        /********** Main ***********/
        window.onload = function () {
            graphics = Graphics();
            player = Player("me", bedRoom, 100);
            gcon.init(graphics, player);

            //gcon.update("mode", "mainMenu");
            startGameInit("Anne");
        }