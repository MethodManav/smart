import { createLogger, format, transports, Logger } from "winston";
import chalk from "chalk";

// Emojis and Colors by log level
const levelFormat = format((info) => {
  const emojiMap: Record<string, string> = {
    error: "❌",
    warn: "⚠️",
    info: "ℹ️",
    http: "🌐",
    verbose: "🔍",
    debug: "🐛",
    silly: "🤪",
  };

  const colorMap: Record<string, any> = {
    error: chalk.red,
    warn: chalk.yellow,
    info: chalk.cyan,
    http: chalk.magenta,
    verbose: chalk.blue,
    debug: chalk.green,
    silly: chalk.gray,
  };

  const emoji = emojiMap[info.level] || "";
  const color = colorMap[info.level] || chalk.white;

  info.level = color(`${emoji} ${info.level.toUpperCase()}`);
  return info;
});

const logger: Logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    levelFormat(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    // Colored + Emoji Console
    new transports.Console(),

    // Plain file (no color/emoji)
    new transports.File({
      filename: "logs/combined.log",
      format: format.combine(
        format.timestamp(),
        format.uncolorize(),
        format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
      ),
    }),
  ],
});

export default logger;
