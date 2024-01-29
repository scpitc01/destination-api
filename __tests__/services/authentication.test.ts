import { FastifyInstance } from 'fastify';
import authenticationService from '../../src/services/authentication';

describe('Authentication Service', () => {
    let AuthenticationService = authenticationService

    it('generateSalt should generate a salt string to be used in pass hashing', async () => {
        const salt = authenticationService.generateSalt()
        expect(salt).toBeDefined()
    });
});
