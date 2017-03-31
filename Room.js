 const Room = (name_, bkg_, initDesc_, exits_, morningDesc_, noonDesc_ = morningDesc_, eveningDesc_ = morningDesc_, nightDesc_ = morningDesc_, isOutside_ = false, shop_ = null, npcs_ = [], takeableItems_ = [], examinableItems_ = []) => {
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
     let isShop = false;
     let shop = shop_;

     if (noonDesc === null) {
         noonDesc = morningDesc;
     }
     if (eveningDesc === null) {
         eveningDesc = morningDesc;
     }
     if (nightDesc === null) {
         nightDesc = morningDesc;
     }
     if (shop !== null) {
         isShop = true;
     }

     return {
         getName: () => {
             return name;
         },
         getBkg: () => {
             return bkg;
         },
         getHasSeen: () => {
             return hasSeen;
         },
         getInitDesc: () => {
             return initDesc;
         },
         getExits: () => {
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
         getDesc: () => {
             switch (timeOfDay) {
                 case "morning":
                     return morningDesc;
                 case "noon":
                     return noonDesc;
                 case "evening":
                     return eveningDesc;
                 case "night":
                     return nightDesc;
             }
         },
         isOutside: () => {
             return isOutside;
         },
         isShop: () => {
             return isShop;
         },
         getShop: () => {
             return shop;
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
         setSavedText: (text) => {
             savedText = text;
         },
         setHasSeen: (bool) => {
             hasSeen = bool;
         },
         setTakableItems: (items = null) => {
             if (items === null) {
                 console.warn("Warning: cannot set rooms takable items. Items is null");
                 return false;
             }
             takeableItems = items;
         },
         seenRoom: () => {
             hasSeen = true;
         },
         addToTakableItems: (items = null) => {
             if (items === null) {
                 console.warn("Warning: cannot add to rooms takable items. Items is null");
                 return false;
             }
             takeableItems.concat(items);
         },
         subFromTakableItems: (items = null) => {
             if (items === null) {
                 console.warn("Warning: cannot sub from rooms takable items. Items is null");
                 return false;
             }
             for (let i of items) {
                 takeableItems.splice(takeableItems.indexOf(i), 1);
             }
         },
         addExits: (e) => {
             if (!Array.isArray(e)) {
                 throw new Error("Error: Room exit must be an array.");
             } else
                 exits = e;
         }
     }
 };

 const Exit = (dir_, nextRoom_, exitMsg_ = null) => {
     let dir = dir_;
     let nextRoom = nextRoom_;
     let exitMsg = exitMsg_;

     return {
         getDir: () => {
             return dir;
         },
         getNextRoom: () => {
             return nextRoom;
         },
         getExitMsg: () => {
             return exitMsg;
         }
     }
 }

 const shop = (bkg_ = null, inv_ = []) => {

     const bkg = bkg_;
     let inv = inv_;

     if (bkg === null) {
         throw new error("Error: shop background cannot be null");
     }

     return {
         setInv: (inv_) => {
             if (inv.length <= 0) {
                 console.warn("Warning: could not set shop inventory. Inventory length is 0 or less");
                 return false;
             }
             inv = inv_;
         },
         addToInv: (items) => {
             if (items == null || items.length <= 0) {
                 console.warn("Warning: cannot add to shops inventory if items is null or length is 0");
                 return false;
             }
             inv.concat(items);
         },
         removeFromInv: (items) => {
             for (let i of items) {
                 if (inv.indexOf(i) == -1) {
                     console.warn("Warning: " + i + " is not in the shops inventory");
                 } else {
                     inv.splice(inv.indexOf(i), 1);
                 }
             }
         }
     }
 }