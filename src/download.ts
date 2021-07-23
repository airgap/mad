//minimum: 'https://data.binance.vision/data/spot/monthly/klines/ETHUSDT/1m/ETHUSDT-1m-2017-08.zip'
const fetch = require('node-fetch');
import {unlink, writeFile} from 'fs/promises';
import * as AdmZip from 'adm-zip';

export const download = async () => {
    const now = new Date();
    console.log('Downloading historical data...');
    for(let month = 8, year = 2017; month < now.getMonth() + 1 || year < now.getFullYear(); ++month) {
        console.log('Downloading', year, month);
        const fname = `data/${year}-${month}.zip`;
        const data = await fetch(`https://data.binance.vision/data/spot/monthly/klines/ETHUSDT/1m/ETHUSDT-1m-${year}-${(month<10?'0'+month:month)}.zip`)
            .then((res: any) => res.buffer());
        await writeFile(`data/${year}-${month}.zip`, data);
        console.log('Downloaded',year, month);
        const zip = new AdmZip(fname);
        await zip.extractAllTo('data/');
        await unlink(fname);
        console.log('Extracted', year,month);
        if(month === 12) {
            month = 0;
            year ++;
        }
    }
};

