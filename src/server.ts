import app from './app';

const PORT = 3000;

const server = app.listen({ port: PORT, host: '0.0.0.0' });

server.then(() => {
    app.log.info(`Server listening on port ${PORT}`);
}).catch(error => {
    app.log.error(error);
    process.exit(1);
});

export default server;