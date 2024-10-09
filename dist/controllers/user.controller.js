"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../service/user.service");
const user_presenter_1 = require("../presenters/user.presenter");
class UserController {
    async getList(req, res, next) {
        try {
            const query = req.query;
            const result = await user_service_1.userService.getListUsers(query);
            res.json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        try {
            const id = req.params.userId;
            const user = await user_service_1.userService.getById(id);
            const result = user_presenter_1.userPresenter.toPublicResDto(user);
            res.status(201).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getMe(req, res, next) {
        try {
            const jwtPayload = req.res.locals.jwtPayload;
            const user = await user_service_1.userService.getMe(jwtPayload);
            const result = user_presenter_1.userPresenter.toPublicResDto(user);
            res.json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async updateMe(req, res, next) {
        try {
            const jwtPayload = req.res.locals.jwtPayload;
            const dto = req.body;
            const user = await user_service_1.userService.updateMe(jwtPayload, dto);
            const result = user_presenter_1.userPresenter.toPublicResDto(user);
            res.status(201).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async deleteMe(req, res, next) {
        try {
            const jwtPayload = req.res.locals.jwtPayload;
            const result = await user_service_1.userService.deleteMe(jwtPayload);
            res.status(204).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async uploadAvatar(req, res, next) {
        try {
            const jwtPayload = req.res.locals.jwtPayload;
            const file = req.files.avatar;
            const user = await user_service_1.userService.uploadAvatar(jwtPayload, file);
            const result = user_presenter_1.userPresenter.toPublicResDto(user);
            res.status(204).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async deleteAvatar(req, res, next) {
        try {
            const jwtPayload = req.res.locals.jwtPayload;
            const result = await user_service_1.userService.deleteAvatar(jwtPayload);
            res.status(204).json(result);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.userController = new UserController();
