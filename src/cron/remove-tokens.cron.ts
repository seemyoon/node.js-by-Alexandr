import {CronJob} from "cron";
import {timeHelper} from "../helpers/time.helper";
import {configs} from "../config/config";
import {tokenRepository} from "../repository/token.repository";

const handler = async ()=>{
    const {unit, value} = timeHelper.parseConfigString(configs.JWT_REFRESH_EXPIRATION)

    const date = timeHelper.subtractByParams(value, unit)
    const deleteCount = await tokenRepository.deleteBeforeDate(date)
    console.log(`Deleted ${deleteCount} old tokens`)
}

export const removeOldTokens = new CronJob("* * * * * *", handler)