import 'dotenv/config'
import { SendTemplatedEmailCommand, VerifyEmailAddressCommand } from "@aws-sdk/client-ses";
import sesClient from './aws.mail.client'

export async function sendEmailTemplate(addresses: string[]) {
    try {
        const input = {
            Source: process.env.SOURCE_EMAIL,
            Destination: {
                ToAddresses: addresses,
            },

            ReturnPath: process.env.SOURCE_EMAIL,
            ConfigurationSetName: "my-first-configuration-set",
            Template: 'alert_template',
            TemplateData: "{\"data\": \"Teste\"}",
        };

        const command = new SendTemplatedEmailCommand(input);
        const response = await sesClient.send(command);
        return response;
    } catch (error) {
        console.log('Send Email Template Error', error)
    }
}

export async function verifyEmailAWS(email: string) {
    const input = {
        EmailAddress: email,
    };
    const command = new VerifyEmailAddressCommand(input);
    const response = await sesClient.send(command);
    return response;
}
