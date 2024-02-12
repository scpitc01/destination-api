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

    /**
     * You send in a stringified jwt and it should return a objectified jwt if its still valid. 
     * @param {string} jwtToken A parsed and and minified signed jwt. 
     * @returns {JwtPayload} A unminified jwt. 
     */
    private parseJwt(token: string): JwtPayload {
        const decoded = jwt.verify(token, this.key) as JwtPayload
        if (decoded.iat && decoded.exp && decoded.exp < decoded.iat) {
            throw new Error("The token has expired")
        }
        return decoded
    }

    /**
     * Should check if the bearer token for the request sent into the api is valid.
     * @param {FastifyRequest} request Requests from fasitify coming in.
     * @param {FastifyReply} reply Replys to send back to the requester. 
     */
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

    /**
     * You send in a stringified jwt and it should return a objectified jwt if its still valid. 
     * @param {string} jwtToken A parsed and and minified signed jwt. 
     * @returns {JwtPayload} A unminified jwt. 
     */
    public returnParsedJwt(jwtToken: string): JwtPayload {
        return this.parseJwt(jwtToken)
    }

    /**
     * Generates the hash and salted password for later user. 
     * @param {string} password The password for the user. 
     * @param {string} salt The salt that was generated to hash the password to be more secure. 
     * @returns {Promise<string>} Returns the hashed and salted password to be compared later or stored in the database.
     */
    public async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    /**
     * Compares the passed in password and the one from the database if they match we return true. 
     * @param {string} inputPassword Password that the user passed in we are going to compare. 
     * @param {string} hashedPassword Password that we retrieved from the database to compare against. 
     * @returns {bool} Returns a true or false value based off the if the password is the same. 
     */
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