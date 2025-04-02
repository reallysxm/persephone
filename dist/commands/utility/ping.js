export default {
    name: "ping",
    execute(client, message) {
        const latency = Date.now() - message.createdTimestamp;
        message.reply(`Pong! 🏓 Latency is ${latency}ms`);
    },
};
