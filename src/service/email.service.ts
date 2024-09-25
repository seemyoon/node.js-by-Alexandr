import nodemailer, {Transporter} from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport";
import {ApiError} from "../errors/customApiError";
import {EmailTypeEnum} from "../enums/email.enum";
import hbs from "nodemailer-express-handlebars"
import path from "node:path";
import {configs} from "../config/config";
import {emailConstants} from "../constants/email.constants";
import {EmailTypeToPayload} from "../types/email-type-to-payload.type";


class EmailService {
    private transporter: Transporter<SMTPTransport.SentMessageInfo>

    constructor() {
        this.transporter = nodemailer.createTransport({
            from: "No reply",
            service: "gmail",
            auth: {
                user: configs.SMTP_EMAIL,
                pass: configs.SMTP_PASSWORD,
            }
        })
        const hbsOptions = {
            viewEngine: {
                extname: ".hbs",
                defaultLayout: "main",
                partialsDir: path.join(process.cwd(), "src", "templates", "partials"),
                layoutsDir: path.join(process.cwd(), "src", "templates", "layouts"),
            },
            viewPath: path.join(process.cwd(), "src", "templates", "views"),
            extName: ".hbs",
        }
        this.transporter.use("compile", hbs(hbsOptions))

    }

    public async sendMail<T extends EmailTypeEnum>(
        to: string,
        type: T,
        context: EmailTypeToPayload[T]): Promise<void> {
        try {
            const {subject, template} = emailConstants[type]
            context["frontUrl"] = configs.APP_FRONT_URL;

            const mailOptions = {
                to,
                subject,
                template,
                context
            }
            await this.transporter.sendMail(mailOptions)
        } catch (error) {
            throw new ApiError(error.message, error.status)
        }
    }
}

export const emailService = new EmailService();


