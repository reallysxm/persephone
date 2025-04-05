export default {
    name: "ping",
    description: "Check the bot's latency",
    usage: "<prefix>ping",
    execute(client, message) {
        const latency = Date.now() - message.createdTimestamp;
        const apiLatency = Math.round(client.ws.ping);
        message.reply(`< / > | Latency: ${latency}ms\n< / > | API Latency: ${apiLatency}ms`);
    },
};
