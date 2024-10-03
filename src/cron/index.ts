// import {removeOldTokens} from "./remove-tokens.cron";
// import {removeOldPasswords} from "./remove-passwords.cron";
import {oldVisitorCronJob} from "./old-visitor.cron";

export const cronRunner = () =>{
    // removeOldTokens.start();
    // removeOldPasswords.start()
    oldVisitorCronJob.start()
}