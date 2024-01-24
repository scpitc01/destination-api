import { FastifyReply, FastifyRequest } from "fastify";

class AuthenticationService {
    // Properties

    // Constructor
    constructor() {
    }

    public async authorizationCheck(request: FastifyRequest, reply: FastifyReply): Promise<void>  {
        if (true) {
            console.log("Authorized Hooray!");
        } else {
            console.log("Unauthorized. Please log in.");
            reply.code(401).send({ error: 'Unauthorized' });
        }
    }

    public async logout() {

    }

    public async login() {
        
    }
}

export default new AuthenticationService();