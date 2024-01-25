import { User } from "../../models/user";
import { UserLoginObject } from "../objects/user";

export interface CreateUserRequest {
  body: User
}

export interface LoginRequest {
  body: UserLoginObject
}