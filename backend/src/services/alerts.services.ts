import { Limit } from "../database/repository";
import { sendEmailTemplate } from "./aws.send.email";
import { Mail } from "./mail.service";

export class Alerts {
    static limits: any = {
        accX: {
            upperLimit: null,
            inferiorLimit: null,
        },
        accY: {
            upperLimit: null,
            inferiorLimit: null,
        },
        accZ: {
            upperLimit: null,
            inferiorLimit: null,
        },
        gyroX: {
            upperLimit: null,
            inferiorLimit: null,
        },
        gyroY: {
            upperLimit: null,
            inferiorLimit: null,
        },
        gyroZ: {
            upperLimit: null,
            inferiorLimit: null,
        },
    }

    static sendNotification = false;
    static notificationTimeOut = 0;
    static countAlerts = 0;

    static async getLimits() {
        const limitsList = await Limit.getLimits();

        limitsList.forEach((limit) => {
            Object.keys(this.limits).forEach((key) => {
                if (key === limit.name) {
                    this.limits[key].upperLimit = limit.upperLimit;
                    this.limits[key].inferiorLimit = limit.inferiorLimit;
                }
            })
        })
    }

    static async checkValuesAndSendAlerts(values: any) {
        await this.getLimits();
        Object.keys(values).forEach((key) => {
            for (const item of values[key]) {
                if (this.limits[key]?.upperLimit && item > this.limits[key]?.upperLimit) {
                    this.sendNotification = true;
                    this.countAlerts += 1;
                    break;
                }
                if (this.limits[key]?.lowerLimit && item < this.limits[key]?.lowerLimit) {
                    this.sendNotification = true;
                    this.countAlerts += 1;
                    break;
                }
            }
        });

        const notificationTime = new Date().getTime();
        if(this.sendNotification && notificationTime > this.notificationTimeOut) {
            this.notificationTimeOut = notificationTime + 60000;
            const emails = await Mail.getAll();
            if(emails.length !== 0) await sendEmailTemplate(emails);
        }

        this.countAlerts = 0;
        this.sendNotification = false;
    }
}