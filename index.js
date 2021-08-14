const Twitter = require('twitter-v2');
const {streamFactory} = require("./services/stream-factory.js");
const {dataConsumer} = require("./services/data-consumer.js");

const TOKEN = process.env.TWITTER_TOKEN

if (TOKEN === '') {
    console.error("Please provide a twitter TOKEN")
}

const client = new Twitter({
    bearer_token: TOKEN,
});

async function listenForever(streamFactory, dataConsumer) {
    try {
        for await (const data of streamFactory(client)) {
            dataConsumer(data);
        }
        // The stream has been closed by Twitter. It is usually safe to reconnect.
        console.log('Stream disconnected healthily. Reconnecting.');
        listenForever(streamFactory, dataConsumer);
    } catch (error) {
        // An error occurred so we reconnect to the stream. Note that we should
        // probably have retry logic here to prevent reconnection after a number of
        // closely timed failures (may indicate a problem that is not downstream).
        console.warn('Stream disconnected with error. Retrying.', error);
        listenForever(streamFactory, dataConsumer);
    }
}

listenForever(streamFactory, dataConsumer);