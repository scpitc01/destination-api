import authenticationService from '../../src/services/authentication'
import UserModel from '../../src/models/user';
import authenticationController from '../../src/controllers/authentication'
import jwt, { JwtPayload } from "jsonwebtoken"
import { resolve } from 'path';


describe('Authentication Controller', () => {
    const AuthenticationController = authenticationController

    it('createUser should create a user and return the model.', async () => {

        const saltAsyncMethod = jest.fn().mockResolvedValue('Test Salt');
        const serviceGenerateSalt = jest.spyOn(authenticationService, 'generateSalt').mockImplementation(saltAsyncMethod);
        const hashPasswordAsyncMethod = jest.fn().mockResolvedValue('Hashed Password');
        const serviceHashPassword = jest.spyOn(authenticationService, 'hashPassword').mockImplementation(hashPasswordAsyncMethod);
        const createUserAsyncMethod = jest.fn().mockResolvedValue({ username: 'TestUser', password: 'hashPassword' });
        const serviceCreateUser = jest.spyOn(UserModel, 'create').mockImplementation(createUserAsyncMethod);

        const user = await AuthenticationController.createUser({ username: 'TestUser', password: 'TestPassword', email: 'Teset', active: false, salt: 'TestSalt' })
        expect(user).toBeDefined()
        expect(serviceGenerateSalt).toHaveBeenCalled()
        expect(serviceHashPassword).toHaveBeenCalled()
        expect(serviceCreateUser).toHaveBeenCalled()
    })

    it('loginUser should fail with no found user', async () => {
        const findUserAsyncMethod = jest.fn().mockResolvedValue(null);
        const serviceFindUser = jest.spyOn(UserModel, 'findOne').mockImplementation(findUserAsyncMethod);

        const user = await AuthenticationController.loginUser({ username: 'TestUser', password: 'TestPassword' })
        expect(serviceFindUser).toHaveBeenCalled()
        expect(user).toBe(null)
    })

    it('loginUser should fail unable to verify the password.', async () => {
        const findUserAsyncMethod = jest.fn().mockResolvedValue({ username: 'TestUser', password: 'TestPassword', salt: 'TestSalt' });
        const serviceFindUser = jest.spyOn(UserModel, 'findOne').mockImplementation(findUserAsyncMethod);
        const hashPasswordAsyncMethod = jest.fn().mockResolvedValue('Hashed Password');
        const serviceHashPassword = jest.spyOn(authenticationService, 'hashPassword').mockImplementation(hashPasswordAsyncMethod);
        const verifyPasswordMethod = jest.fn().mockReturnValue(false)
        const serviceVerifyPassword = jest.spyOn(authenticationService, 'verifyPassword').mockImplementation(verifyPasswordMethod);

        const user = await AuthenticationController.loginUser({ username: 'TestUser', password: 'TestPassword' })

        expect(serviceFindUser).toHaveBeenCalled()
        expect(serviceHashPassword).toHaveBeenCalled()
        expect(serviceVerifyPassword).toHaveBeenCalled()
        expect(user).toBe(null)
    })

    it('loginUser should succeed.', async () => {
        const findUserAsyncMethod = jest.fn().mockResolvedValue({ username: 'TestUser', password: 'TestPassword', salt: 'TestSalt' });
        const serviceFindUser = jest.spyOn(UserModel, 'findOne').mockImplementation(findUserAsyncMethod);
        const hashPasswordAsyncMethod = jest.fn().mockResolvedValue('Hashed Password');
        const serviceHashPassword = jest.spyOn(authenticationService, 'hashPassword').mockImplementation(hashPasswordAsyncMethod);
        const verifyPasswordMethod = jest.fn().mockReturnValue(true)
        const serviceVerifyPassword = jest.spyOn(authenticationService, 'verifyPassword').mockImplementation(verifyPasswordMethod);
        const createJwtAsyncMethod = jest.fn().mockResolvedValue('TestValue');
        const serviceCreateJwt = jest.spyOn(authenticationService, 'createJWT').mockImplementation(createJwtAsyncMethod);

        const user = await AuthenticationController.loginUser({ username: 'TestUser', password: 'TestPassword' })

        expect(serviceFindUser).toHaveBeenCalled()
        expect(serviceHashPassword).toHaveBeenCalled()
        expect(serviceVerifyPassword).toHaveBeenCalled()
        expect(serviceCreateJwt).toHaveBeenCalled()
        expect(user).toBe('TestValue')
    })

    it('validateToken should fail with no found user', async () => {

        const findUserAsyncMethod = jest.fn().mockResolvedValue(null);
        const serviceFindUser = jest.spyOn(UserModel, 'findOne').mockImplementation(findUserAsyncMethod);
        const parsedJwtAsyncMethod = jest.fn().mockResolvedValue({ username: 'Test User' });
        const serviceParsedJwt = jest.spyOn(authenticationService, 'returnParsedJwt').mockImplementation(parsedJwtAsyncMethod);

        try {
            await AuthenticationController.validateToken('Bearer TestToken')
        }
        catch (err) {
            expect(err).toBeDefined()
            expect(serviceFindUser).toHaveBeenCalled()
            expect(serviceParsedJwt).toHaveBeenCalled()
        }
    })

    it('validateToken should succeed', async () => {

        const findUserAsyncMethod = jest.fn().mockResolvedValue({ username: 'TestUser', password: 'TestPassword', salt: 'TestSalt' });
        const serviceFindUser = jest.spyOn(UserModel, 'findOne').mockImplementation(findUserAsyncMethod);
        const parsedJwtAsyncMethod = jest.fn().mockResolvedValue({ username: 'Test User' });
        const serviceParsedJwt = jest.spyOn(authenticationService, 'returnParsedJwt').mockImplementation(parsedJwtAsyncMethod);


        await AuthenticationController.validateToken('Bearer TestToken')

        expect(serviceFindUser).toHaveBeenCalled()
        expect(serviceParsedJwt).toHaveBeenCalled()

    })
});
