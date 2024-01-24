import UserModel, { User } from '../models/user';


class UserController {
    // Properties

    // Constructor
    constructor() {
    }

    public async createUser(user: User) {
        UserModel.create(user)
    }
}

export default new UserController();