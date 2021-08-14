const {dataConsumer, getImageUrl, getRegion, getText, generateMdContent} = require("../data-consumer");
const {test_tweet} = require('./fixture/valid-tweet');


describe("test dataConsumer", () => {
    it('should not fail with valid data', function () {
        dataConsumer(test_tweet)
        expect(1).toBe(1)
    });

    describe("test getText", () => {
        it("should get text from valid tweet", () => {
            const actual = getText(test_tweet.data)
            expect(actual).toBe('new cases')
        })

        it('should return undefined with null', function () {
            const actual = getText(null)
            expect(actual).toBe(undefined)
        });
    })

    describe("test getImageUrl", () => {
        it('should get url from valid tweet', function () {
            const actual = getImageUrl(test_tweet.includes)
            expect(actual).toBe('https://pbs.twimg.com/media/E8vcBKBUcAAtaM8.jpg')
        });
    })

    describe("test getRegion", () => {
        it('should get url from valid tweet', function () {
            const actual = getRegion(test_tweet.matching_rules)
            expect(actual).toBe('test')
        });
    })

    describe("test generateMdContent", () => {
        it('should generate from valid info', function () {
            const actual = generateMdContent({
                text: "text",
                imageUrl: "some url",
                region: "region"
            })
            expect(actual).toBe('# region\n' +
                'text\n' +
                '![image](some url)')
        });
    })
})

