import bunyan from "bunyan";

export const log = bunyan.createLogger({
  name: "logger",
  streams: [
    {
      level: "info",
      stream: process.stdout, // log INFO and above to stdout
    },
    {
      level: "error",
      path: "./src/log/myapp-error.log", // log ERROR and above to a file
    },
  ],
});
