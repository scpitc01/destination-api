import config from 'config';
import authenticationService from '../../src/services/authentication'
import jwt, { JwtPayload } from "jsonwebtoken"


describe('Authentication Service', () => {
    let AuthenticationService = authenticationService

    it('authorizationCheck should throw an error if the token is invalid', async () => {
        try {
            const testJwt = jwt.sign({}, config.get('secretKey'));
            await AuthenticationService.authorizationCheck(testJwt)
        }
        catch (err) {
            expect(err).toBeDefined()
        }
    })

    it('authorizationCheck should not throw an error if the token is valid', async () => {
        const jwtToken = AuthenticationService.createJWT('User', 'TestID')
        const authorized = await AuthenticationService.authorizationCheck(jwtToken)
        expect(authorized).toBeTruthy()
    })
    it('authorizationCheck should not throw an error if the token is valid', async () => {
        const jwtToken = AuthenticationService.createJWT('User', 'TestID')
        const authorized = await AuthenticationService.authorizationCheck(jwtToken)
        expect(authorized).toBeTruthy()
    })

    it('returnParsedJwt should return a valid and useable jwt token ', async () => {
        const jwtToken = AuthenticationService.createJWT('User', 'TestID')
        const parsedJwt = AuthenticationService.returnParsedJwt(jwtToken)
        expect('User').toEqual(parsedJwt.username)
    })

    it('hashPassword should return a password that has been hashed. ', async () => {
        const salt = await AuthenticationService.generateSalt()
        const hashedPassword = AuthenticationService.hashPassword("Password", salt)
        expect("Password").not.toEqual(hashedPassword)
    })

    it('verifyPassword should return a false if the two passwords do not match', async () => {
        const validPassword = AuthenticationService.verifyPassword('TestPassword', 'TestPassword2')
        expect(validPassword).toBeFalsy()
    })

    it('verifyPassword should return a false if the two passwords do not match', async () => {
        const validPassword = AuthenticationService.verifyPassword('TestPassword', 'TestPassword2')
        expect(validPassword).toBeFalsy()
    })

    it('verifyPassword should return a true if the two passwords match', async () => {
        const validPassword = AuthenticationService.verifyPassword('TestPassword', 'TestPassword')
        expect(validPassword).toBeTruthy()
    })

    it('createJWT should generate a jwt based off of a username entered in.', async () => {
        const jwt = AuthenticationService.createJWT('testUser', 'TestID')
        expect(jwt).toBeDefined()
    })

    it('generateSalt should generate a salt string to be used in pass hashing', async () => {
        const salt = AuthenticationService.generateSalt()
        expect(salt).toBeDefined()
    })

    it('verifyUser should validate the user', async () => {
        const jwtToken = AuthenticationService.createJWT('User', 'TestID')
        const result = AuthenticationService.verifyUser('TestID', jwtToken)
        expect(result).toBe(true)
    })

    it('verifyUser should throw an error', async () => {
        try {
            const jwtToken = AuthenticationService.createJWT('User', 'TestID')
            AuthenticationService.verifyUser('TestID2', jwtToken)
        }
        catch (err) {
            expect(err).toBeDefined()
        }
    })
});
