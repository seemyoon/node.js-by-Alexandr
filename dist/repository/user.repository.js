"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const user_model_1 = require("../models/user.model");
const token_model_1 = require("../models/token.model");
const user_list_order_by_enum_1 = require("../enums/user-list-order-by.enum");
const order_enum_1 = require("../enums/order.enum");
const customApiError_1 = require("../errors/customApiError");
class UserRepository {
    async getListUsers(query) {
        const filterObj = {};
        if (query.search)
            filterObj.name = { $regex: query.search, $options: "i" };
        const sortObj = {};
        if (query.order && query.orderBy) {
            switch (query.orderBy) {
                case user_list_order_by_enum_1.UserListOrderByEnum.AGE:
                    sortObj[user_list_order_by_enum_1.UserListOrderByEnum.AGE] = query.order === order_enum_1.OrderEnum.DESC ? -1 : 1;
                    break;
                case user_list_order_by_enum_1.UserListOrderByEnum.NAME:
                    sortObj[user_list_order_by_enum_1.UserListOrderByEnum.NAME] = query.order === order_enum_1.OrderEnum.DESC ? -1 : 1;
                    break;
                default:
                    throw new customApiError_1.ApiError("Invalid sorted type", 500);
            }
        }
        const skip = query.limit * (query.page - 1);
        return await Promise.all([user_model_1.User.find(filterObj).sort(sortObj).limit(query.limit).skip(skip),
            user_model_1.User.countDocuments(filterObj)
        ]);
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
