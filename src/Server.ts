import { createServer } from 'http';
import { KlineByMinute } from './KlineByMinute';

export class Server {
	ready: boolean = false;
	running: boolean = false;
	httpServer: any;
	kbm: KlineByMinute;
	constructor() {
		this.kbm = new KlineByMinute();
	}
	private listener = (req: any, res: any) => {
		//console.log(req);
		const [, symbol, minute] = req.url.split(/\//g);
		//.match(/^\/([^\/]+)\/([0-9]+)$/);
		if (!minute)
			res.end('no minute');
		const result = this.kbm.getKlineForMinute(minute) ?? 'invalid minute';
		console.log(symbol, minute, '-->', result);
		res.end(result);
	};
	init = async () => {
		if (this.ready)
			return;
		await this.kbm.init();
		this.httpServer = createServer(this.listener);
	}
	start = async (port: number = 8008) => {
		await this.init();
		this.httpServer.listen(port);
		console.log('Listening on port', port);
	}
	stop = () => {
		this.httpServer.close();
	}
}


