import { UserEntity } from "../user.entity";
import { Request } from "express";

export interface AuthRequest extends Request {
    user: UserEntity;
}