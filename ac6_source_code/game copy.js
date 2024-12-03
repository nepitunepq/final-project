class RoomUtil {
  static baseURL = "https://demo.mycourseville.com/act6";
  static roomApiURL = `${RoomUtil.baseURL}roomapi/`;
  static ROOMSIZE = { w: 800, h: 600 };
  static isReady = false;

  // It might be useful for the "players" object to be used for storing all the players in the room. The key could be the player's number and the value could be the Player object.
  static players = {};

  static getSecret() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("secret") || null;
  }
  static getPlayerNumber() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("player") || null;
  }

  static getInitAndStartGames(scene, myPlayer) {
    // Fetch the initial player look data from the server
    fetch(`${RoomUtil.roomApiURL}getplayerlook.php`, {
      method: "GET",
      headers: {
        "X-Secret": RoomUtil.getSecret(),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Let RoomUtil.initAllPlayers() handle the initialization of the players based on data.
        RoomUtil.initAllPlayers(scene, data, myPlayer);

        // For Part 3:
        //TODO : part 3 - please uncomment the the next line
        // Once we have the Player objects, we can start fetching the player position data from the server
        RoomUtil.fetchAllPlayersXY(scene, true);
      })
      .catch((error) =>
        console.error("Error fetching player look data:", error)
      );
  }

  static initAllPlayers(scene, data, myPlayer) {
    // - iterate through the data,
    // - instantiate the Player objects,
    // - and keep the references to all of the Playes objects in RoomUtil.players
    Object.keys(data).forEach((key) => {
      const playerData = data[key];
      let player = RoomUtil.players[key];
      if (!player) {
        //TODO : part 1.2 : fill in the blank
        // If player doesn't exist, **create a new Player object**
        // Also, for each Player object, you should **create the Phaser graphics object, add it to the scene, and keep the reference to the graphics object in the "visual" attribute of the object**.
        // The method initLookAndVisual() that has been partially created in the Player class should be useful.

        // original: player.initLookAndVisual(_______, _________);

        //end of par 1

        // Finally, **add the player to the RoomUtil.players**.
        // E.g.: RoomUtil.players[key] = player;

        //TODO : part 2.1 modify RoomUtil.players[key] = player; in if-else and comment both "RoomUtil.players[key] = _______; and player.__________________(_______, _________);"
        if (key.replace("p", "") == RoomUtil.getPlayerNumber()) {
          RoomUtil.players[key] = myPlayer;
          myPlayer.initLookAndVisual(scene, myPlayer);
        } else {
          let player = new Player(key);
          player.initLookAndVisual(scene, playerData);
          RoomUtil.players[key] = player;
        }
        //init look and visual of all players
        // RoomUtil.______________________________________________; // ?
      }
    });
    console.log("players", RoomUtil.players);
  }

  static fetchAllPlayersXY(scene, init = false) {
    // You do not have to complete this method until Part 3.
    // Learn from the fetch statement in getInitAndStartGames()
    // and implement a similar fetch statement to fetch the player position/target data from the server.
    // E.g.: fetch(`${RoomUtil.roomApiURL}getplayerxy.php`, ...
    // Once the position/target data is fetched, you can simply update the position/target data in each Player objects.
    //TODO : part 3
    fetch(`${RoomUtil.roomApiURL}getplayerxy.php`, {
      method: "GET",
      headers: {
        "X-Secret": RoomUtil.getSecret(),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        Object.keys(this.players).forEach((key) => {
          const playerData = data[key];
          let player = RoomUtil.players[key];
          if (!(player instanceof MyPlayer)) {
            if (init) {
              player.setPosition(+playerData.pos_x, +playerData.pos_y);
            }
            player.setTarget(+playerData.target_x, +playerData.target_y);
          }
        });
        console.log(`set pos and target of players`);
      })
      .catch(err => {
        console.error(`Error fetching player look data in fetchAllPlayersXY(): ${err}`);
      });
  }
}

class Player {
  // Represents a player in the game
  constructor(playerNumber) {
    this.playerNumber = playerNumber;
    this.look = null; // The look of the player. This is an object with shape and color properties
    this.visual = null; // The Phaser visual representation (graphics object) of the player

    //TODO : part 1.3  - please modify the next 2 lines.
    // this.posX = Math.floor(Math.random() * RoomUtil.ROOMSIZE.w);
    // this.posY = Math.floor(Math.random() * RoomUtil.ROOMSIZE.h);
    this.posX = 0;
    this.posY = 0;

    this.targetX = this.posX;
    this.targetY = this.posY;
  }

  //TODO : part 1.2 : complete initLookAndVisul
  initLookAndVisual(scene, look) {
    this.look = look;
    if (
      this.look &&
      (this.look.shape === "circle" || this.look.shape === "square")
    ) {
      // Create the visual representation based on the look
      if (this.look.shape === "circle") {
        this.visual = scene.add.circle(
          this.posX,
          this.posY,
          10, // guess
          Player.colorCode[this.look.color]
        );
      } else if (this.look.shape === "square") {
        this.visual = scene.add.rectangle(
          this.posX,
          this.posY,
          20, // guess
          20, // width, height
          Player.colorCode[this.look.color]
        );
      }
    } else {
      // The default look is a red circle.
      this.visual = scene.add.circle(this.posX, this.posY, 10, 0xff0000);
    }
  }

  static colorCode = {
    red: 0xff0000,
    green: 0x00ff00,
    blue: 0x0000ff,
    purple: 0xff00ff,
    yellow: 0xffff00,
  };

  setPosition(x, y) {
    this.posX = x;
    this.posY = y;
    // Might be a good idea to update the visual representation's position if it exists
    if (this.visual) {
      //TODO : part 1.2
      // original: this.visual.setPosition( ...
      this.visual.setPosition(this.posX, this.posY);
    }
  }

  setTarget(x, y) {
    this.targetX = x;
    this.targetY = y;
  }

  // Call this method every frame to smoothly update the player's position
  updatePlayerInRoom() {
    // Do something with the player's position
    // Update the visual representation's position if it exists
    //TODO : part 3
    if (this.visual) {
      // this.visual.setPosition( ...
      // Korn wrote:
      let distance = Phaser.Math.Distance.Between(
        this.posX,
        this.posY,
        this.targetX,
        this.targetY
      );

      //TODO : part 3
      if (distance > 1) {
        const angle = Phaser.Math.Angle.Between(
          this.posX,
          this.posY,
          this.targetX,
          this.targetY
        );
        //your code here ...
        let x = this.posX + Math.cos(angle) * 2;
        let y = this.posY + Math.sin(angle) * 2;
        this.setPosition(x, y);
      }
      //}
      //after you complete all part (part1-3) and you see that there are red player scattered, please back to part 1 and try to remove it
    }
  }
}

class MyPlayer extends Player {
  // Represents the player controlled by the current user
  constructor(secret, playerNumber) {
    super(playerNumber);
    this.secret = secret;
  }
  setTarget(x, y) {
    super.setTarget(x, y);
    this.updateMyselfToServer();
  }

  updateMyselfToServer() {
    // Send the new position to the server
    // fetch(`${RoomUtil.roomApiURL}update.php`, ...
    //TODO : part 2.3
    const roomApiURL = `${RoomUtil.roomApiURL}update.php`;
    fetch(roomApiURL, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Secret": secret,
      },
      body: `pos_x=${this.posX}&pos_y=${this.posY}&target_x=${this.targetX}&target_y=${this.targetY}`,
    });
  }

  initLookAndVisual(scene, look) {
    // Override the parent method so that your player has a thick black border.
    //TODO : part 2.2 set your look and setStrokeStyle Hint : similar to setTarget
    console.warn('initing self');
    super.initLookAndVisual(scene, look);

    // this.visual = 
    // if (this.graphics) {
    this.visual.setStrokeStyle(4, 0x000000);
    console.warn('inited self');
    // }
  }
}

