import { Schema, model, Document } from 'mongoose';

interface Limits extends Document {
    upperLimit: number;
    inferiorLimit: number;
    name: string;
}

const limitSchema = new Schema({
    upperLimit: { type: Number, required: true },
    inferiorLimit: { type: Number, required: true },
    name: { type: String, required: true },
});

export const LimitModel = model<Limits>('Limits', limitSchema);
