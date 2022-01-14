import { ENABLE_WRITE_LOG } from "commons/constants";
import { configure, getLogger } from "log4js";

configure({
  appenders: {
    application: {
      type: "console",
    },
    file: {
      type: "file",
      filename: "./app.log",
      compression: true,
      maxLogSize: 10485760,
      backups: 100,
    },
  },
  categories: {
    default: {
      appenders: ["application", "file"],
      level: "info",
    },
  },
});

const logger = getLogger();

export const writeLog = (
  path: string,
  date: Date,
  content: string,
  bodyData?: string
) => {
  if (!ENABLE_WRITE_LOG) {
    return;
  }
  logger.info(
    `${path} - ${date}----content: ${content}---withBodyData: ${bodyData || ""}`
  );
};
