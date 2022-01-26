import { ENABLE_WRITE_LOG } from "commons/constants";
import { configure, getLogger } from "log4js";

configure({
  appenders: {
    application: {
      type: "console",
    },
    file: {
      type: "file",
      filename: process.env.FILE_NAME_LOG,
      compression: true,
      maxLogSize: parseInt(process.env.MAX_SIZE_LOG || "51200"), // 50MB
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
  date: string,
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