// Start the app logic
let game, myPlayer, lastFetchTime, fetchInterval;
let secret = RoomUtil.getSecret();
let playerNumber = RoomUtil.getPlayerNumber();
if (!secret) {
  alert("No secret provided.");
} else if (!playerNumber) {
  alert("No player number provided.");
} else {
  let config = {
    type: Phaser.AUTO,
    width: RoomUtil.ROOMSIZE.w,
    height: RoomUtil.ROOMSIZE.h,
    parent: "gameContainer",
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };
  game = new Phaser.Game(config);
  myPlayer = new MyPlayer(RoomUtil.getSecret(), RoomUtil.getPlayerNumber());
  lastFetchTime = 0;
  fetchInterval = 5000; // Fetch data every 5 seconds
}

function preload() {
  this.load.image("background", "assets/gridbg.png");
}

function create() {
  // Adding the background image
  this.add.image(
    RoomUtil.ROOMSIZE.w / 2,
    RoomUtil.ROOMSIZE.h / 2,
    "background"
  );

  // This is just to make sure that Phaser is working
  //
  // removed lol
  //
  // this.add.text(50, 50, `Room Server : ${RoomUtil.roomApiURL}`, {
  //   font: "12px Courier",
  //   fill: "#000000",
  // });

  this.lastFetchTime = 0; // Reset timer on scene creation

  this.input.on(
    "pointerdown",
    function (pointer) {
      // Set the target for the player to move to
      // myPlayer.setTarget(...
      //TODO : part 2.3 (DONE)
      myPlayer.setTarget(pointer.x, pointer.y);
    },
    this
  );

  RoomUtil.getInitAndStartGames(this, myPlayer);

  //TODO : part 2.3 ; Is RoomUtil ready ?
  // omsin added the following line
  RoomUtil.isReady = true;
}

function update(time, delta) {
  //TODO : part 2.3 - complete all
  if (RoomUtil.isReady) {
    const angle = Phaser.Math.Angle.Between(
      myPlayer.posX,
      myPlayer.posY,
      myPlayer.targetX,
      myPlayer.targetY
    );
    if (
      Math.abs(myPlayer.posX - myPlayer.targetX) > Math.abs(Math.cos(angle) * 2)
    )
      myPlayer.posX += Math.cos(angle) * 2;
    else myPlayer.posX = myPlayer.targetX;
    if (
      Math.abs(myPlayer.posY - myPlayer.targetY) > Math.abs(Math.sin(angle) * 2)
    )
      myPlayer.posY += Math.sin(angle) * 2;
    else myPlayer.posY = myPlayer.targetY;

    myPlayer.updatePlayerInRoom();
    Object.values(RoomUtil.players).forEach((player) => {
      // player.setPosition(player.posX, player.posY);
      player.updatePlayerInRoom();
      // console.log('updating one player');
      // Update each player for smooth movement
      //set the position of each player
    });

    // Check if it's time to fetch new data
    this.lastFetchTime += delta;
    if (this.lastFetchTime >= fetchInterval) {
      this.lastFetchTime = 0;

      // Fetch the current player data from the server
      RoomUtil.fetchAllPlayersXY(this);
    }
  }
}
