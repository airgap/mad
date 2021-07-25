export const loadCsvs = async () => {
  console.log("Loading historical data");
  const tickers: { [key: string]: string } = {};
  const fileIterator = Deno.readDir("data");
  const flist = [];
  for await (const file of fileIterator) {
    flist.push(file);
  }
  let loaded = 0;
  const files = await Promise.all(
    flist.map(async (fname: Deno.DirEntry, f: number) => {
      const file = await Deno.readTextFile("data/" + fname.name);
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
        "files",
        ":",
        Math.round((loaded) / flist.length * 100),
        "% complete",
      );
    }),
  );
  console.log("Loaded historical data");
  return tickers;
};
