import {download} from "./download";

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

import {mkdir, readdir} from 'fs/promises';

import {loadCsvs} from "./loadCsvs";
import { existsSync } from "fs";

export class KlineByMinute {
    
    ready: boolean = false;

    tickers: {[key: string]: string} = {};

    init = async () => {
        console.log('Initializing...');
        if(!existsSync('data'))
            await mkdir('data');
        const files = await readdir('data');
        if(!files?.length) {
            console.log('Historical data not found locally.');
            await download();
        }

        this.tickers = await loadCsvs();
        this.ready = true;
    }

    minuteExists = (unixMinute: number) =>
        !!this.tickers[unixMinute];

    getKlineForMinute = (unixMinute: number) =>
        this.tickers[unixMinute];
}

// (async() => {
//     const kbm = new KlineByMinute();
//     console.log('Loading');
//     await kbm.init();
//     console.log('Loaded!');
//     console.log(kbm.getKlineForMinute(27084939))
// })();