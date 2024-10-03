import {CronJob} from "cron";
import {timeHelper} from "../helpers/time.helper";
import {userRepository} from "../repository/user.repository";
import {emailService} from "../service/email.service";
import {EmailTypeEnum} from "../enums/email.enum";

const handler = async () => {
    try {
        const date = timeHelper.subtractByParams(7, "days")
        const usersActivity = await userRepository.findWithOutActivity(date)
        await Promise.all(usersActivity.map(async (userActivity) => {
            await emailService.sendMail(userActivity.email, EmailTypeEnum.OLD_VISIT, {name: userActivity.name})
         }))
        console.log(`Sent ${usersActivity.length} old-visits email`)
    } catch (error) {
        console.error(error)
    }
}
export const oldVisitorCronJob = new CronJob("* * * * * *", handler)