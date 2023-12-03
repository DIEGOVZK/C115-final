import { GyroXLimitModel, GyroXPeaksModel, GyroYLimitModel, GyroYPeaksModel, GyroZLimitModel, GyroZPeaksModel } from "../models/gyro";

export class GyroX {
    static async setLimit(limits: object) {
        return await GyroXLimitModel.findOneAndUpdate(
            {},
            { $set: limits },
            { new: true, upsert: true },
        )
    }

    static async registerPeak(peak: number) {
        const newPeak = new GyroXPeaksModel({ peak })
        return await newPeak.save();
    }

    static async countDocuments(){
        const count = await GyroXPeaksModel.countDocuments({})
        return count;
    }
}

export class GyroY {
    static async setLimit(limits: object) {
        return await GyroYLimitModel.findOneAndUpdate(
            {},
            { $set: limits },
            { new: true, upsert: true },
        )
    }

    static async registerPeak(peak: number) {
        const newPeak = new GyroYPeaksModel({ peak })
        return await newPeak.save();
    }

    static async countDocuments(){
        const count = await GyroYPeaksModel.countDocuments({})
        return count;
    }
}

export class GyroZ {
    static async setLimit(limits: object) {
        return await GyroZLimitModel.findOneAndUpdate(
            {},
            { $set: limits },
            { new: true, upsert: true },
        )
    }

    static async registerPeak(peak: number) {
        const newPeak = new GyroZPeaksModel({ peak })
        return await newPeak.save();
    }

    static async countDocuments(){
        const count = await GyroZPeaksModel.countDocuments({})
        return count;
    }
}