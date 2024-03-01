import UserModel, { User } from '../models/user';
import authenticationService from '../services/authentication';
import { UserLoginObject } from '../types/objects/user';


class AuthenticationController {
    // Properties

    // Constructor
    constructor() {
    }

    /**
     * Attempts to register the user with the database and returns the user if it was successful
     * @param {User} user Attempts to create the user with the passed in password, username, and email.
     * @returns {UserModel}
     */
    public async createUser(user: User) {
        user.salt = await authenticationService.generateSalt();
        user.password = await authenticationService.hashPassword(user.password, user.salt)
        return UserModel.create(user)
    }

    /**
     * Attempts to login the user with the passed in username and password. 
     * @param {UserLoginObject} user The user contect passed in from the server we're trying to validate against. 
     * @returns {string}
     */
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

    /**
     * Validates the token passed in by request and returns the true if the user was found in the database/
     * @param {string} token The token we're trying to validate against the database. 
     * @returns {null}
     */
    public async validateToken(token: string) {
        const jwt = token.replace('Bearer ', '') as string
        const parsedJwt = authenticationService.returnParsedJwt(jwt)
        const foundUser = await UserModel.findOne({ username: parsedJwt.username, active: true })
        if (foundUser) {
            return
        }
        throw new Error("Token not valid")
    }
}

export default new AuthenticationController();