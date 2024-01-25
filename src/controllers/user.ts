import UserModel, { User } from '../models/user';
import authenticationService from '../services/authentication';
import { UserLoginObject } from '../types/objects/user';


class UserController {
    // Properties

    // Constructor
    constructor() {
    }

    public async createUser(user: User) {
        user.salt = await authenticationService.generateSalt();
        user.password = await authenticationService.hashPassword(user.password, user.salt)
        return UserModel.create(user)
    }

    public async loginUser(user: UserLoginObject) {

        const foundUser = await UserModel.findOne({ username: user.username })

        if (foundUser) {
            user.password = await authenticationService.hashPassword(user.password, foundUser.salt)

            if (authenticationService.verifyPassword(user.password, foundUser.password)) {
                return authenticationService.createJWT(foundUser.username)
            }
        }
        return null
    }
}

export default new UserController();