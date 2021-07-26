import { serve } from "https://deno.land/std@0.102.0/http/server.ts";

import { KlineByMinute } from "./KlineByMinute.ts";

export class Server {
  ready = false;
  running = false;
  kbm: KlineByMinute;
  constructor() {
    this.kbm = new KlineByMinute();
  }
  private listener = (req: any) => {
    //console.log(req);
    const [, symbol, minute] = req.url.split(/\//g);
    //.match(/^\/([^\/]+)\/([0-9]+)$/);
    if (!minute) {
      req.respond({ status: 200, body: "no minute" });
    }
    const result = this.kbm.getKlineForMinute(symbol, minute) ??
      "invalid minute";
    console.log(symbol, minute, "-->", result);
    req.respond({ status: 200, body: result });
  };
  init = async (symbols: string[]) => {
    if (this.ready) {
      return;
    }
    await this.kbm.init(symbols);
    this.ready = true;
  };
  start = async (port = 8008, symbols: string[] = ["ETHUSDT"]) => {
    await this.init(symbols);
    const server = serve({ port });
    console.log("Now serving on port", port);
    for await (const req of server) {
      this.listener(req);
    }
    console.log("Listening on port", port);
  };
}
