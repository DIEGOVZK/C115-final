import { SESClient } from "@aws-sdk/client-ses";

const accessKey: any = process.env.AWS_ACCESS_KEY;
const secretAccessKey: any = process.env.SECRET_AWS_ACCESS_KEY_ID;

const sesClient = new SESClient({
    region: 'us-east-1',
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    }
});

export default sesClient;