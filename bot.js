const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")
const P = require("pino")

async function startBot() {

const { state, saveCreds } = await useMultiFileAuthState("auth")

const sock = makeWASocket({
logger: P({ level: "silent" }),
auth: state,
printQRInTerminal: true
})

sock.ev.on("creds.update", saveCreds)

sock.ev.on("connection.update", ({ connection }) => {

if (connection === "open") {
console.log("HAMO X BOT CONNECTED")
}

})

sock.ev.on("messages.upsert", async ({ messages }) => {

const msg = messages[0]
if (!msg.message) return

const text =
msg.message.conversation ||
msg.message.extendedTextMessage?.text ||
""

const from = msg.key.remoteJid

if (text === "الاوامر") {

await sock.sendMessage(from,{
text:`🔥 HAMO X AI BOT 🔥

📜 الاوامر

الاوامر
المطور
ping`
})

}

if (text === "المطور") {

await sock.sendMessage(from,{
text:`👑 المطور
HAMO`
})

}

if (text === "ping") {

await sock.sendMessage(from,{
text:`🏓 bot online`
})

}

})

}

startBot()
