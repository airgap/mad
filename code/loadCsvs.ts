export const loadCsvs = async (symbol: string) => {
  console.log("Loading historical data");
  const path = `data/${symbol}/`;
  const tickers: { [key: string]: string } = {};
  const fileIterator = Deno.readDir(path);
  const flist = [];
  for await (const file of fileIterator) {
    flist.push(file);
  }
  let loaded = 0;
  const files = await Promise.all(
    flist.map(async (fname: Deno.DirEntry, f: number) => {
      const file = await Deno.readTextFile(`${path}/${fname.name}`);
      file.trim().split("\n")
        .forEach((line: string) =>
          tickers[parseInt(line.split(",")[0]) / 60000] = line
        );
      ++loaded;
      console.log(
        "Loaded",
        loaded,
        "of",
        flist.length,
        symbol,
        ":",
        Math.round((loaded) / flist.length * 100),
        "% complete",
      );
    }),
  );
  console.log("Loaded historical data");
  return tickers;
};
