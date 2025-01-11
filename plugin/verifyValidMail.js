import APC from "./adressIp.js" 
import stringSimilarity from "string-similarity"

const VerifyMailData = (ip, mailData) => {
    const getIp = APC.GetIp(ip)    
    if (getIp) {
        const date = Date.now()                
        if (((date - Number(getIp["Date"]))/60) >= 100) {
            if (
                stringSimilarity.compareTwoStrings(mailData["name"], getIp["DataMail"]["name"]) <= .3
                &&
                stringSimilarity.compareTwoStrings(mailData["mail"], getIp["DataMail"]["mail"]) <= .9
                &&
                stringSimilarity.compareTwoStrings(mailData["message"], getIp["DataMail"]["message"]) <= .6
            ) {
                APC.DeletIp(ip)
                APC.SetNewIp(ip, mailData);
                return true
            }
        }
        return false
    }
    APC.SetNewIp(ip, mailData);
    return true
}

export default VerifyMailData