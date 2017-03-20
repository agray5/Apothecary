 const Actor = (name_, startState_, cutOut_, states_ = [], munny_, startRoom, inv = []) => {
     let name = name_;
     let startState = startState_; //The initial state of the actor
     let state = startState; //current state
     let cutOut = cutOut_; //The sprite of the actor
     let states = states_; //The possible states of the actor
     let inventory = inv; //The actors inventory
     let currentRoom = startRoom; //The current room of the actor
     let munny = munny_; //The amount of munny on the actor

     const addToInv = (item, amount = 1) => {
         let isNew = false;
         let count = 0;
         let invMap;

         if (inventory.indexOf(item) === -1) {
             invMap = InvItem(item, amount);
             inventory.push(invMap);
             isNew = true;
         }
         //Find count of invItem
         for (let i of inventory) {
             if (i.getItem === item) {
                 if (!isNew) { //Item exsists in player inventory
                     i.add(amount);
                 }
                 count = i.getCount();
                 invMap = i;
             }
         }
         updateInvColItem(item, invMap.getCount(), isNew);

     }

     const subFromInv = (item, amount = 1) => {
         for (let i of inventory) {
             if (i.getItem() === item) {
                 i.remove(amount);
                 if (i.getCount() <= 0) {
                     inventory.splice(inventory.indexOf(i), 1);
                 }
                 return true;
             }
         }
         console.warn("Warning: item: " + item + " could not be subtracted from actor's inventory. item: " + item + " does not exsist in actor's inventory.");
         return false;
     }


     return {
         addToInv,
         subFromInv,
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
             if (item === null) { //Do not check item count if item is null
                 throw new Error("Error: cannot get item count. Item is null");
                 return false;
             }
             for (let i of inventory) {
                 if (i.getItem() === item) {
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
         drop: (item = null) => {
             if (item === null) {
                 console.warn("Warning: cannot drop item. It is null");
                 return false;
             }
             subFromInv(item);
             currentRoom.addToTakableItems(item);
             refreshActions(currentRoom);
             lookAround(currentRoom);
         },
         take: (item) => {
             let index = currentRoom.getTakeableItems().indexOf(item);

             if (index !== -1) {
                 addToInv(item);
                 currentRoom.getTakeableItems().splice(index, 1); //Remove item from rooms takable items
                 refreshActions(currentRoom);
                 lookAround(currentRoom);
             } else {
                 console.warn("Warning: The item is not in the actors current room");
             }
         }

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

     const findInvItem = (item) => {
         for (let i of inventory) {
             if (i.getItem() === item) {
                 return i;
             }
         }
         console.warn("Warning: Could not find a inventory mapping with that item.");
         return false;
     }

     const addToInv = (item, amount = 1) => {
         //Check if item is a equipment or an ingrediant 
         if (item.getType() == "equip") {
             equipment.push(item);
         } else if (item.getType() == "ing") {
             ingChest.push(item);
         } else { //Everything else goes into normal inventory
             let isNew = false;
             let count = 0;
             let invMap;

             if (inventory.indexOf(item) === -1) {
                 invMap = InvItem(item, amount);
                 inventory.push(invMap);
                 isNew = true;
             }
             //Find count of invItem
             for (let i of inventory) {
                 if (i.getItem === item) {
                     if (!isNew) { //Item exsists in player inventory
                         i.add(amount);
                     }
                     count = i.getCount();
                     invMap = i;
                 }
             }
             updateInvColItem(item, invMap.getCount(), isNew);
         }
     }

     const subFromInv = (item, amount = 1) => {

         if (item.getType() == "equip") {
             equipment.splice(equipment.indexOf(item), 1);
             if (equipped.indexOf(item) != -1) {
                 unequip(item);
             }
         } 
         else if (item.getType() == "ing") {
             ingChest.splice(ingChest.indexOf(item), 1);
         } 
         else {
             let i = findInvItem(item);
             if (inventory.indexOf(i) !== -1) { //Item is in inventory
                 i.remove(amount);
                 if (i.getCount() <= 0) { //There are no more of this item after it has been removed
                     inventory.splice(inventory.indexOf(i), 1);
                     removeFromInvCol(item);
                 } else {
                     updateInvColItem(item, i.getCount()); //Update inventory text
                 }
                 return true;
             }
             console.warn("Warning: item: " + item.getName() + " could not be subtracted from players's inventory. item: " + item.getName() + " does not exsist in player's inventory.");
             return false;
         }
     }

     return {
         findInvItem,
         addToInv,
         subFromInv,
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
             if (item === null) { //Do not check item count if item is null
                 console.warn("Warning: cannot get item count. Item is null");
                 return false;
             }
             for (let i of inventory) {
                 if (i.getItem() === item) {
                     return i.getCount();
                 }
             }
             console.warn("Warning: player does not have item " + item + " in their inventory");
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
             if (actor === null || action === null) {
                 console.warn("Warning: player cannot start interaction. Both actor and action must be specified.");
                 return false;
             } else {
                 interactingWith = actor;

                 switch (action) {
                     case "talking":
                         setTalking(true);
                         interaction = "talking";
                         break;
                     default:
                         console.warn("Warning: cannot start interaction. " + action + " does not exist.");
                         return false;
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
         drop: (item = null) => {
             if (item === null) {
                 console.warn("Warning: cannot drop item. It is null");
                 return false;
             }
             subFromInv(item);
             currentRoom.addToTakableItems(item);
             refreshActions(currentRoom);
             lookAround(currentRoom);
         },
         take: (item) => {
             let index = currentRoom.getTakeableItems().indexOf(item);

             if (index !== -1) {
                 addToInv(item);
                 currentRoom.getTakeableItems().splice(index, 1); //Remove item from rooms takable items
                 refreshActions(currentRoom);
                 lookAround(currentRoom);
             } else {
                 console.warn("Warning: The item is not in the actors current room");
             }
         },
         unequip: (item = null) => {
             if (item == null) {
                 console.warn("Warning: Cannot unequip item. It is " + item);
                 return false; //Do not continue if item is equal to null
             }

             if (equipped.indexOf(item) != -1) { //Item is currently equipped
                 equipped.splice(equipped.indexOf(item), 1); //Remove item from list of equipped items
                 return true;
             }
             console.warn("Warning: ", item, " is not currently equipped.");
         },
         equip: (item = null) => {
             if (item == null) {
                 console.warn("Warning: Cannot equip item. It is " + item);
                 return false; //Do not continue if item is equal to null
             }

             if (equipped.indexOf(item) != -1) { //Item is currently equipped
                 console.warn("Warning: cannot equip. " + item + " is already equipped.");
                 return false;
             }
             equipped.push(item); //place item in list of equipped items
         }
     }
 };

 const State = (pages_ = ["Error: this is a blank page. This state has no pages in it."]) => {
     let pages = pages_;
     let currentPage = 0;

     return {
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
             if (currentPage != pages.length - 1) { //Dont move page foward if it is last page
                 currentPage++;
                 return true;
             }
             console.warn("Warning: cannot go to the next page. It is the last page in the state.");
             return false;
         },
         pagePev: () => {
             if (currentPage != 0) { //Dont move page foward if it is first page
                 currentPage--;
                 return true;
             }
             console.warn("Warning: cannot go to the previous page. It is the first page in the state.");
             return false;
         }
     }
 };