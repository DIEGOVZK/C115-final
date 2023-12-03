import { Schema, model, Document } from 'mongoose';

// GYROX

interface GyroXLimit extends Document {
    upperLimit: number;
    inferiorLimit: number;
}

const gyroXLimitSchema = new Schema({
    upperLimit: { type: Number, required: true },
    inferiorLimit: { type: Number, required: true },
});

export const GyroXLimitModel = model<GyroXLimit>('GyroXLimit', gyroXLimitSchema);


interface GyroXPeaks extends Document {
    peak: number;
}

const gyroXPeaksSchema = new Schema({
    peak: { type: Number, required: true },
});

export const GyroXPeaksModel = model<GyroXPeaks>('GyroXPeaks', gyroXPeaksSchema);

// GYROY

interface GyroYLimit extends Document {
    upperLimit: number;
    inferiorLimit: number;
}

const gyroYLimitSchema = new Schema({
    upperLimit: { type: Number, required: true },
    inferiorLimit: { type: Number, required: true },
});

export const GyroYLimitModel = model<GyroYLimit>('GyroYLimit', gyroYLimitSchema);


interface GyroYPeaks extends Document {
    peak: number;
}

const gyroYPeaksSchema = new Schema({
    peak: { type: Number, required: true },
});

export const GyroYPeaksModel = model<GyroYPeaks>('GyroYPeaks', gyroYPeaksSchema);

// GYROZ

interface GyroZLimit extends Document {
    upperLimit: number;
    inferiorLimit: number;
}

const gyroZLimitSchema = new Schema({
    upperLimit: { type: Number, required: true },
    inferiorLimit: { type: Number, required: true },
});

export const GyroZLimitModel = model<GyroZLimit>('GyroZLimit', gyroZLimitSchema);


interface GyroZPeaks extends Document {
    peak: number;
}

const gyroZPeaksSchema = new Schema({
    peak: { type: Number, required: true },
});

export const GyroZPeaksModel = model<GyroZPeaks>('GyroZPeaks', gyroZPeaksSchema);