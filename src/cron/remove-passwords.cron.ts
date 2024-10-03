import {CronJob} from "cron";
import {timeHelper} from "../helpers/time.helper";
import {oldPasswordRepository} from "../repository/old-password.repository";

const handler = async () => {
    try {
        const date = timeHelper.subtractByParams(90, "days")
        const deleteCount = await oldPasswordRepository.deleteManyByParams(date)
        console.log(`Deleted ${deleteCount} old passwords`)
    } catch (error) {
        console.error(error)
    }
}
export const removeOldPasswords = new CronJob("* * * * * *", handler)