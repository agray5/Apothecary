//Should only be one of each
        const Item = (name_, id_, desc_, inRoomDesc_ = "", value_ = 0, type_, subType_, sprite_, isTakeable_ = false, isExaminable_ = false, isEdible_ = false) => {
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
            if(name == null){
                throw new Error("Error: Item must have name.");
            }
            if(id == null){
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
                getType: () => {
                    return type;
                },
                getSprite: () => {
                    return sprite;
                },
                getSubType: () => {
                    return subType; 
                },
                isExaminable: () => {
                    return isExaminable;
                },
                isEdible: () => {
                    return isEdible;
                }
            } // /return
        }; // /Item
            
        //Mapping an item to an inventory count
        const InvItem = (item_, amount = 1) => {
            let item = item_;
            let count = amount;
            
             //Needed varibles
            if(item == null){
                throw new Error("Error: Item must not be " + item);
            }
            
            return {
                getName : () => {
                    return item.getName();
                },
                getItem : () => {
                    return item;
                },
                getCount : () => {
                    return count;
                }, 
                add : (num = 1) => {
                    count += num;
                },
                remove : (num = 1) => {
                    count -= num;
                }
            }
        };
            