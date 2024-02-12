import { FastifyReply, FastifyRequest } from "fastify";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken"
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

    private parseJwt(token: string): JwtPayload {
        const decoded = jwt.verify(token, this.key) as JwtPayload
        if (decoded.iat && decoded.exp && decoded.exp < decoded.iat) {
            throw new Error("The token has expired")
        }
        return decoded
    }

    public async authorizationCheck(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
            const token = request.headers.authorization?.replace('Bearer ', '') as string
            const decoded = this.parseJwt(token)
            if (!decoded.userId || decoded.userId === "") {
                throw new Error("No user found.")
            }
        } catch (err) {
            reply.status(401).send({ message: 'User unauthorized.' });
        }
    }

    public returnParsedJwt(jwtToken: string): JwtPayload {
        return this.parseJwt(jwtToken)
    }

    public async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    public verifyPassword(inputPassword: string, hashedPassword: string): boolean {
        return inputPassword === hashedPassword
    }

    /**
     * Creates the JWT that will be used for authorization when requests are send back to the api. 
     * @param {string} username  The string that user chose to represent themselves in the system. 
     * @returns {string} The jwt token that returns the authorization for the user.
     */
    createJWT(username: string): string {
        const expiresIn = '30m'; // Token expiration time (e.g., 1 hour)
        return jwt.sign({ username }, this.key, { expiresIn });
    }

    /**
     * Generate the salt that we use to hash the password as we put it in the database. 
     * @returns {Promise<string>} saltString Returns the string we are using the hash the users password with. 
     */
    async generateSalt() {
        return bcrypt.genSalt(this.saltRounds);
    }
}

export default new AuthenticationService(10, config.get('secretKey'));