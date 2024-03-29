import config = require('config')
import app from './app';

const PORT = 3000;

const server = app.listen(PORT, '0.0.0.0');

server.then(() => {
    app.log.info(`Server listening on port ${PORT}`);
    app.log.info(`Mongo uri ${config.get('mongoUri')}`);
}).catch(error => {
    app.log.error(error);
    process.exit(1);
});

export default server;