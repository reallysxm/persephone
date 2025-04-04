export default {
    name: "ping",
    description: "Check the bot's latency",
    usage: "<prefix>ping",
    execute(client, message) {
        const latency = Date.now() - message.createdTimestamp;
        message.reply(`Pong! 🏓 Latency is ${latency}ms`);
    },
};
