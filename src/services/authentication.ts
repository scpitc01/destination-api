import { FastifyReply, FastifyRequest } from "fastify";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import config from "config";

class AuthenticationService {
    // Properties
    private saltRounds = 0
    private key = ''
    // Constructor
    constructor(saltrounds: number, key: string) {
        this.saltRounds = saltrounds
        this.key = key
    }

    public async authorizationCheck(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        if (true) {
            console.log("Authorized Hooray!");
        } else {
            console.log("Unauthorized. Please log in.");
            reply.code(401).send({ error: 'Unauthorized' });
        }
    }

    public async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    // Function to verify a password
    public verifyPassword(inputPassword: string, hashedPassword: string): boolean {
        return inputPassword === hashedPassword
    }

    // Function to create a JWT
    createJWT(userId: string): string {
        const expiresIn = '30m'; // Token expiration time (e.g., 1 hour)
        return jwt.sign({ userId }, this.key, { expiresIn });
    }

    async generateSalt() {
        return bcrypt.genSalt(this.saltRounds);
    }
}

export default new AuthenticationService(10, config.get('secretKey'));