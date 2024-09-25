import {EmailTypeEnum} from "../enums/email.enum";
import {PickRequired} from "./pick-required.type";
import {EmailPayloadCombined} from "./email-payload-combined";

export type EmailTypeToPayload = {
    [EmailTypeEnum.WELCOME]: PickRequired<EmailPayloadCombined, "name">
    [EmailTypeEnum.FORGOT_PASSWORD]: PickRequired<EmailPayloadCombined, "name" | "email">
    [EmailTypeEnum.OLD_VISIT]: PickRequired<EmailPayloadCombined, "email">
    [EmailTypeEnum.LOGOUT]: PickRequired<EmailPayloadCombined, "name">
}