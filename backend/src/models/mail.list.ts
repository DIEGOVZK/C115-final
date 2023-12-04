import { Schema, model, Document } from 'mongoose';

interface Emails extends Document {
    email: string;
}

const emailSchema = new Schema({
    email: { type: String, required: true },
});

export const EmailModel = model<Emails>('Emails', emailSchema);
