import fs from "fs";
const DataFile = new URL("./../data/AdressIp.json", import.meta.url)
import encryptjs from "encryptjs";

const SecretKey = JSON.parse(fs.readFileSync(new URL("./../secret/encryptKey.json", import.meta.url)))

const SetNewIp = (ip, mailData) => {
    const data = JSON.parse(fs.readFileSync(DataFile))
    if (data && typeof data == "object" && Array.isArray(data)) {
        data.push({
            "IP": encryptjs.encrypt(toString(ip), SecretKey["key"], 256),
            "DataMail": {
                "mail": encryptjs.encrypt(mailData.mail, SecretKey["key"], 256),
                "name": encryptjs.encrypt(mailData.name, SecretKey["key"], 256),
                "message": encryptjs.encrypt(mailData.message, SecretKey["key"], 256),
            },
            "Date": Date.now().toString()
        })
    }
    fs.writeFileSync(DataFile, JSON.stringify(data))
}

const GetIp = (ip) => {
    const data = JSON.parse(fs.readFileSync(DataFile))
    if (data && typeof data == "object" && Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            const v = data[i];
            let value = encryptjs.decrypt(v["IP"], SecretKey["key"], 256)
            if (value && value == toString(ip)) {
                return {
                    "IP": value,
                    "DataMail": {
                        "mail": encryptjs.decrypt(v["DataMail"].mail, SecretKey["key"], 256),
                        "name": encryptjs.decrypt(v["DataMail"].name, SecretKey["key"], 256),
                        "message": encryptjs.decrypt(v["DataMail"].message, SecretKey["key"], 256),
                    },
                    "Date": v["Date"]
                }
            }
        }
    }
    return false
}

const DeletIp = (ip) => {
    const data = JSON.parse(fs.readFileSync(DataFile))
    if (data && typeof data == "object" && Array.isArray(data)) {
        const newData = data.filter(v => encryptjs.decrypt(v["IP"], SecretKey["key"], 256) != toString(ip))
        fs.writeFileSync(DataFile, JSON.stringify(newData))
    }
}


export default { GetIp, SetNewIp, DeletIp }