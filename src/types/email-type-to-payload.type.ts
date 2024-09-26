import {EmailTypeEnum} from "../enums/email.enum";
import {PickRequired} from "./pick-required.type";
import {EmailPayloadCombinedType} from "./email-payload-combined.type";

export type EmailTypeToPayload = {
    [EmailTypeEnum.WELCOME]: PickRequired<EmailPayloadCombinedType, "name" | "verify">
    [EmailTypeEnum.FORGOT_PASSWORD]: PickRequired<EmailPayloadCombinedType, "name" | "email" | "actionToken">
    [EmailTypeEnum.OLD_VISIT]: PickRequired<EmailPayloadCombinedType, "email">
    [EmailTypeEnum.LOGOUT]: PickRequired<EmailPayloadCombinedType, "name">
}