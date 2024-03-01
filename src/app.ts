import fastify from 'fastify'
import authentication from './services/authentication'
import logger from './services/logger'
import config = require('config')
import mongoose from 'mongoose'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from '@fastify/cors'


const app = fastify({ logger: logger })

const swaggerUiOptions = {
    routePrefix: "/docs",
    exposeRoute: true,
};

app.register(fastifySwagger, JSON.parse(JSON.stringify(config.get('swagger'))));
app.register(fastifySwaggerUi, swaggerUiOptions);
app.register(fastifyCors);


app.register(import('./routers/authentication'), { prefix: 'auth' })
app.register(import('./routers/destination'), { prefix: 'destination' })

app.addHook('preHandler', async (request, reply) => {
    if (request.url.startsWith('/auth') || request.url.startsWith('/docs')) {
        return;
    }
    try {
        const token = request.headers.authorization?.replace('Bearer ', '') as string
        await authentication.authorizationCheck(token);
    }
    catch (err) {
        reply.status(401).send({ message: 'User unauthorized.' });
    }
});

// Connect to MongoDB
mongoose.connect(config.get('mongoUri'));

// Check for MongoDB connection errors
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    app.log.info(`Connected to MongoDB`)
});

export default app;