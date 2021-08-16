const fs = require('fs')
const {exec} = require("child_process")

const dataConsumer = async (tweet) => {
    console.log('got tweet')
    console.log(tweet)

    const dateString = new Date(Date.now()).toLocaleDateString()
    const tweetInfo = extractTweetInfo(tweet)
    tweetInfo.date = dateString

    const md = generateMdContent(tweetInfo)
    console.log("md: " + md)

    await exec('git pull', (err) => {
        console.log(err)
    })
    console.log('git pulling...')

    const dirPath = 'mds'
    await exec('mkdir -p ' + dirPath)

    const path = `mds/${tweetInfo.region}.md`
    await exec(`chmod +x ${dirPath}`)

    await exec(`echo "${md}" > ${path}`, (err) => {
        console.log(err)
        console.log('echo done')
    })

    console.log('git commit changes')
    await exec('git add .', (err) => {
        console.log(err)

    })

    await exec(`git commit -m "uploaded ${path}, ${dateString}"`, (err) => {
        console.log(err)
    })

    await exec('git push')
    console.log('pushed')


    // exec('git pull', () => {
    //     console.log("pull")
    //     const dirPath = 'mds'
    //     exec('mkdir -p '+dirPath)
    //     console.log('mkdir')
    //     const path = `mds/${tweetInfo.region}.md`
    //     exec(`chmod +x ${dirPath}`)
    //     exec(`echo "${md}" > ${path}`, (err) => {
    //         console.log(err)
    //         console.log('echo')
    //         exec('git add .', (err) => {
    //             console.log(err)
    //             exec(`git commit -m "uploaded ${path}, ${dateString}"`, (err) => {
    //                 console.log(err)
    //                 exec('git push')
    //                 console.log('pushed')
    //             })
    //         })
    //     })
    // })
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
    return `\n\n# ${tweet.region}\n### ${tweet.date}\n${tweet.text}\n\n![image](${tweet.imageUrl})`
}

module.exports = {
    dataConsumer,
    getText,
    getImageUrl,
    getRegion,
    generateMdContent
}