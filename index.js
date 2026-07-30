require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const Groq = require("groq-sdk");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.get("/", (req, res) => {
  res.send("Discord Bot is running!");
});



const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});


client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content === "!clear") {
    const messages = await message.channel.messages.fetch({ limit: 100 });
    const botMessages = messages.filter((m) => m.author.id === client.user.id);
    for (const msg of botMessages.values()) {
      await msg.delete().catch(() => {});
    }
    return message.channel.send("Cleared my messages.").then((m) =>
      setTimeout(() => m.delete(), 3000)
    );
  }

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are a Discord AI bot created by Ali Hassan. When asked who you are, introduce yourself as that." },
        { role: "user", content: message.content },
      ],
      model: "llama-3.3-70b-versatile",
    });
    let reply = completion.choices[0]?.message?.content || "No response generated.";
    if (reply.length > 2000) reply = reply.slice(0, 1997) + "...";
    message.reply({ content: reply });
  } catch (error) {
    console.error(error);
    message.reply({
      content: "Sorry, I couldn't process that request.",
    });
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);

app.listen(PORT, () => {
  console.log(`Web server listening on ${PORT}`);
});