require("dotenv").config();
require("ffmpeg-static");
const Discord = require("discord.js");
const { execute, stop, skip } = require("./src/commands");
const http = require("http");
http
  .createServer((req, res) => {})
  .listen(process.env.PORT || 3000, () => {
    console.log("I'm Ready!");
  });

console.log("Rodando o BOTZÂO da massa!");

const client = new Discord.Client({
  partials: ["MESSAGE"],
});

const prefix = "@";

client.on("ready", () => {
  console.log("The bot is ready");
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();

  if (command === "test") {
    message.reply(`Ta testando oque mermão`);
  }

  if (command === "play") {
    if (args.length === 0) {
      message.channel.send("Tu quer que eu adivinhe o link?");
      return;
    }

    if (!message.member.voice.channel) {
      message.channel.send("Cara, tu precisa ta num canal de voz, ta ligado?");
      return;
    }

    execute(message, args[0]);
    return;
  }

  if (command === "stop") {
    stop(message);
    return;
  }

  if (command === "skip") {
    skip(message);
    return;
  }

  if (command === "help") {
    message.channel.send("Onde está seu deus agora? Ligue suporte ACME!!!");
    return;
  }
});
client.login(process.env.BOT_TOKEN);
