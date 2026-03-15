const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys")
const P = require("pino")

async function startBot(){

const { state, saveCreds } = await useMultiFileAuthState("session")

const sock = makeWASocket({
logger: P({ level: "silent" }),
auth: state
})

sock.ev.on("creds.update", saveCreds)

sock.ev.on("connection.update", (update) => {

const { connection, qr } = update

if(qr){
console.log("امسح الكود ده من واتساب:")
console.log(qr)
}

if(connection === "open"){
console.log("HAMO X BOT CONNECTED")
}

})

sock.ev.on("messages.upsert", async ({ messages }) => {

const msg = messages[0]
if(!msg.message) return

const text =
msg.message.conversation ||
msg.message.extendedTextMessage?.text

const from = msg.key.remoteJid

if(text === "الاوامر"){
await sock.sendMessage(from,{
text:`🔥 HAMO X BOT 🔥

📜 الاوامر

الاوامر
المطور
ping
`
})
}

if(text === "ping"){
await sock.sendMessage(from,{ text:"🏓 البوت شغال" })
}

if(text === "المطور"){
await sock.sendMessage(from,{ text:"👑 المطور HAMO" })
}

})

}

startBot()
