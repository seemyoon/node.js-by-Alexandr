"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const user_model_1 = require("../models/user.model");
const token_model_1 = require("../models/token.model");
class UserRepository {
    async getListUsers() {
        return await user_model_1.User.find();
    }
    async create(dto) {
        return await user_model_1.User.create({ ...dto });
    }
    async getById(userId) {
        return await user_model_1.User.findById(userId).select("+password");
    }
    async getByEmail(email) {
        return await user_model_1.User.findOne({ email }).select("+password");
    }
    async updateById(userId, dto) {
        return await user_model_1.User.findByIdAndUpdate(userId, dto, { new: true });
    }
    async deleteById(userId) {
        await user_model_1.User.deleteOne({ _id: userId });
    }
    async findWithOutActivity(date) {
        return await user_model_1.User.aggregate([
            {
                $lookup: {
                    from: token_model_1.Token.collection.name,
                    let: { userId: "$_id" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_userId", "$$userId"] } } },
                        { $match: { createdAt: { $gt: date } } }
                    ],
                    as: "tokens"
                }
            },
            {
                $match: { tokens: { $size: 0 } }
            }
        ]);
    }
}
exports.userRepository = new UserRepository();
