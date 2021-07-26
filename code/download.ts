export const download = async (symbol: string) => {
  const now = new Date();
  console.log("Downloading historical data...");
  for (
    let month = (now.getMonth() || 12),
      year = now.getFullYear() - (now.getMonth() ? 0 : 1);;
    --month
  ) {
    console.log("Downloading", symbol, year, month);
    const fname = `./data/${symbol}/${year}-${month}`;
    const blob = (await fetch(
      `https://data.binance.vision/data/spot/monthly/klines/${symbol}/1m/${symbol}-1m-${year}-${(month <
          10
        ? "0" + month
        : month)}.zip`,
    )).blob();
    const data = new Uint8Array(await (await blob).arrayBuffer());
    if (data.length < 10000) {
      break;
    }
    await Deno.writeFile(fname + ".zip", data);
    await Deno.run({
      cmd: ["unzip", fname + ".zip", "-d", "data/" + symbol],
      stdout: "piped",
      stderr: "piped",
    }).status();
    await Deno.remove(fname + ".zip");

    if (month === 1) {
      month = 13;
      year--;
    }
  }
};
