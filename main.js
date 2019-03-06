//all vars
var username;
var summary;

var character = ["maxwell is ⚡ powerful!", "maxwell is 👹 satanic!", "maxwell is 🍀 lucky!", "maxwell is 🍖 hungry!", "maxwell is 💄 beautiful!", "maxwell is 💎 rich!"]
var randomItem = character[Math.floor(Math.random()*character.length)];

var background = [9249765321, 9325973898, 9256908780, 8751186956]
var randomBG = background[Math.floor(Math.random()*background.length)];

var x = ["heavymaxwell", "rudemaxwell", "powerfulmaxwell", "luckymaxwell"]
var randomURL = x[Math.floor(Math.random()*x.length)];

var SteamUser = require('steam-user');
var SteamCommunity = require('steamcommunity');
var SteamTotp = require('steam-totp');
var fs = require('fs');

var TradeOfferManager = require('steam-tradeoffer-manager');
var client = new SteamUser();
var firstCommunity = new SteamCommunity();
var manager = new TradeOfferManager();
var config = JSON.parse(fs.readFileSync('./config.json'));


var firstLogonOptions = {
   "accountName": config.bots.firstaccount.username,
   "password": config.bots.firstaccount.password,
   

};

//code start
client.logOn(firstLogonOptions);



client.on('loggedOn', () => {
   console.log('Logged In!');
   client.setPersona(SteamUser.EPersonaState.Online);
   client.gamesPlayed(["🎁🎈🍧🌳💛🐊🌏👳👹👃💎🌂⛳🎫😺🔋🌸🍆📒🥗🎈🚕", 444200, 730]);
   setTimeout(function(){ client.gamesPlayed(["👑🏓🎄💙👃🐝🌋👔💚🎍💗🎫⚡🍖🥞🚘🌳🌋📗🐟😺🥗", 444200, 730]); }, 300000)

   
}); 

client.on('webSession', (sessionid, cookies) => {
firstCommunity.setCookies(cookies);
setupProfile(randomItem);
});


//autoaccept
client.on('friendRelationship', (steamid, relationship) => {
  if (relationship === 2) {
    client.addFriend(steamid);
    client.chatMessage(steamid, 'Hello 💛, thanks for adding me 🌸! You can type "help", if you want some commands.');
  }
});

//donations
manager.on('newOffer', offer => {
  if (offer.itemsToGive.length === 0) {
    offer.accept((err, status) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`accepted a trade :  Status: ${status}.`);
      }
    });
  } else {
    offer.decline(err => {
      if (err) {
        console.log(err);
      } else {
        console.log(`declined a trade : Status: ${status}`);
      }
    });
  }
});



//commands
client.on("friendMessage", function(steamID, message) {
if (message == "help") {
client.chatMessage(steamID, "🍭| Commands Overview & More|🍭");
client.chatMessage(steamID, "🍭| dev | trading | idling |🍭")

}
});

client.on("friendMessage", function(steamID, message){
  if(message == "dev"){
    client.chatMessage(steamID, "My main developer is maxwell 🥇, aka. Johannes Dietze. 🎫");
  }
});

client.on("friendMessage", function(steamID, message){
  if(message == "trading"){
    client.chatMessage(steamID, "I accept every single trade, except for those who wants to take my items.");
  }
});

client.on("friendMessage", function(steamID, message){
  if(message == "idling"){
    client.chatMessage(steamID, "I idle all the time. If I dont idle, im dead. 👽");
  }
});
//setup profile function
function setupProfile(username) {
    firstCommunity.editProfile({
        'name'    : username,
        "background" : randomBG, 
        "customURL"  : randomURL,
    }, function(err) {
        if (err) {
            console.log('Failed to Edit Profile');
            console.log(err);
        }
    });
}












