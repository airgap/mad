export const download = async () => {
  const now = new Date();
  console.log("Downloading historical data...");
  for (
    let month = 8, year = 2017;
    month < now.getMonth() + 1 || year < now.getFullYear();
    ++month
  ) {
    console.log("Downloading", year, month);
    const fname = `./data/${year}-${month}`;
    const blob = (await fetch(
      `https://data.binance.vision/data/spot/monthly/klines/ETHUSDT/1m/ETHUSDT-1m-${year}-${(month <
          10
        ? "0" + month
        : month)}.zip`,
    )).blob();
    const data = new Uint8Array(await (await blob).arrayBuffer());
    await Deno.writeFile(fname + ".zip", data);
    await (await Deno.run({
      cmd: ["unzip", fname + ".zip", "-d", "data"],
      stdout: "piped",
      stderr: "piped",
    })).status();
    await Deno.remove(fname + ".zip");

    console.log("Downloaded", year, month);
    if (month === 12) {
      month = 0;
      year++;
    }
  }
};
