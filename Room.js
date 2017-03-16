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
            
            if(noonDesc === null){
                noonDesc = morningDesc;
            }
            if(eveningDesc === null){
                eveningDesc = morningDesc;
            }
            if(nightDesc === null){
                nightDesc = morningDesc;
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
                getDesc: () => {
                    switch(timeOfDay){
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
                seenRoom: () => {
                    hasSeen = true;
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
                },
                getNextRoom: () => {
                    return nextRoom;
                },
                getExitMsg: () => {
                    return exitMsg;
                }
            }
        };