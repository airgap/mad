import { Server } from "./Server.ts";

const serv = new Server();

const port = parseInt(Deno.args[0]) || 8008;

serv.start(port);
