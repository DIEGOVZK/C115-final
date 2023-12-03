import { AccXLimitModel, AccXPeaksModel, AccYLimitModel, AccYPeaksModel, AccZLimitModel, AccZPeaksModel } from "../models/acc";

export class AccX {
    static async setLimit(limits: object) {
        return await AccXLimitModel.findOneAndUpdate(
            {},
            { $set: limits },
            { new: true, upsert: true },
        )
    }

    static async registerPeak(peak: number) {
        const newPeak = new AccXPeaksModel({ peak })
        return await newPeak.save();
    }

    static async countDocuments(){
        const count = await AccXPeaksModel.countDocuments({})
        return count;
    }
}

export class AccY {
    static async setLimit(limits: object) {
        return await AccYLimitModel.findOneAndUpdate(
            {},
            { $set: limits },
            { new: true, upsert: true },
        )
    }

    static async registerPeak(peak: number) {
        const newPeak = new AccYPeaksModel({ peak })
        return await newPeak.save();
    }

    static async countDocuments(){
        const count = await AccYPeaksModel.countDocuments({})
        return count;
    }
}

export class AccZ {
    static async setLimit(limits: object) {
        return await AccZLimitModel.findOneAndUpdate(
            {},
            { $set: limits },
            { new: true, upsert: true },
        )
    }

    static async registerPeak(peak: number) {
        const newPeak = new AccZPeaksModel({ peak })
        return await newPeak.save();
    }

    static async countDocuments(){
        const count = await AccZPeaksModel.countDocuments({})
        return count;
    }
}