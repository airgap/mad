import { emptyDir, ensureDir } from "https://deno.land/std@0.102.0/fs/mod.ts";
import { download } from "./download.ts";
import { loadCsvs } from "./loadCsvs.ts";

/*
Fields:
Open time
Open
High
Low
Close
Volume
Close time
Quote asset volume
Number of trades
Taker buy base asset volume
Taker buy quote asset volume
Ignore
*/

export class KlineByMinute {
  ready = false;

  tickers: { [symbol: string]: { [minute: string]: string } } = {};

  init = async (symbolCommands: string[]) => {
    console.log("Initializing...");
    for (const command of symbolCommands) {
      console.log("COMMAND", command);
      const [, symbol, refresh] = command.match(/^([A-Z]+)(\$)?$/) ?? [];
      if (!symbol) {
        throw new Error("Invalid command");
      }
      const path = "data/" + symbol;
      await ensureDir(path);
      const files = Deno.readDirSync(path);
      let empty = true;
      if ([...files].length) {
        empty = false;
        break;
      }

      if (empty) {
        console.log("Historical data not found locally.");
      }
      if (refresh) {
        console.log("Refreshing data for", symbol);
        emptyDir(path);
      }
      if (empty || refresh) {
        await download(symbol);
      }

      this.tickers[symbol] = await loadCsvs(symbol);
    }
    this.ready = true;
  };

  minuteExists = (unixMinute: number) => !!this.tickers[unixMinute];

  getKlineForMinute = (symbol: string, unixMinute: number) =>
    this.tickers[symbol]?.[unixMinute];
}
