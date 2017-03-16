const Screen = () => {
    let mode;
    let roam, shop, journal, startGame, mainMenu;
    
    
    return{ 
        init: () => {
            roam = document.getElementById("roam").innerHTML;
            shop = document.getElementById("shop").innerHTML;
            journal = document.getElementById("journal").innerHTML;
            mainMenu = document.getElementById("mainMenu").innerHTML;
            startGame = document.getElementById("startNewGame").innerHTML;
            $("#content").empty();
        },
        loadRoom: (room = null) => {
            $("#content").append(roam+journal);
            if(room === null){
                throw new Error("Error: could not load room. Room cannot be null");
                return false;
            }
            else{
                //Set background
                $(".main").css("background", "url(" + room.getBkg() + ") center center/ cover no-repeat "); 
                //Set Room Name
                $("#roomName").text(room.getName());
                //Flush Textbox
                $("ul.exit").empty();
                $(".textBox").empty();
                $(".action ul").empty();
                //Set Exits
                for (let e of exits) {
                    $("ul.exit").append("<li id='" + e.getDir() + "'><a href='#'>" + e.getDir() + "</li>");
                }
                
            }
        }
    }
    
}

