import {Server} from './Server';

const serv = new Server();

const port = parseInt(process.argv[2]) || 8008;

serv.start(port);
