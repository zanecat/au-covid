const streamUrl = "tweets/search/stream?expansions=attachments.media_keys&media.fields=url"

const streamFactory = (client) => {
    return client.stream(streamUrl)
}

module.exports = { streamFactory }