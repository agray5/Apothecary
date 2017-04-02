const gController = (graphics_, player_) => {
    const player = player_;
    const graphics = graphics_;
    const modes = ["roam", "shop", "mainMenu", "newGame"];
    let operations = new Map();

    return {
        init: () => {
            operations.set("load_page", player.getCurrentRoom()); // data can be a list [room, mode_change], only one is assumed to be room
            operations.set("setInv", player.getInv());
            operations.set("updateInv", [null, false]); // data is [invItem, newItem], if newItem is not included it is assumed to be false
            operations.set("removeInv", null);
            operations.set("mode", "roam");
            operations.set("talking", null); // data is null if toggling off, but needs an actor to toggle on
        },
        update: (operation, data) => {
            if (operation === "mode") {
                if(!modes.includes(data)){
                    console.warn("Warning: cannot set mode in graphics. Mode " + data + " is undefined.");
                    return false;
                }
            }
            
            if (operations.get(operation) === undefined) {
                console.warn("Warning: cannot update graphics. " + operation + " is undefined");
                return false;
            }

            operations.set(operation, data);
            graphics.render(operation, operations);
        }
    }
}