// First we require the Discord.js library.
const Discord = require("discord.js");

// Now we require the module.
const DIL = require("discord.js-image-logger");

// Start a new Discord Client.
const client = new Discord.Client();
// Start the module with some custom options.
DIL(client, {
  method: "embed", // can be "embed" "link" or "image"
  logChannel: "746192045089226828",
  channels: []
})

// Login the Client
client.login("NzQ2MTg4ODgxMzE3MTk5OTEy.Xz8sjA.XeZVYug05SVwUB9SVWlGVmbEHy4");