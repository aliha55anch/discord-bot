# Discord AI Bot

A Discord bot powered by **Groq AI (Llama 3.3 70B)** that responds to any message intelligently. Created by Ali Hassan.

## Features

- AI-powered replies using Groq's free Llama 3.3 70B model
- `!clear` — deletes the bot's recent messages in the channel
- Responses are automatically truncated to fit Discord's 2000 character limit

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- A Discord account and a server where you can add bots
- A Groq API key (free)

## Setup Guide

### 1. Get a Groq API Key

1. Go to https://console.groq.com/keys
2. Sign in (or create a free account)
3. Click **Create API Key**, give it a name, and copy the key

### 2. Create a Discord Bot

1. Go to https://discord.com/developers/applications
2. Click **New Application**, give it a name, and create it
3. Go to the **Bot** tab on the left
4. Click **Reset Token** and copy the token
5. Under **Privileged Gateway Intents**, enable:
   - **Message Content Intent**
   - **Server Members Intent** (optional)
6. Go to the **OAuth2 > URL Generator** tab
7. Select **bot** under Scopes
8. Select these permissions under Bot Permissions:
   - **Send Messages**
   - **Read Message History**
   - **Manage Messages** (for !clear)
9. Copy the generated URL, open it in your browser, and add the bot to your server

### 3. Clone & Install

```
git clone <your-repo-url>
cd DiscordBot
npm install
```

### 4. Configure Environment

Open `.env` in the project folder and add your keys:

```
GROQ_API_KEY=gsk_your_groq_api_key_here
DISCORD_BOT_TOKEN=your_discord_bot_token_here
```

### 5. Run the Bot

```
npm start
```

You should see the bot come online in your Discord server.

## Commands

| Command | Description |
|---------|-------------|
| Any message | The AI responds intelligently based on the message |

## How It Works

- The bot listens to every message in channels it has access to
- It sends the message content to **Groq's Llama 3.3 70B** model along with a system prompt
- The AI response is sent back to the channel
- If the response exceeds 2000 characters, it's truncated to fit Discord's limit

## Customization

- **Change the AI model**: In `index.js`, replace `llama-3.3-70b-versatile` with any Groq-supported model like `mixtral-8x7b-32768`, `gemma2-9b-it`, or `llama-3.1-8b-instant`
- **Change the bot's personality**: Edit the `system` message in `index.js` to change how the bot introduces itself and behaves

## Tech Stack

- **Node.js** — JavaScript runtime
- **discord.js v14** — Discord API library
- **Groq SDK** — AI inference API client
- **dotenv** — environment variable management

### Developed by **Muhammad Ali Hassan**

*If you found this project useful, please consider giving it a* :star:

**Thank you for visiting!**