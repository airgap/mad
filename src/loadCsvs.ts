import {readdir, readFile} from 'fs/promises';

export const loadCsvs = async () => {
    console.log('Loading historical data');
    const tickers: {[key: string]: string} = {};
    const files = await Promise.all((await readdir('data')).map(file => readFile('data/' + file, 'utf8')));
    files.forEach((file: string, f: number) => {
        file.trim().split('\n')
            .forEach(line => tickers[parseInt(line.split(',')[0])/60000] = line)
        console.log('Loaded', f+1, 'of', files.length, 'files', ':', Math.round((f+1)/files.length*100),'% complete');
    });
    return tickers;
};