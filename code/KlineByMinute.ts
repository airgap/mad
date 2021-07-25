import { ensureDir, exists } from "https://deno.land/std@0.102.0/fs/mod.ts";

import { download } from "./download.ts";

`Open time
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
Ignore`;

import { loadCsvs } from "./loadCsvs.ts";

export class KlineByMinute {
  ready: boolean = false;

  tickers: { [key: string]: string } = {};

  init = async () => {
    console.log("Initializing...");
    await ensureDir("data");
    const files = Deno.readDirSync("data");
    let empty = true;
    for (const file of files) {
      empty = false;
      break;
    }

    if (empty) {
      console.log("Historical data not found locally.");
      await download();
    }

    this.tickers = await loadCsvs();
    this.ready = true;
  };

  minuteExists = (unixMinute: number) => !!this.tickers[unixMinute];

  getKlineForMinute = (unixMinute: number) => this.tickers[unixMinute];
}

// (async() => {
//     const kbm = new KlineByMinute();
//     console.log('Loading');
//     await kbm.init();
//     console.log('Loaded!');
//     console.log(kbm.getKlineForMinute(27084939))
// })();
