const test_tweet = {
    "data": {
        "attachments": {"media_keys": ["3_1426475619420762112"]},
        "id": "1426475624739135489",
        "text": "new cases"
    },
    "includes": {
        "media": [{
            "height": 230,
            "media_key": "3_1426475619420762112",
            "public_metrics": {},
            "type": "photo",
            "url": "https://pbs.twimg.com/media/E8vcBKBUcAAtaM8.jpg",
            "width": 224
        }]
    },
    "matching_rules": [{"id": 1426470871674150918, "tag": "test"}]
}

const vic_tweet = {
    "data": {
        "attachments": {"media_keys": ["3_1426475619420762112"]},
        "id": "1426475624739135489",
        "text": "new cases https://t.co/cFS8fxFhJU"
    },
    "includes": {
        "media": [{
            "height": 230,
            "media_key": "3_1426475619420762112",
            "public_metrics": {},
            "type": "photo",
            "url": "https://pbs.twimg.com/media/E8vcBKBUcAAtaM8.jpg",
            "width": 224
        }]
    },
    "matching_rules": [{"id": 1426470871674150918, "tag": "vic"}]
}

const nsw_tweet = {
    "data": {
        "attachments": {"media_keys": ["3_1426475619420762112"]},
        "id": "1426475624739135489",
        "text": "new cases https://t.co/cFS8fxFhJU"
    },
    "includes": {
        "media": [{
            "height": 230,
            "media_key": "3_1426475619420762112",
            "public_metrics": {},
            "type": "photo",
            "url": "https://pbs.twimg.com/media/E8vcBKBUcAAtaM8.jpg",
            "width": 224
        }]
    },
    "matching_rules": [{"id": 1426470871674150918, "tag": "nsw"}]
}

module.exports = { test_tweet, vic_tweet, nsw_tweet }