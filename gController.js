const gController = (graphics_, player_) => {
    const player = player_;
    const graphics = graphics_;
    const modes = ["roam", "shop", "mainMenu", "newGame"];
    let operations = new Map();

    return {
        init: () => {
            operations.set("room", player.getCurrentRoom());
            operations.set("setInv", player.getInv());
            operations.set("updateInv", [null, false]);
            operations.set("removeInv", null);
            operations.set("mode", "roam");
            operations.set("talking", false);
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