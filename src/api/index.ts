import axios from 'axios'
import { BACKEND_API } from '../config';
import AWS from 'aws-sdk'

AWS.config.update({
    accessKeyId: 'AKIAYBV2Y46UFUA55CQP',
    secretAccessKey: '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',
    region: 'eu-central-1'
})

const S3 = new AWS.S3();

// const keyId = S3.config.credentials?.accessKeyId
// const keyUrl = `https://spread-viz-bucket.s3.eu-central-1.amazonaws.com/${keyId}`
// console.log('S3', S3.getObject)
// console.log('keyUrl', keyUrl)
// var uri = new AmazonS3Uri(urlString);

// var bucketName = uri.Bucket;
// var key = uri.Key;

// American_Magpie_eod_profile.json
// Upland_Sandpiper_eod_profile.json

const getAmericanMagpie = async () => {
    return new Promise((resolve, reject) => {
        try {
            const bucketName = 'spread-viz-bucket'
            const objectKey = 'American_Magpie/American_Magpie_eod_profile.json'

            S3.getObject({
                Bucket: bucketName,
                Key: objectKey
            }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getArticLoon = async () => {
    return new Promise((resolve, reject) => {
        try {
            const bucketName = 'spread-viz-bucket'
            const objectKey = 'Artic_Loon/Artic_Loon_eod_profile.json'
            S3.getObject({
                Bucket: bucketName,
                Key: objectKey
            }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getBaldEagle = async () => {
    return new Promise((resolve, reject) => {
        try {
            const bucketName = 'spread-viz-bucket'
            const objectKey = 'Bald_Eagle/Bald_Eagle_eod_profile.json'
            S3.getObject({
                Bucket: bucketName,
                Key: objectKey
            }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getBlackFalcon = async () => {
    return new Promise((resolve, reject) => {
        try {
            const bucketName = 'spread-viz-bucket'
            const objectKey = 'Black_Falcon/Black_Falcon_eod_profile.json'
            S3.getObject({
                Bucket: bucketName,
                Key: objectKey
            }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getEmperorPenguin = async () => {
    return new Promise((resolve, reject) => {
        try {
            const bucketName = 'spread-viz-bucket'
            const objectKey = 'Emperor_Penguin/Emperor_Penguin_eod_profile.json'
            S3.getObject({
                Bucket: bucketName,
                Key: objectKey
            }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getHornedPuffin = async () => {
    return new Promise((resolve, reject) => {
        try {
            const bucketName = 'spread-viz-bucket'
            const objectKey = 'Horned_Puffin/Horned_Puffin_eod_profile.json'
            S3.getObject({
                Bucket: bucketName,
                Key: objectKey
            }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getUplandSandpiper = async () => {
    return new Promise((resolve, reject) => {
        try {
            const bucketName = 'spread-viz-bucket'
            const objectKey = 'Upland_Sandpiper/Upland_Sandpiper_eod_profile.json'
            S3.getObject({
                Bucket: bucketName,
                Key: objectKey
            }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        } catch (e) {
            reject(e)
        }
    })
}

const parseData = async (data: any) => {
    const tempPnl: any = []
    const tempDailyPnl: any = []
    const tempHeat: any = []
    const tempDate: any = []
    const decoder: any = new TextDecoder('utf-8');
    const reader = await decoder.decode(data.Body);
    const parseJson = JSON.parse(reader);

    for (let i = 0; i < parseJson.data.length; i++) {
        tempDailyPnl.push(parseJson.data[i][0])
        tempHeat.push(parseJson.data[i][1])
        tempPnl.push(parseJson.data[i][2])
        tempDate.push(parseJson.index[i])
    }
    return { parseJson, tempDailyPnl, tempHeat, tempPnl, tempDate }
}

const getDiscordAccountInfo = async (token_type: any, access_token: any) => {
    const result = await axios.get("https://discord.com/api/users/@me", {
        headers: {
            'Authorization': `${token_type} ${access_token}`
        }
    });
    return result;
}

const verifyMessage = async (data: any) => {
    const result = await axios.post(`${BACKEND_API}/client/verifyMessage`, {
        params: data
    })
    return result;
}

const walletRemove = async (data) => {
    const result = await axios.post(`${BACKEND_API}/client/walletRemove`, {
        params: data
    })
    return result.data;
}




export {
    getAmericanMagpie,
    getArticLoon,
    getBaldEagle,
    getBlackFalcon,
    getEmperorPenguin,
    getHornedPuffin,
    getUplandSandpiper,
    parseData,
    getDiscordAccountInfo,
    verifyMessage,
    walletRemove,
}