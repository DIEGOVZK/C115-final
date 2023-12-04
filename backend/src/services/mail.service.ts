import { Email } from "../database/repository";
import { verifyEmailAWS } from "./aws.send.email";

export class Mail {
    static async register(email: string) {
        await verifyEmailAWS(email);
        await Email.register(email);
    }

    static async getAll() {
        const emails = await Email.getAll();
        return emails;
    }
}