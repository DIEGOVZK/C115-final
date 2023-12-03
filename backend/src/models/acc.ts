import { Schema, model, Document } from 'mongoose';

// ACCX

interface AccXLimit extends Document {
    upperLimit: number;
    inferiorLimit: number;
}

const accXLimitSchema = new Schema({
    upperLimit: { type: Number, required: true },
    inferiorLimit: { type: Number, required: true },
});

export const AccXLimitModel = model<AccXLimit>('AccXLimit', accXLimitSchema);


interface AccXPeaks extends Document {
    peak: number;
}

const accXPeaksSchema = new Schema({
    peak: { type: Number, required: true },
});

export const AccXPeaksModel = model<AccXPeaks>('AccXPeaks', accXPeaksSchema);

// ACCY

interface AccYLimit extends Document {
    upperLimit: number;
    inferiorLimit: number;
}

const accYLimitSchema = new Schema({
    upperLimit: { type: Number, required: true },
    inferiorLimit: { type: Number, required: true },
});

export const AccYLimitModel = model<AccYLimit>('AccYLimit', accYLimitSchema);


interface AccYPeaks extends Document {
    peak: number;
}

const accYPeaksSchema = new Schema({
    peak: { type: Number, required: true },
});

export const AccYPeaksModel = model<AccYPeaks>('AccYPeaks', accYPeaksSchema);

// ACCZ

interface AccZLimit extends Document {
    upperLimit: number;
    inferiorLimit: number;
}

const accZLimitSchema = new Schema({
    upperLimit: { type: Number, required: true },
    inferiorLimit: { type: Number, required: true },
});

export const AccZLimitModel = model<AccZLimit>('AccZLimit', accZLimitSchema);


interface AccZPeaks extends Document {
    peak: number;
}

const accZPeaksSchema = new Schema({
    peak: { type: Number, required: true },
});

export const AccZPeaksModel = model<AccZPeaks>('AccZPeaks', accZPeaksSchema);