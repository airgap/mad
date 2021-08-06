import { getArg } from "./getArg.ts";
import { Server } from "./Server.ts";

const serv = new Server();

let symbols = getArg("symbols")?.split(",");
let port = parseInt(getArg("port"));
if (!port) {
  console.log("No port specified. Defauting to 8008.");
  port = 8008;
}
if (!symbols || !symbols[0]) {
  console.log("No symbols specified. Defaulting to ETHUSDT.");
  symbols = ["ETHUSDT"];
}
console.log("Starting server with", symbols, port);
serv.start(port, symbols);
