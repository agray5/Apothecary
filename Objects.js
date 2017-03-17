        const N = "North";
        const S = "South";
        const E = "East";
        const W = "West";
        const NE = "NorthEast";
        const NW = "NorthWest";
        const SE = "SouthEast";
        const SW = "SouthWest";

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