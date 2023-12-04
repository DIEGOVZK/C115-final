import { LimitModel } from "../models/limits";
import { EmailModel } from "../models/mail.list";
import { PeakModel } from "../models/peaks";

export class Limit {
    static async setLimit(limits: object, name: string) {
        return await LimitModel.findOneAndUpdate(
            { name },
            { $set: limits },
            { new: true, upsert: true },
        )
    }

    static async getLimits() {
        const limits = await LimitModel.find({});
        return limits;
    }
}
export class Alert {
    static async register(value: number, name: string) {
        const newPeak = new PeakModel({ value, name });
        return await newPeak.save();
    }

    static async countDocuments(name: any = null) {
        const filter = { name: name }
        if (!filter.name) {
            delete filter.name;
        }
        const count = await PeakModel.countDocuments(filter);
        return count;
    }
}

export class Email {
    static async register(email: string) {
        const newEmail = new EmailModel({ email });
        return await newEmail.save();
    }

    static async getAll() {
        const emailList = await EmailModel.find({});
        const emails = emailList.map((document) => document.email);
        return emails;
    }
}