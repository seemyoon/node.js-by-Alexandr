import {EmailTypeEnum} from "../enums/email.enum";
import {PickRequired} from "./pick-required.type";
import {EmailPayloadCombinedType} from "./email-payload-combined.type";

export type EmailTypeToPayload = {
    [EmailTypeEnum.WELCOME]: PickRequired<EmailPayloadCombinedType, "name" | "actionToken">
    [EmailTypeEnum.FORGOT_PASSWORD]: PickRequired<EmailPayloadCombinedType, "name" | "email" | "actionToken">
    [EmailTypeEnum.OLD_VISIT]: PickRequired<EmailPayloadCombinedType, "name">
    [EmailTypeEnum.LOGOUT]: PickRequired<EmailPayloadCombinedType, "name">
}