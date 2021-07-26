export const getArg = (arg: string) => {
  const value = Deno.args[Deno.args.indexOf("--" + arg) + 1];
  return value?.match("^--") ? "" : value;
};
