import authenticationService from '../../src/services/authentication'
import jwt, { JwtPayload } from "jsonwebtoken"
import config from 'config'
import { FastifyRequest } from 'fastify';
import { HTTPRequestPart, ValidationFunction } from 'fastify/types/request';
import { Socket } from 'dgram';
import { IncomingMessage } from 'http';

describe('Authentication Service', () => {
    let AuthenticationService = authenticationService

    it('returnParsedJwt should return a valid and useable jwt token ', async () => {
        const jwtToken = AuthenticationService.createJWT('User')
        const parsedJwt = AuthenticationService.returnParsedJwt(jwtToken)
        expect('User').toEqual(parsedJwt.username)
    })

    it('hashPassword should return a password that has been hashed. ', async () => {
        const hashedPassword = AuthenticationService.hashPassword("Password", "Hash")
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
        const jwt = AuthenticationService.createJWT('testUser')
        expect(jwt).toBeDefined()
    })

    it('generateSalt should generate a salt string to be used in pass hashing', async () => {
        const salt = AuthenticationService.generateSalt()
        expect(salt).toBeDefined()
    })
});
