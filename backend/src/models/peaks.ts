import { Schema, model, Document } from 'mongoose';

interface Peaks extends Document {
    value: number;
    name: string;
}

const peakSchema = new Schema({
    value: { type: Number, required: true },
    name: { type: String, required: true },
});

export const PeakModel = model<Peaks>('Peaks', peakSchema);
