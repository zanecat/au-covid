const {fs} = require('fs')
const { exec } = require("child_process")

const dataConsumer = (tweet) => {
    const tweetInfo = extractTweetInfo(tweet)
    const md = generateMdContent(tweetInfo)
    exec('git pull')
    const path = `/mds/${tweetInfo.region}`
    fs.writeFile(path, md, { flag: 'w' }, function (err) {
        if (err) throw err;
        console.log(path + " saved!");
        exec('git add .', () => {
            exec(`git commit -m "uploaded ${path}, ${Date.now().toLocaleString()}"`, () => {
                exec('git push')
            })
        })
    });

}

const extractTweetInfo = (tweet) => {
    const {data, includes, matching_rules} = tweet
    return {
        text: getText(data),
        imageUrl: getImageUrl(includes),
        region: getRegion(matching_rules),
    }
}

const getText = (data) => {
    return data?.text
}

const getImageUrl = (data) => {
    const {media} = data
    const image = media.find(
        m => {
            return m.type === 'photo'
        }
    )
    return image?.url
}

const getRegion = (data) => {
    const {tag} = data[0]
    return tag
}

const generateMdContent = (tweet) => {
    return `# ${tweet.region}\n${tweet.text}\n![image](${tweet.imageUrl})`
}

module.exports = {
    dataConsumer,
    getText,
    getImageUrl,
    getRegion,
    generateMdContent
}