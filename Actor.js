 const Actor = (name_, startState_, cutOut_, states_ = [], munny_, startRoom, inv = []) => {
            let name = name_;
            let startState = startState_;   //The initial state of the actor
            let state = startState;         //current state
            let cutOut = cutOut_;           //The sprite of the actor
            let states = states_;           //The possible states of the actor
            let inventory = inv;            //The actors inventory
            let currentRoom = startRoom;    //The current room of the actor
            let munny = munny_;             //The amount of munny on the actor
            
            return{
                getName: () => {
                    return name;
                },
                getStartState: () => {
                    return startState;
                },
                getCutOut: () => {
                    return cutOut
                },
                getStates: () => {
                    return states;
                },
                getInv: () => {
                    return inv;
                },
                getItemCount: (item = null) => {
                    if(item === null){ //Do not check item count if item is null
                        throw new Error("Error: cannot get item count. Item is null"); 
                        return false;
                    }
                    for(let i of inventory){
                        if(i.getItem() === item){
                            return i.getCount();
                        }
                    }
                    throw new Error("Error: actor does not have item ", item, " in their inventory");
                    return false;
                },
                getCurrentRoom: () => {
                    return currentRoom;
                },
                getMunny: () => {
                    return munny;
                },
                 setMunny: (amount = 0) => {
                    munny = amount;
                },
                setCurrentRoom: (room = currentRoom) => {
                    currentRoom = room;
                },
                addMunny: (amount = 1) => {
                  munny += amount;  
                },
                subMunny: (amount = 1) => {
                    munny -= amount;
                },
                addToInv: (item, amount = 1) => { 
                    for(let i of inventory){
                        if(i.getItem() === item){
                            i.add(amount);
                            return true;
                        }
                    }
                    inventory.push(InvItem(item, amount));
                },
                subFromInv: (item, amount = 1) => {
                    for(let i of inventory){
                        if(i.getItem() === item){
                            i.remove(amount);
                            if(i.getCount() <= 0){
                                inventory.splice(inventory.indexOf(i), 1);
                            }
                            return true;
                        }
                    }
                    throw new Error("Error: item: "+ item + " could not be subtracted from actor's inventory. item: " + item + " does not exsist in actor's inventory.");
                    return false;
                },
                
            }
        };

        const Player = (name_, currentRoom_, munny_ = 0, inv = [], equipped_ = [], equipment_ = [], ingChest_ = []) => {
            let name = name_;
            let inventory = inv;
            let currentRoom = currentRoom_;
            let munny = munny_;
            let equipped = equipped_;
            let equipment = equipment_;
            let ingChest = ingChest_;
            let isOutside = false;
            let talking = false;
            let interaction = null;
            let interactingWith = null;
     
            return {
                getName: () => {
                    return name;
                },
                getInv: () => {
                    return inventory;
                },
                getCurrentRoom: () => {
                    return currentRoom;
                },
                getMunny: () => {
                    return munny;
                },
                getEquipped: () => {
                    return equipped;
                },
                getEquipment: () => {
                    return equipment
                }, 
                getIngChest: () => {
                    return ingChest;
                },
                getInteractingWith: () => {
                    return interactingWith;
                },
                getItemCount: (item = null) => {
                    if(item === null){ //Do not check item count if item is null
                        throw new Error("Error: cannot get item count. Item is null"); 
                        return false;
                    }
                    for(let i of inventory){
                        if(i.getItem() === item){
                            return i.getCount();
                        }
                    }
                    throw new Error("Error: player does not have item " + item + " in their inventory");
                },
                isOutside: () => {
                    return isOutside;
                },
                isTalking: () => {
                    return talking;
                },
                updateOutsideFlag: () => {
                    isOutside = currentRoom.isOutside();
                },
                setTalking: (bool) => {
                    talking = bool;
                },
                setMunny: (amount = 0) => {
                    munny = amount;
                },
                setEquipped: (equip = []) => {
                    equipped = equip;
                }, 
                setCurrentRoom: (room = currentRoom) => {
                    currentRoom = room;
                },
                startInteraction: (actor = null, action = null) => {
                    if(actor === null || action === null){
                        throw new Error("Error: player cannot start interaction. Both actor and action must be specified.");
                        return false;
                    }
                    else{
                        interactingWith = actor;
                        
                        switch(action){
                            case "talking": setTalking(true); interaction = "talking"; break; 
                            default: throw new Error("Error: cannot start interaction. " + action + " does not exist."); return false; 
                        }
                    }
                },
                stopInteraction: () => {
                    interactingWith = null;
                    interaction = null;
                    settalking(false);
                },
                addMunny: (amount = 1) => {
                  munny += amount;  
                },
                subMunny: (amount = 1) => {
                    munny -= amount;
                },
                subFromInv: (item, amount = 1) => {
                    let itemText;
                    
                    if(item.getType() == "equip"){
                        equipment.splice(equipment.indexOf(item), 1);
                        if(equipped.indexOf(item) != -1){
                            unequip(item);
                        }
                    }
                    else if(item.getType() == "ing"){
                        ingChest.splice(ingChest.indexOf(item), 1);
                    }
                    else{
                    
                    for(let i of inventory){
                        if(i.getItem() === item){ //Item is in inventory
                            i.remove(amount);
                            if(i.getCount() <= 0){ //There are no more of this item after it has been removed
                                inventory.splice(inventory.indexOf(i), 1);
                                $('.pop').popover('hide');
                                itemText = "#" + item.getId(); 
                                $(itemText).remove(); //Remove item from displayed inventory
                            }
                            else if(i.getCount === 1){ //There is only one of the item now
                                itemText = "#" + id + " .itemText";
                                $(itemText).text(item.getName()); //Removes item count by name in inventory
                            }
                            else{ //Multiple items left
                                itemText = "#" + id + " .itemText";
                                $(itemText).text("" + item.getName() + " x " + i.getCount());
                            }
                            return true;
                        }
                    }
                    console.log("Error: item: " + item + " could not be subtracted from actor's inventory. item: " + item + " does not exsist in actor's inventory.");
                    return false;
                    }
                },
                addToInv: (item, amount = 1) => { 
                    let itemText;
                    let actionLinks = '';
                    
                    //Check if item is a equipment or an ingrediant 
                    if(item.getType() == "equip"){
                        equipment.push(item);
                    }
                    else if(item.getType() == "ing"){
                        ingChest.push(item);
                    }
                    else{

                        //Fill in action links
                        if (item.isEdible()) {
                            actionLinks += '<a id=&quot;eat&quot; href=&quot;#&quot;>Eat</a><br>';
                        }
                        actionLinks += '<a id=&quot;examine&quot; href=&quot;javascript:examine(' + item.getId() + ')&quot;>Examine</a><br>';
                        actionLinks += '<a d=&quot;drop&quot; href=&quot;javascript:dropItem(' + item.getId() + ')&quot;>Drop</a>';

                        for(let i of inventory){
                            if(i.getItem() === item){ //Item exsists in player inventory
                                i.add(amount);
                                itemText = "#" + item.getId() + " .itemText";
                                $(itemText).text("" + item.getName() + " x " + i.getCount());
                                return true;
                            }
                        }
                        //Item is not in inventory
                        inventory.push(InvItem(item, amount));
                        if(amount > 1){
                            itemText = "" + item.getName() + " x " + amount; //Display item amount if greater than 1
                        }
                        else{
                            itemText = item.getName();
                        }
                        $(".inv ul").append("<li id=\"" + item.getId() + "\"><a class='pop' data-content='" + actionLinks + "'  data-toggle='popover' href='#' title='' data-original-title rel='popover'><span class='itemText'>" + itemText + '</span></a></li>');
                        //Set up popover for inventory item
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
                    }
                },
                unequip: (item = null) => {
                    if(item == null){
                        throw new Error("Error: Cannot unequip item. It is " + item);
                        return false; //Do not continue if item is equal to null
                    }
                    
                    if(equipped.getIndex(item) != -1){ //Item is currently equipped
                        equipped.splice(equipped.getIndex(item), 1); //Remove item from list of equipped items
                        return true;
                    }
                    console.log(item, " is not currently equipped.");
                }, 
                equip: (item = null) => {
                    if(item == null){
                        throw new Error("Error: Cannot equip item. It is " + item);
                        return false; //Do not continue if item is equal to null
                    }
                    
                    if(equipped.getIndex(item) != -1){ //Item is currently equipped
                       throw new Error("Error: cannot equip. " + item + " is already equipped.");
                       return false;
                    }
                    equipped.push(item); //place item in list of equipped items
                }
            }
        };
        
        const State = (pages_ = ["Error: this is a blank page. This state has no pages in it."]) => {
            let pages = pages_;
            let currentPage = 0;
            
            return{
                getPages: () => {
                    return pages;
                },
                getCurrentPage: () => {
                    return currentPage;
                },
                readPage: () => {
                    return pages[currentPage];
                },
                setCurrentPage: (page) => {
                    currentPage = page;
                },
                pageFwd: () => {
                    if(currentPage != pages.length-1){ //Dont move page foward if it is last page
                        currentPage++;
                        return true;
                    }
                    throw new Error("Error: cannot go to the next page. It is the last page in the state.");
                    return false;
                },
                pagePev: () => {
                    if(currentPage != 0){ //Dont move page foward if it is first page
                        currentPage--;
                        return true;
                    }
                    throw new Error("Error: cannot go to the previous page. It is the first page in the state.");
                    return false;
                }
            }
        };